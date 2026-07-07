from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import asyncio

# Load environment variables first (if .env is used, though pydantic_settings handles it)
from dotenv import load_dotenv
load_dotenv()

from app.api.v1.endpoints import whatsapp
from app.services.webhook_sync import sync_webhook

# Configure Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI lifespan — runs on startup and shutdown.
    Automatically syncs the webhook URL with Meta on every boot.
    """
    # ── STARTUP ──
    logger.info("🚀 Aatomate API starting up...")
    
    # Run webhook sync in a thread to avoid blocking the event loop
    # Small delay to let the server fully bind (important for ngrok detection)
    await asyncio.sleep(2)
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, sync_webhook)
    
    yield  # Server is running
    
    # ── SHUTDOWN ──
    logger.info("👋 Aatomate API shutting down...")


app = FastAPI(title="Aatomate AI WhatsApp CRM", lifespan=lifespan)

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

# ── Manual webhook sync endpoint (for on-demand re-sync) ──
@app.post("/admin/sync-webhook")
async def manual_webhook_sync():
    """
    Manually trigger webhook URL sync with Meta.
    Useful after ngrok restarts without restarting the server.
    """
    loop = asyncio.get_event_loop()
    success = await loop.run_in_executor(None, sync_webhook)
    return {
        "status": "ok" if success else "error",
        "message": "Webhook synced successfully" if success else "Webhook sync failed — check server logs"
    }

