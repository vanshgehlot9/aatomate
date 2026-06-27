from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class LeadCreate(BaseModel):
    phone_number: str
    name: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    email: Optional[str] = None
    service_interested_in: Optional[str] = None
    current_process: Optional[str] = None
    pain_points: Optional[str] = None
    monthly_lead_volume: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    status: str = "New"
    score: str = "Cold" # Hot, Warm, Cold
    ai_summary: Optional[str] = None

class ChatMessage(BaseModel):
    role: str # 'user' or 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=datetime.now)

# Meta WhatsApp Webhook Models
class WhatsAppText(BaseModel):
    body: str

class WhatsAppMessage(BaseModel):
    from_: str = Field(alias="from")
    id: str
    timestamp: str
    type: str
    text: Optional[WhatsAppText] = None

class WhatsAppValue(BaseModel):
    messaging_product: str
    metadata: dict
    contacts: Optional[list] = None
    messages: Optional[List[WhatsAppMessage]] = None

class WhatsAppChange(BaseModel):
    value: WhatsAppValue
    field: str

class WhatsAppEntry(BaseModel):
    id: str
    changes: List[WhatsAppChange]

class WhatsAppWebhookPayload(BaseModel):
    object: str
    entry: List[WhatsAppEntry]
