import requests
import json
import base64
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class WhatsAppService:
    @staticmethod
    def send_whatsapp_message(phone_number: str, message_payload: dict):
        if not settings.WHATSAPP_TOKEN or not settings.WHATSAPP_PHONE_NUMBER_ID:
            logger.warning(f"Would send to {phone_number}: {json.dumps(message_payload, indent=2)}")
            logger.warning("Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID. Skipping actual send.")
            return

        url = f"https://graph.facebook.com/v20.0/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
        headers = {
            "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": phone_number,
        }
        payload.update(message_payload)
        
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=10)
            logger.info(f"[send] TO={phone_number} STATUS={response.status_code} RESPONSE={response.text[:300]}")
            response.raise_for_status()
            logger.info(f"[send] Message sent successfully to {phone_number}")
        except Exception as e:
            logger.error(f"[send] Failed to send message to {phone_number}: {e}")

    @staticmethod
    def send_flow_cta_message(phone_number: str):
        if not settings.WHATSAPP_TOKEN or not settings.WHATSAPP_PHONE_NUMBER_ID:
            logger.warning("Missing credentials. Skipping Flow CTA.")
            return
            
        flow_id = settings.WHATSAPP_FLOW_ID or "1569884864659929" # Example default
        state = {"p": phone_number}
        encoded_state = base64.urlsafe_b64encode(json.dumps(state).encode()).decode().rstrip("=")
        flow_token = f"tk_{encoded_state}"
        
        url = f"https://graph.facebook.com/v20.0/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
        headers = {
            "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": phone_number,
            "type": "interactive",
            "interactive": {
                "type": "flow",
                "header": {
                    "type": "text",
                    "text": "Aatomate Lead Qualification"
                },
                "body": {
                    "text": "Please fill out this quick form to help us understand your automation needs!"
                },
                "footer": {
                    "text": "Secure Form"
                },
                "action": {
                    "name": "flow",
                    "parameters": {
                        "flow_message_version": "3",
                        "flow_token": flow_token,
                        "flow_id": flow_id,
                        "flow_cta": "Open Form",
                        "mode": "published",
                        "flow_action": "data_exchange"
                    }
                }
            }
        }
        
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=10)
            response.raise_for_status()
            logger.info(f"Flow CTA sent successfully to {phone_number}")
        except Exception as e:
            logger.error(f"Failed to send Flow CTA: {e}")

    @staticmethod
    def create_text_message(text: str) -> dict:
        return {
            "type": "text",
            "text": {"body": text}
        }

    @staticmethod
    def create_interactive_buttons(body_text: str, buttons: list) -> dict:
        return {
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {"text": body_text},
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": btn["id"],
                                "title": btn["title"]
                            }
                        } for btn in buttons[:3] # Max 3 buttons
                    ]
                }
            }
        }

    @staticmethod
    def create_interactive_list(body_text: str, button_text: str, sections: list) -> dict:
        return {
            "type": "interactive",
            "interactive": {
                "type": "list",
                "body": {"text": body_text},
                "action": {
                    "button": button_text,
                    "sections": sections
                }
            }
        }

class MessageBuilders:
    @staticmethod
    def send_main_menu():
        text = "👋 Welcome to Aatomate\n\nTransform your business with AI-powered automation.\n\nChoose how we can help you today."
        sections = [
            {
                "title": "Our Services",
                "rows": [
                    {"id": "menu_chatbot", "title": "🤖 WhatsApp Bots", "description": "Automate customer support & sales"},
                    {"id": "menu_pricing", "title": "💰 Get Pricing", "description": "Instant estimates"},
                    {"id": "menu_voice", "title": "📞 AI Voice Calling", "description": "AI Receptionists & outbound"},
                    {"id": "menu_expert", "title": "👨‍💼 Talk to an Expert", "description": "Book a consultation"},
                    {"id": "menu_contact", "title": "💬 Contact Sales", "description": "Message our team directly"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list(text, "Select Option", sections)

    @staticmethod
    def ask_industry():
        sections = [
            {
                "title": "Select Industry",
                "rows": [
                    {"id": "ind_health", "title": "Healthcare"},
                    {"id": "ind_real", "title": "Real Estate"},
                    {"id": "ind_edu", "title": "Education"},
                    {"id": "ind_travel", "title": "Travel"},
                    {"id": "ind_resto", "title": "Restaurant"},
                    {"id": "ind_retail", "title": "Retail"},
                    {"id": "ind_finance", "title": "Finance"},
                    {"id": "ind_other", "title": "Other"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list("What industry is your business in?", "Choose Industry", sections)

    @staticmethod
    def ask_chatbot_requirement():
        sections = [
            {
                "title": "Use Case",
                "rows": [
                    {"id": "req_support", "title": "Customer Support"},
                    {"id": "req_lead", "title": "Lead Generation"},
                    {"id": "req_book", "title": "Appointment Booking"},
                    {"id": "req_order", "title": "Order Management"},
                    {"id": "req_crm", "title": "CRM Integration"},
                    {"id": "req_pay", "title": "Payment Collection"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list("What do you primarily want to automate?", "Select Use Case", sections)

    @staticmethod
    def ask_chatbot_volume():
        sections = [
            {
                "title": "Volume",
                "rows": [
                    {"id": "vol_1k", "title": "Under 1,000"},
                    {"id": "vol_10k", "title": "1,000-10,000"},
                    {"id": "vol_50k", "title": "10,000-50,000"},
                    {"id": "vol_50k_plus", "title": "50,000+"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list("Expected monthly conversations?", "Select Volume", sections)

    @staticmethod
    def ask_chatbot_size():
        buttons = [
            {"id": "size_startup", "title": "Startup"},
            {"id": "size_smb", "title": "Small Business"},
            {"id": "size_enterprise", "title": "Enterprise"}
        ]
        return WhatsAppService.create_interactive_buttons("What is your current business size?", buttons)

    @staticmethod
    def ask_chatbot_budget():
        sections = [
            {
                "title": "Budget Range",
                "rows": [
                    {"id": "bud_under_50k", "title": "Under ₹50,000"},
                    {"id": "bud_50k_1l", "title": "₹50k - ₹1 Lakh"},
                    {"id": "bud_1l_3l", "title": "₹1 Lakh - ₹3 Lakhs"},
                    {"id": "bud_above_3l", "title": "Above ₹3 Lakhs"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list("What is your approximate budget for this project?", "Select Budget", sections)

    @staticmethod
    def ask_pricing_service():
        sections = [
            {
                "title": "Select Service",
                "rows": [
                    {"id": "price_wa", "title": "WhatsApp Chatbot"},
                    {"id": "price_voice", "title": "AI Voice Agent"},
                    {"id": "price_web", "title": "Website Dev"},
                    {"id": "price_app", "title": "Mobile App"},
                    {"id": "price_custom", "title": "Custom Software"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list("Which service do you need pricing for?", "Select Service", sections)

    @staticmethod
    def ask_voice_use_case():
        sections = [
            {
                "title": "Select Use Case",
                "rows": [
                    {"id": "v_inbound", "title": "Inbound Receptionist"},
                    {"id": "v_outbound", "title": "Outbound Sales"},
                    {"id": "v_appoint", "title": "Appointments"},
                    {"id": "v_remind", "title": "Payment Reminders"},
                    {"id": "v_survey", "title": "Feedback & Surveys"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list("What is the primary use case for AI Voice Calling?", "Select Use Case", sections)

    @staticmethod
    def ask_expert_dept():
        sections = [
            {
                "title": "Select Department",
                "rows": [
                    {"id": "dept_sales", "title": "Sales Consultant"},
                    {"id": "dept_ai", "title": "AI Expert"},
                    {"id": "dept_tech", "title": "Technical Team"},
                    {"id": "dept_pm", "title": "Project Manager"}
                ]
            }
        ]
        return WhatsAppService.create_interactive_list("Which department would you like to speak with?", "Select Department", sections)
