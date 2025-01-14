'use server'

import { FieldValue } from 'firebase-admin/firestore';
import { revalidateTag } from 'next/cache';

import { IUnit } from '@/interfaces';
import { db } from '@/firebase-admin';
import { auth } from '@/auth';

export async function addUnit(data: FormData): Promise<IUnit> {
  const unit = data.get('unit') as string;
  const session = await auth();
  const id = session?.user?.id as string;
  const userRef = db.doc(`users/${id}`);

  try {
    const docRef = await db.collection('units').add({
      owner: userRef,
      unit: unit,
      created_at: FieldValue.serverTimestamp(),
    });

    revalidateTag('units');

    return {
      unit: unit,
      ref: docRef.path,
    };
  } catch (error: any) {
    throw new Error(`Unable to add unit: ${error.message}`);
  }
}

