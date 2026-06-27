import os
import json
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# Load environment variables (OPENAI_API_KEY, META_VERIFY_TOKEN, etc.)
load_dotenv()

from database import db
from models import WhatsAppWebhookPayload
from ai_agent import process_message_with_ai, generate_lead_summary
from datetime import datetime

app = FastAPI(title="Aatomate AI WhatsApp CRM")

# Configuration
META_VERIFY_TOKEN = os.environ.get("META_VERIFY_TOKEN", "aatomate_secure_verify_token")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Aatomate API is running."}

@app.get("/webhook/whatsapp")
def verify_whatsapp_webhook(request: Request):
    """
    Meta Webhook Verification Endpoint.
    When setting up the webhook in the Meta App Dashboard, Meta will send a GET request here.
    """
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    if mode and token:
        if mode == "subscribe" and token == META_VERIFY_TOKEN:
            print("WEBHOOK_VERIFIED")
            return int(challenge)
        else:
            raise HTTPException(status_code=403, detail="Verification token mismatch")
    raise HTTPException(status_code=400, detail="Missing parameters")

@app.post("/webhook/whatsapp")
async def receive_whatsapp_message(payload: WhatsAppWebhookPayload, background_tasks: BackgroundTasks):
    """
    Meta Webhook POST Endpoint.
    Receives incoming WhatsApp messages.
    """
    try:
        if payload.object != "whatsapp_business_account":
            return JSONResponse(status_code=400, content={"status": "error", "message": "Not a WhatsApp payload"})

        for entry in payload.entry:
            for change in entry.changes:
                value = change.value
                if value.messages:
                    for msg in value.messages:
                        if msg.type == "text":
                            phone_number = msg.from_
                            text_body = msg.text.body
                            
                            # Offload the AI processing and Firestore DB writing to a background task
                            # so we can immediately return a 200 OK to Meta (required within 3 seconds)
                            background_tasks.add_task(handle_incoming_message, phone_number, text_body)

        return JSONResponse(status_code=200, content={"status": "ok"})
    except Exception as e:
        print(f"Webhook processing error: {e}")
        return JSONResponse(status_code=500, content={"status": "error"})


async def handle_incoming_message(phone_number: str, message_text: str):
    """
    Background task to handle the database logic and AI response.
    """
    print(f"Handling message from {phone_number}: {message_text}")
    
    leads_ref = db.collection("leads")
    lead_query = leads_ref.where("phone_number", "==", phone_number).limit(1).stream()
    
    lead_doc = None
    for doc in lead_query:
        lead_doc = doc
        break

    if not lead_doc:
        # Create a new lead
        lead_data = {
            "phone_number": phone_number,
            "status": "New",
            "score": "Cold",
            "created_at": datetime.now()
        }
        lead_ref = leads_ref.document()
        lead_ref.set(lead_data)
        lead_id = lead_ref.id
    else:
        lead_ref = lead_doc.reference
        lead_id = lead_doc.id

    # Add the user's message to the chats sub-collection
    chats_ref = lead_ref.collection("chats")
    chats_ref.add({
        "role": "user",
        "content": message_text,
        "timestamp": datetime.now()
    })

    # Retrieve recent chat history to give context to OpenAI
    recent_chats = chats_ref.order_by("timestamp").limit(20).stream()
    chat_history = [{"role": c.to_dict()["role"], "content": c.to_dict()["content"]} for c in recent_chats]

    # Get AI Response
    ai_response = await process_message_with_ai(chat_history)

    # Save AI response to Firestore
    chats_ref.add({
        "role": "assistant",
        "content": ai_response,
        "timestamp": datetime.now()
    })

    # TODO: Send the ai_response back to the user via Meta WhatsApp Graph API here.
    print(f"AI Response to {phone_number}: {ai_response}")

    # If the conversation is getting long, trigger the summary/qualification generator
    if len(chat_history) % 5 == 0:
        summary_data = await generate_lead_summary(chat_history)
        if summary_data:
            lead_ref.update({
                "ai_summary": summary_data.get("summary", ""),
                "score": summary_data.get("score", "Warm"),
                "status": "Contacted"
            })
