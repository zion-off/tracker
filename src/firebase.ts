import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getFirebasePrivateKey(): string {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  
  if (!privateKey) {
    throw new Error('FIREBASE_PRIVATE_KEY is not set in the environment variables');
  }

  // Check if the key is already formatted correctly
  if (privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    return privateKey;
  }

  // If not, assume it's a JSON string and parse it
  try {
    return JSON.parse(privateKey);
  } catch (error) {
    console.error('Error parsing FIREBASE_PRIVATE_KEY:', error);
    throw new Error('FIREBASE_PRIVATE_KEY is not correctly formatted');
  }
}

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: getFirebasePrivateKey(),
      }),
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    throw error;
  }
}

export const db = getFirestore();

