from app.services.whatsapp_service import WhatsAppService, MessageBuilders
from app.services.lead_service import LeadService
from app.db.supabase import db
import logging

logger = logging.getLogger(__name__)

# In-memory state store (shared with whatsapp.py's fallback)
_in_memory_chats: dict = {}

# State Constants
STATE_MAIN_MENU = "MAIN_MENU"
STATE_CHATBOT_INDUSTRY = "CHATBOT_INDUSTRY"
STATE_CHATBOT_REQUIREMENT = "CHATBOT_REQUIREMENT"
STATE_CHATBOT_VOLUME = "CHATBOT_VOLUME"
STATE_CHATBOT_SIZE = "CHATBOT_SIZE"
STATE_CHATBOT_BUDGET = "CHATBOT_BUDGET"
STATE_CHATBOT_CONTACT = "CHATBOT_CONTACT"

STATE_PRICING_SERVICE = "PRICING_SERVICE"
STATE_PRICING_PACKAGE = "PRICING_PACKAGE"

STATE_VOICE_USE_CASE = "VOICE_USE_CASE"
STATE_VOICE_VOLUME = "VOICE_VOLUME"

STATE_EXPERT_DEPT = "EXPERT_DEPT"

STATE_CONTACT_SALES_NAME = "CONTACT_SALES_NAME"
STATE_CONTACT_SALES_COMPANY = "CONTACT_SALES_COMPANY"
STATE_CONTACT_SALES_PHONE = "CONTACT_SALES_PHONE"
STATE_CONTACT_SALES_EMAIL = "CONTACT_SALES_EMAIL"
STATE_CONTACT_SALES_MSG = "CONTACT_SALES_MSG"

STATE_DEMO_SELECTION = "DEMO_SELECTION"

class BotStateMachine:
    @staticmethod
    async def process_user_input(phone_number: str, chat_id: str, lead_id: str, user_input: str, is_interactive: bool = False, interactive_id: str = None):
        """
        Main state machine to process user input.
        """
        use_memory = not db or (chat_id and str(chat_id).startswith("mem_"))
        
        if use_memory:
            logger.info(f"[state_machine] Using in-memory state for {phone_number}")
            if phone_number not in _in_memory_chats:
                _in_memory_chats[phone_number] = {"state": STATE_MAIN_MENU, "lead_data": {}}
            mem_state = _in_memory_chats[phone_number]
            current_state = mem_state.get("state", STATE_MAIN_MENU)
            lead_data = mem_state.get("lead_data", {})
        else:
            try:
                chat_response = db.table("whatsapp_chats").select("bot_state").eq("id", chat_id).execute()
                if not chat_response.data:
                    logger.warning(f"[state_machine] No chat found for id={chat_id}, defaulting to MAIN_MENU")
                    current_state = STATE_MAIN_MENU
                    lead_data = {}
                else:
                    chat_data = chat_response.data[0]
                    bot_state = chat_data.get("bot_state") or {}
                    current_state = bot_state.get("state", STATE_MAIN_MENU)
                    lead_data = bot_state.get("lead_data", {})
            except Exception as e:
                logger.error(f"[state_machine] DB Error fetching state: {e}. Falling back to memory.", exc_info=True)
                use_memory = True
                if phone_number not in _in_memory_chats:
                    _in_memory_chats[phone_number] = {"state": STATE_MAIN_MENU, "lead_data": {}}
                mem_state = _in_memory_chats[phone_number]
                current_state = mem_state.get("state", STATE_MAIN_MENU)
                lead_data = mem_state.get("lead_data", {})
        
        logger.info(f"[state_machine] phone={phone_number} current_state={current_state} interactive_id={interactive_id}")
        
        next_state = current_state
        response_payload = None
        
        if current_state == STATE_MAIN_MENU:
            if interactive_id == "menu_chatbot":
                lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)
                next_state = STATE_CHATBOT_INDUSTRY
                lead_data["service_interested"] = "WhatsApp Chatbot Automation"
                response_payload = MessageBuilders.ask_industry()
            elif interactive_id == "menu_pricing":
                lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)
                next_state = STATE_PRICING_SERVICE
                lead_data["service_interested"] = "Get Pricing"
                response_payload = MessageBuilders.ask_pricing_service()
            elif interactive_id == "menu_voice":
                lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)
                next_state = STATE_VOICE_USE_CASE
                lead_data["service_interested"] = "AI Voice Calling"
                response_payload = MessageBuilders.ask_voice_use_case()
            elif interactive_id == "menu_expert":
                lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)
                next_state = STATE_EXPERT_DEPT
                lead_data["service_interested"] = "Talk to an Expert"
                response_payload = MessageBuilders.ask_expert_dept()
            elif interactive_id == "menu_demo":
                lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)
                next_state = STATE_DEMO_SELECTION
                lead_data["service_interested"] = "See Our Product"
                response_payload = MessageBuilders.ask_demo_selection()
            else:
                # Any text message (like "hi", "hello", etc.) → show main menu
                response_payload = MessageBuilders.send_main_menu()
                next_state = STATE_MAIN_MENU
                
        elif current_state == STATE_DEMO_SELECTION:
            if is_interactive and interactive_id == "demo_hospital":
                # Redirect to Hospital Bot
                text = "Great choice! 🏥\n\nClick this link to chat with our live Hospital Bot and see it in action:\nhttps://wa.me/919000272057"
                response_payload = WhatsAppService.create_text_message(text)
                # Reset to main menu after redirecting
                next_state = STATE_MAIN_MENU
            else:
                response_payload = MessageBuilders.ask_demo_selection()
                next_state = STATE_DEMO_SELECTION
                
        elif current_state == STATE_CHATBOT_INDUSTRY:
            if is_interactive:
                lead_data["industry"] = user_input
                next_state = STATE_CHATBOT_REQUIREMENT
                response_payload = MessageBuilders.ask_chatbot_requirement()
            else:
                response_payload = MessageBuilders.ask_industry()
                
        elif current_state == STATE_CHATBOT_REQUIREMENT:
            if is_interactive:
                lead_data["requirements"] = user_input
                next_state = STATE_CHATBOT_VOLUME
                response_payload = MessageBuilders.ask_chatbot_volume()
            else:
                response_payload = MessageBuilders.ask_chatbot_requirement()
                
        elif current_state == STATE_CHATBOT_VOLUME:
            if is_interactive:
                lead_data["monthly_volume"] = user_input
                next_state = STATE_CHATBOT_SIZE
                response_payload = MessageBuilders.ask_chatbot_size()
            else:
                response_payload = MessageBuilders.ask_chatbot_volume()
                
        elif current_state == STATE_CHATBOT_SIZE:
            if is_interactive:
                lead_data["business_size"] = user_input
                next_state = STATE_CHATBOT_BUDGET
                response_payload = MessageBuilders.ask_chatbot_budget()
            else:
                response_payload = MessageBuilders.ask_chatbot_size()

        elif current_state == STATE_CHATBOT_BUDGET:
            if is_interactive:
                lead_data["budget"] = user_input
                next_state = STATE_CHATBOT_CONTACT
                response_payload = WhatsAppService.create_text_message("Got it. Please reply with your work email address so we can send the proposal.")
            else:
                response_payload = MessageBuilders.ask_chatbot_budget()
                
        elif current_state == STATE_CHATBOT_CONTACT:
            lead_data["email"] = user_input
            response_payload = WhatsAppService.create_text_message("Thank you! Your requirements have been recorded. Our AI is generating your proposal and an expert will reach out shortly to schedule a demo.")
            next_state = STATE_MAIN_MENU
            lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)
            await LeadService.run_lead_qualification(chat_id, lead_id, lead_data)
            
        elif current_state == STATE_CONTACT_SALES_NAME:
            lead_data["name"] = user_input
            next_state = STATE_CONTACT_SALES_COMPANY
            response_payload = WhatsAppService.create_text_message("Thanks! What is your company name?")
            
        elif current_state == STATE_CONTACT_SALES_COMPANY:
            lead_data["company_name"] = user_input
            next_state = STATE_CONTACT_SALES_EMAIL
            response_payload = WhatsAppService.create_text_message("What is your email address?")
            
        elif current_state == STATE_CONTACT_SALES_EMAIL:
            lead_data["email"] = user_input
            next_state = STATE_CONTACT_SALES_MSG
            response_payload = WhatsAppService.create_text_message("Please write a short message about how we can help you.")
            
        elif current_state == STATE_CONTACT_SALES_MSG:
            lead_data["requirements"] = user_input
            response_payload = WhatsAppService.create_text_message("Thank you for contacting sales. We have received your message and will be in touch shortly!")
            next_state = STATE_MAIN_MENU
            lead_id = LeadService.ensure_lead_record(phone_number, chat_id, lead_id, lead_data)
            await LeadService.run_lead_qualification(chat_id, lead_id, lead_data)
            
        # Add basic logic for PRICING, VOICE, EXPERT flows
        elif current_state == STATE_PRICING_SERVICE:
            if is_interactive:
                lead_data["service_interested"] = user_input
                # Fast track
                response_payload = WhatsAppService.create_text_message("We'll send you pricing details shortly. What is your email address?")
                next_state = STATE_CHATBOT_CONTACT
            else:
                response_payload = MessageBuilders.ask_pricing_service()
                
        elif current_state == STATE_VOICE_USE_CASE:
            if is_interactive:
                lead_data["requirements"] = user_input
                response_payload = WhatsAppService.create_text_message("Please provide your email address to schedule a live demo of our Voice AI.")
                next_state = STATE_CHATBOT_CONTACT
            else:
                response_payload = MessageBuilders.ask_voice_use_case()
                
        elif current_state == STATE_EXPERT_DEPT:
            if is_interactive:
                lead_data["requirements"] = f"Wants to talk to: {user_input}"
                response_payload = WhatsAppService.create_text_message("Excellent. What is your email address to book a meeting?")
                next_state = STATE_CHATBOT_CONTACT
            else:
                response_payload = MessageBuilders.ask_expert_dept()

        else:
            response_payload = MessageBuilders.send_main_menu()
            next_state = STATE_MAIN_MENU

        if response_payload:
            logger.info(f"[state_machine] Sending response to {phone_number}, next_state={next_state}")
            WhatsAppService.send_whatsapp_message(phone_number, response_payload)
        else:
            logger.warning(f"[state_machine] No response payload generated for {phone_number}")

        # Persist state
        if use_memory:
            _in_memory_chats[phone_number] = {"state": next_state, "lead_data": lead_data}
        elif db:
            try:
                bot_state = {"state": next_state, "lead_data": lead_data}
                db.table("whatsapp_chats").update({"bot_state": bot_state}).eq("id", chat_id).execute()
            except Exception as e:
                logger.error(f"[state_machine] DB Error updating state: {e}. Falling back to memory.", exc_info=True)
                _in_memory_chats[phone_number] = {"state": next_state, "lead_data": lead_data}
