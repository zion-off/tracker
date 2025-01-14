'use server'

import { revalidateTag } from 'next/cache';

import { db } from '@/firebase-admin';

export async function deleteUnit(path: string): Promise<void> {
  try {
    const documentRef = db.doc(path);
    await documentRef.delete();
    revalidateTag('units');
  } catch (error: any) {
    throw new Error(`Unable to delete unit ${error.message}`);
  }
}

