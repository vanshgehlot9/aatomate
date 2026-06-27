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
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
    // Fallback if file is missing (e.g., build time)
    return admin.initializeApp();
  }
}

export const adminApp = initAdmin();
export const db = admin.firestore();
