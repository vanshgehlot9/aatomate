from fastapi import APIRouter, Request, Response, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
import logging
import time
from app.core.config import settings
from app.services.state_machine import BotStateMachine
from app.db.supabase import db

logger = logging.getLogger(__name__)
router = APIRouter()

# ── In-memory fallback for chat state when DB is unavailable ──────────────
_in_memory_chats: dict = {}  # keyed by phone_number -> {"state": ..., "lead_data": ...}

# ── Message deduplication (in-memory) ─────────────────────────────────────
_processed_message_ids: dict = {}
_DEDUP_TTL = 300

def _is_duplicate(mid: str) -> bool:
    now = time.time()
    expired = [k for k, v in _processed_message_ids.items() if now - v > _DEDUP_TTL]
    for k in expired:
        del _processed_message_ids[k]
    if mid in _processed_message_ids:
        return True
    _processed_message_ids[mid] = now
    return False


@router.get("/webhook/whatsapp")
def verify_whatsapp_webhook(request: Request):
    """
    Meta Webhook Verification Endpoint.
    """
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    logger.info(f"[verify] mode={mode} token={'***' if token else 'None'} challenge={challenge}")

    if mode and token:
        if mode == "subscribe" and token == settings.WHATSAPP_VERIFY_TOKEN:
            logger.info("WEBHOOK_VERIFIED successfully")
            return Response(content=challenge, status_code=200, media_type="text/plain")
        else:
            logger.warning(f"[verify] Token mismatch: got '{token}', expected '{settings.WHATSAPP_VERIFY_TOKEN}'")
            raise HTTPException(status_code=403, detail="Verification token mismatch")
    raise HTTPException(status_code=400, detail="Missing parameters")

@router.post("/webhook/whatsapp")
async def receive_whatsapp_message(request: Request, background_tasks: BackgroundTasks):
    """
    Meta Webhook POST Endpoint for incoming messages.
    """
    try:
        body = await request.json()
        
        if body.get("object") != "whatsapp_business_account":
            return JSONResponse(status_code=400, content={"status": "error", "message": "Not a WhatsApp payload"})

        for entry in body.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                
                # Handle status updates (delivery receipts etc.) — just log & skip
                if "statuses" in value:
                    if "messages" not in value:
                        return Response(content="EVENT_RECEIVED", status_code=200)
                
                if "messages" not in value:
                    return Response(content="EVENT_RECEIVED", status_code=200)
                
                metadata = value.get("metadata", {})
                phone_number_id = metadata.get("phone_number_id")
                
                # Check if this message is meant for a DIFFERENT phone number (like Doctorbot)
                if phone_number_id and phone_number_id != settings.WHATSAPP_PHONE_NUMBER_ID:
                    logger.info(f"Ignoring message meant for a different phone number ID: {phone_number_id}")
                    continue
                
                for msg in value["messages"]:
                    phone_number = msg.get("from")
                    message_id = msg.get("id", "")
                    
                    # Dedup — skip already-processed messages
                    if message_id and _is_duplicate(message_id):
                        logger.info(f"Skipping duplicate message {message_id}")
                        continue
                    
                    if msg.get("type") == "text":
                        text_body = msg.get("text", {}).get("body", "")
                        background_tasks.add_task(handle_incoming_message, phone_number, text_body, False, None)
                        
                    elif msg.get("type") == "interactive" and "interactive" in msg:
                        interactive_id = None
                        interactive_title = ""
                        interactive = msg["interactive"]
                        
                        if interactive.get("type") == "button_reply" and "button_reply" in interactive:
                            interactive_id = interactive["button_reply"].get("id")
                            interactive_title = interactive["button_reply"].get("title")
                        elif interactive.get("type") == "list_reply" and "list_reply" in interactive:
                            interactive_id = interactive["list_reply"].get("id")
                            interactive_title = interactive["list_reply"].get("title")
                            
                        background_tasks.add_task(handle_incoming_message, phone_number, interactive_title, True, interactive_id)

        return Response(content="EVENT_RECEIVED", status_code=200)
    except Exception as e:
        logger.error(f"Webhook processing error: {e}", exc_info=True)
        return Response(content="EVENT_RECEIVED", status_code=200)


@router.post("/webhook/flow")
async def handle_flow_webhook(request: Request):
    """
    Stub endpoint for WhatsApp Flow data_exchange requests.
    Returns a valid close-screen response so Meta stops retrying with 404s.
    """
    logger.info("[flow stub] Received /webhook/flow request — returning close screen")
    return JSONResponse(content={
        "version": "3.0",
        "screen": "SUCCESS",
        "data": {
            "extension_message_response": {
                "params": {
                    "flow_token": "unused",
                    "status": "close"
                }
            }
        }
    })


async def handle_incoming_message(phone_number: str, user_input: str, is_interactive: bool, interactive_id: str):
    """
    Wrapper around the state machine for the background task.
    Works with DB when available, falls back to in-memory state when not.
    """
    logger.info(f"Message from {phone_number}: '{user_input}' (Interactive: {is_interactive}, ID: {interactive_id})")
    
    lead_id = None
    chat_id = None
    
    if db:
        try:
            # 1. Fetch or create Lead
            lead_response = db.table("leads").select("id").eq("phone", phone_number).execute()
            if lead_response.data:
                lead_id = lead_response.data[0]["id"]
            else:
                lead_insert = db.table("leads").insert({
                    "phone": phone_number,
                    "name": f"WhatsApp Lead {phone_number}",
                    "status": "new"
                }).execute()
                if lead_insert.data:
                    lead_id = lead_insert.data[0]["id"]

            # 2. Fetch or create WhatsApp Chat session
            chat_response = db.table("whatsapp_chats").select("id").eq("phone_number", phone_number).execute()
            if chat_response.data:
                chat_id = chat_response.data[0]["id"]
            else:
                chat_insert = db.table("whatsapp_chats").insert({
                    "phone_number": phone_number,
                    "lead_id": lead_id,
                    "bot_state": {"state": "MAIN_MENU", "lead_data": {}}
                }).execute()
                if chat_insert.data:
                    chat_id = chat_insert.data[0]["id"]
        except Exception as e:
            logger.error(f"Error fetching/creating lead or chat: {e}", exc_info=True)
    else:
        logger.warning("DB not available — using in-memory chat state")
        # In-memory fallback: use phone number as the key
        if phone_number not in _in_memory_chats:
            _in_memory_chats[phone_number] = {"state": "MAIN_MENU", "lead_data": {}}
        chat_id = f"mem_{phone_number}"

    await BotStateMachine.process_user_input(
        phone_number=phone_number, 
        chat_id=chat_id, 
        lead_id=lead_id, 
        user_input=user_input, 
        is_interactive=is_interactive, 
        interactive_id=interactive_id
    )
