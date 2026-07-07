from app.db.supabase import db
import logging
import json

logger = logging.getLogger(__name__)

class LeadService:
    @staticmethod
    def ensure_lead_record(phone_number: str, chat_id: str = None, lead_id: str = None, lead_data: dict = None):
        if not db:
            logger.warning("Database not initialized. Cannot ensure lead record.")
            return None

        if lead_id:
            return lead_id

        try:
            existing_lead = db.table("leads").select("id").eq("phone", phone_number).limit(1).execute()
            lead_rows = existing_lead.data or []

            if lead_rows:
                lead_id = lead_rows[0]["id"]
            else:
                lead_payload = {
                    "name": f"WhatsApp Lead {phone_number}",
                    "email": f"{phone_number}@whatsapp.lead",
                    "phone": phone_number,
                    "status": "new",
                    "notes": "Created from WhatsApp Webhook"
                }

                if lead_data:
                    for key in ["service_interested", "industry", "budget", "company_name", "email", "requirements", "business_size"]:
                        if lead_data.get(key):
                            lead_payload[key] = lead_data[key]

                lead_insert = db.table("leads").insert(lead_payload).execute()
                lead_id = lead_insert.data[0]["id"]

            if chat_id:
                db.table("whatsapp_chats").update({"lead_id": lead_id}).eq("id", chat_id).execute()

            return lead_id
        except Exception as e:
            logger.error(f"Error ensuring lead record: {e}")
            return None

    @staticmethod
    async def run_lead_qualification(chat_id: str, lead_id: str, lead_data: dict):
        if not db:
            logger.warning("Database not initialized. Skipping lead qualification.")
            return

        try:
            chat_response = db.table("whatsapp_chats").select("phone_number").eq("id", chat_id).execute()
            chat_rows = chat_response.data or []
            phone_number = chat_rows[0]["phone_number"] if chat_rows else None

            if phone_number:
                lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)

            # Update lead record with all collected data
            update_payload = {}
            for key in ["industry", "business_size", "budget", "service_interested", "email", "company_name", "requirements"]:
                if lead_data.get(key):
                    update_payload[key] = lead_data[key]
                    
            if update_payload:
                db.table("leads").update(update_payload).eq("id", lead_id).execute()
            
            # Simple fallback heuristic for Lead Score if AI isn't set up
            lead_score = "Warm"
            if lead_data.get("budget") in ["bud_1l_3l", "bud_above_3l"] or lead_data.get("business_size") == "size_enterprise":
                lead_score = "Hot"
                
            summary = f"Lead interested in {lead_data.get('service_interested', 'services')} for {lead_data.get('industry', 'their business')}."

            db.table("leads").update({
                "ai_summary": summary,
                "lead_score": lead_score,
                "status": "Qualified"
            }).eq("id", lead_id).execute()
            
            logger.info(f"Lead {lead_id} qualified with score: {lead_score}")
        except Exception as e:
            logger.error(f"Error in lead qualification: {e}")
