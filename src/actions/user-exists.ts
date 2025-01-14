'use server'

import { db } from '@/firebase';

export async function userExists(email: string): Promise<boolean> {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
}

