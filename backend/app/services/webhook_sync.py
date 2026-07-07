"""
Webhook Sync Service — Automatically registers the correct webhook URL
with Meta's WhatsApp Cloud API on every server startup.

How it works:
  - PRODUCTION (Render): Uses RENDER_EXTERNAL_URL env var (auto-set by Render)
    or the explicit WEBHOOK_BASE_URL env var.
  - DEVELOPMENT (ngrok): Auto-detects the ngrok tunnel URL via its local API.
  - Calls POST /<WABA_ID>/subscribed_apps to set the override_callback_uri.
  - This ensures Meta always routes webhooks to the CURRENT server URL,
    even when ngrok restarts with a new URL.
"""

import os
import time
import logging
from typing import Optional
import requests as _requests
from app.core.config import settings

logger = logging.getLogger(__name__)

WA_API_VERSION = "v20.0"
NGROK_API = "http://localhost:4040/api/tunnels"
WEBHOOK_PATH = "/webhook/whatsapp"


def _detect_base_url() -> Optional[str]:
    """
    Detect the publicly reachable base URL in this priority order:
      1. Explicit WEBHOOK_BASE_URL env var (highest priority, manual override)
      2. RENDER_EXTERNAL_URL (auto-set by Render on every deploy)
      3. ngrok local tunnel (development)
    Returns the base URL (e.g. "https://my-app.onrender.com") or None.
    """
    # 1. Explicit override — useful for custom domains or other platforms
    explicit = os.environ.get("WEBHOOK_BASE_URL", "").strip().rstrip("/")
    if explicit:
        logger.info(f"[webhook_sync] Using explicit WEBHOOK_BASE_URL: {explicit}")
        return explicit

    # 2. Render.com auto-sets this env var
    render_url = os.environ.get("RENDER_EXTERNAL_URL", "").strip().rstrip("/")
    if render_url:
        logger.info(f"[webhook_sync] Using RENDER_EXTERNAL_URL: {render_url}")
        return render_url

    # 3. Try ngrok local API (development)
    for attempt in range(3):
        try:
            resp = _requests.get(NGROK_API, timeout=3)
            if resp.status_code == 200:
                tunnels = resp.json().get("tunnels", [])
                for t in tunnels:
                    public_url = t.get("public_url", "")
                    if public_url.startswith("https://"):
                        logger.info(f"[webhook_sync] Detected ngrok tunnel: {public_url}")
                        return public_url
                # If only http tunnel found, use that
                for t in tunnels:
                    public_url = t.get("public_url", "")
                    if public_url:
                        logger.info(f"[webhook_sync] Detected ngrok tunnel (non-https): {public_url}")
                        return public_url
        except _requests.ConnectionError:
            if attempt < 2:
                logger.info(f"[webhook_sync] ngrok not ready, retrying in 2s... (attempt {attempt + 1}/3)")
                time.sleep(2)
        except Exception as e:
            logger.warning(f"[webhook_sync] Error querying ngrok: {e}")
            break

    logger.warning("[webhook_sync] Could not detect any public URL (no WEBHOOK_BASE_URL, no RENDER_EXTERNAL_URL, no ngrok)")
    return None


def _register_webhook(base_url: str) -> bool:
    """
    Register the webhook override with Meta at the WABA level.
    Uses POST /<WABA_ID>/subscribed_apps with override_callback_uri.
    """
    waba_id = settings.WHATSAPP_BUSINESS_ACCOUNT_ID
    token = settings.WHATSAPP_TOKEN
    verify_token = settings.WHATSAPP_VERIFY_TOKEN

    if not waba_id or not token:
        logger.error("[webhook_sync] Missing WHATSAPP_BUSINESS_ACCOUNT_ID or WHATSAPP_TOKEN — cannot register webhook")
        return False

    callback_url = f"{base_url}{WEBHOOK_PATH}"
    url = f"https://graph.facebook.com/{WA_API_VERSION}/{waba_id}/subscribed_apps"

    payload = {
        "override_callback_uri": callback_url,
        "verify_token": verify_token or "12345",
    }

    logger.info(f"[webhook_sync] Registering webhook: {callback_url}")
    logger.info(f"[webhook_sync] WABA ID: {waba_id}")

    try:
        resp = _requests.post(
            url,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=15,
        )

        if resp.status_code == 200 and resp.json().get("success"):
            logger.info(f"[webhook_sync] ✅ Webhook registered successfully: {callback_url}")
            return True
        else:
            logger.error(f"[webhook_sync] ❌ Failed to register webhook: {resp.status_code} {resp.text}")
            return False

    except Exception as e:
        logger.error(f"[webhook_sync] ❌ Exception registering webhook: {e}")
        return False


def _verify_registration() -> Optional[dict]:
    """
    Query the phone number's webhook_configuration to confirm the override is active.
    """
    phone_id = settings.WHATSAPP_PHONE_NUMBER_ID
    token = settings.WHATSAPP_TOKEN

    if not phone_id or not token:
        return None

    try:
        resp = _requests.get(
            f"https://graph.facebook.com/{WA_API_VERSION}/{phone_id}",
            params={"fields": "webhook_configuration,display_phone_number", "access_token": token},
            timeout=10,
        )
        if resp.status_code == 200:
            data = resp.json()
            wh_config = data.get("webhook_configuration", {})
            display = data.get("display_phone_number", "?")
            logger.info(f"[webhook_sync] Phone {display} (ID: {phone_id}) webhook config: {wh_config}")
            return wh_config
        else:
            logger.warning(f"[webhook_sync] Could not verify: {resp.status_code} {resp.text[:200]}")
            return None
    except Exception as e:
        logger.warning(f"[webhook_sync] Verification query failed: {e}")
        return None


def sync_webhook() -> bool:
    """
    Main entry point — detect URL, register webhook, verify.
    Call this on server startup.
    Returns True if webhook was successfully registered.
    """
    logger.info("[webhook_sync] ═══════════════════════════════════════════")
    logger.info("[webhook_sync] Starting webhook synchronization...")

    # Detect environment
    env = "production" if os.environ.get("RENDER_EXTERNAL_URL") or os.environ.get("RENDER") else "development"
    logger.info(f"[webhook_sync] Environment: {env}")

    # Detect URL
    base_url = _detect_base_url()
    if not base_url:
        logger.error("[webhook_sync] ❌ No public URL detected — webhook NOT registered")
        logger.error("[webhook_sync] For dev: make sure ngrok is running (ngrok http 8000)")
        logger.error("[webhook_sync] For prod: set RENDER_EXTERNAL_URL or WEBHOOK_BASE_URL")
        logger.info("[webhook_sync] ═══════════════════════════════════════════")
        return False

    # Register
    success = _register_webhook(base_url)

    # Verify
    if success:
        _verify_registration()

    logger.info("[webhook_sync] ═══════════════════════════════════════════")
    return success
