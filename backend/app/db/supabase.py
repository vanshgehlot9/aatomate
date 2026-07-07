from supabase import create_client, Client
from app.core.config import settings

def get_db_client() -> Client:
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_KEY
    if not url or not key:
        raise ValueError("Supabase URL and Key must be provided in the environment variables.")
    return create_client(url, key)

try:
    db = get_db_client()
except ValueError as e:
    # If the user has not provided Supabase credentials yet, initialize as None
    print(f"Warning: {e}")
    db = None
