from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Load environment variables first (if .env is used, though pydantic_settings handles it)
from dotenv import load_dotenv
load_dotenv()

from app.api.v1.endpoints import whatsapp

# Configure Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="Aatomate AI WhatsApp CRM")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(whatsapp.router, tags=["WhatsApp Webhook"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Aatomate API is running."}
