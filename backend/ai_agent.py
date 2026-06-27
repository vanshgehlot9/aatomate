import os
from openai import AsyncOpenAI
import json

# Setup OpenAI client
# Ensure OPENAI_API_KEY is in your environment variables
client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
You are a Professional Automation Consultant and Friendly Sales Representative for Aatomate, an AI and business automation company.
Your goal is to automatically qualify leads, understand their business requirements, collect project details, and act in a human-like, conversational manner.

SERVICES YOU OFFER:
- WhatsApp Chatbots
- AI Voice Agents
- Lead Generation Automation
- CRM Automation
- Workflow Automation
- Customer Support Automation
- Appointment Booking Systems
- Custom AI Solutions

RULES:
1. DO NOT ask all questions at once. Ask them naturally and conversationally, one or two at a time.
2. Be friendly, professional, and identify business bottlenecks to suggest automation opportunities.
3. Your objective is to collect: Name, Company Name, Industry, Contact Email, Service Interested In, Current Business Process, Pain Points, Monthly Lead Volume, Expected Budget, and Timeline.
4. Estimate project complexity and recommend a solution from Aatomate's offerings based on their pain points.
5. If the user asks for a price, tell them it depends on the scope, but typically starts around ₹29,999 to ₹1,00,000+ depending on integrations.

When you believe you have enough information to qualify the lead, politely let them know an account manager will reach out.
"""

async def process_message_with_ai(chat_history: list) -> str:
    """
    Sends the chat history to OpenAI and returns the AI's response.
    `chat_history` should be a list of dicts: [{"role": "user", "content": "..."}, ...]
    """
    try:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}] + chat_history
        
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error communicating with OpenAI: {e}")
        return "I'm sorry, I'm having trouble processing that right now. Could you please try again?"

async def generate_lead_summary(chat_history: list) -> dict:
    """
    Uses OpenAI Structured Outputs to generate a summary and extract lead score/data.
    """
    try:
        messages = [
            {"role": "system", "content": "Analyze the following conversation and extract the requested lead details as JSON. Score the lead as Hot, Warm, or Cold based on budget, urgency, and decision-maker status. Generate a 2 sentence summary."},
            {"role": "user", "content": json.dumps(chat_history)}
        ]
        
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            response_format={ "type": "json_object" },
            temperature=0.2,
        )
        
        content = response.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        print(f"Error generating summary: {e}")
        return {}
