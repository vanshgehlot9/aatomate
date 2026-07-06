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
    Background task to handle the database logic and AI response using Supabase.
    """
    print(f"Handling message from {phone_number}: {message_text}")
    
    # 1. Fetch or create Lead
    lead_response = db.table("leads").select("*").eq("phone", phone_number).execute()
    leads_data = lead_response.data
    
    if not leads_data:
        # Create a new lead (using dummy email since it's NOT NULL in schema)
        lead_insert = db.table("leads").insert({
            "name": f"WhatsApp Lead {phone_number}",
            "email": f"{phone_number}@whatsapp.lead",
            "phone": phone_number,
            "status": "new",
            "notes": "Created from WhatsApp Webhook"
        }).execute()
        lead_id = lead_insert.data[0]["id"]
    else:
        lead_id = leads_data[0]["id"]

    # 2. Fetch or create WhatsApp Chat session
    chat_response = db.table("whatsapp_chats").select("*").eq("phone_number", phone_number).execute()
    chats_data = chat_response.data

    if not chats_data:
        chat_insert = db.table("whatsapp_chats").insert({
            "lead_id": lead_id,
            "phone_number": phone_number,
            "status": "active"
        }).execute()
        chat_id = chat_insert.data[0]["id"]
    else:
        chat_id = chats_data[0]["id"]

    # 3. Add the user's message to whatsapp_messages
    db.table("whatsapp_messages").insert({
        "chat_id": chat_id,
        "sender_type": "user",
        "content": message_text
    }).execute()

    # 4. Retrieve recent chat history to give context to OpenAI
    recent_msgs_response = db.table("whatsapp_messages")\
        .select("*")\
        .eq("chat_id", chat_id)\
        .order("created_at", desc=True)\
        .limit(20)\
        .execute()
    
    # Reverse to get chronological order
    recent_msgs = reversed(recent_msgs_response.data)
    
    chat_history = []
    for msg in recent_msgs:
        role = "user" if msg["sender_type"] == "user" else "assistant"
        chat_history.append({"role": role, "content": msg["content"]})

    # 5. Get AI Response
    ai_response = await process_message_with_ai(chat_history)

    # 6. Save AI response to whatsapp_messages
    db.table("whatsapp_messages").insert({
        "chat_id": chat_id,
        "sender_type": "assistant",
        "content": ai_response
    }).execute()

    # TODO: Send the ai_response back to the user via Meta WhatsApp Graph API here.
    print(f"AI Response to {phone_number}: {ai_response}")

    # 7. If the conversation is getting long, trigger the summary/qualification generator
    if len(chat_history) % 5 == 0:
        summary_data = await generate_lead_summary(chat_history)
        if summary_data:
            db.table("leads").update({
                "ai_summary": summary_data.get("summary", ""),
                "score": summary_data.get("score", "Warm"),
                "status": "Contacted"
            }).eq("id", lead_id).execute()
