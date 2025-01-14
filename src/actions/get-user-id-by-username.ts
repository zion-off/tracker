'use server'

import { db } from '@/lib/firebase';

export async function getUserIdByUsername(username: string): Promise<string | null> {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('username', '==', username).get();
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      return userDoc.id;
    }
  } catch (error: any) {
    throw new Error(`Unable to get user's ID: ${error.message}`);
  }
  return null;
}

