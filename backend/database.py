import os
from supabase import create_client, Client

def get_supabase_client() -> Client:
    # Render env vars or local .env
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

    if not url or not key:
        print("⚠️ Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing!")
        # Fallback for local development if needed, though they should be in .env
        url = url or "https://placeholder-url.supabase.co"
        key = key or "placeholder-key"
        
    return create_client(url, key)

# Export a globally accessible Supabase client instance
db = get_supabase_client()
