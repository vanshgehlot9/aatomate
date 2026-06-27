import os
import firebase_admin
from firebase_admin import credentials, firestore

# Determine the absolute path to the Firebase Service Account JSON file.
# The user provided it in the root directory.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CREDENTIALS_PATH = os.path.join(BASE_DIR, "whatsapp-doctor-booking-firebase-adminsdk-fbsvc-6829c11a41.json")

def init_firebase():
    """Initializes the Firebase Admin SDK if it hasn't been initialized yet."""
    if not firebase_admin._apps:
        try:
            cred = credentials.Certificate(CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred)
            print("✅ Firebase initialized successfully.")
        except Exception as e:
            print(f"❌ Failed to initialize Firebase: {e}")

# Initialize it on import
init_firebase()

# Export a globally accessible Firestore client instance
db = firestore.client()
