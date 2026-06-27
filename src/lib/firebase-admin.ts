import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Load the service account JSON from the root directory
const serviceAccountPath = path.join(process.cwd(), 'whatsapp-doctor-booking-firebase-adminsdk-fbsvc-6829c11a41.json');

function initAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }
  
  try {
    let serviceAccount;
    // 1. Try to load from environment variable (Vercel)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } 
    // 2. Fallback to local file (Local Development)
    else if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    } else {
      console.warn("No Firebase Service Account found. Using default initialization.");
      return admin.initializeApp();
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
    return admin.initializeApp();
  }
}

export const adminApp = initAdmin();
export const db = admin.firestore();
