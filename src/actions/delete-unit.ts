'use server'

import { revalidateTag } from 'next/cache';

import { db } from '@/lib/firebase';

export async function deleteUnit(path: string): Promise<void> {
  try {
    const documentRef = db.doc(path);
    await documentRef.delete();
    revalidateTag('units');
    revalidateTag('unit-count');
  } catch (error: any) {
    throw new Error(`Unable to delete unit ${error.message}`);
  }
}

