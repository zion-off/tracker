'use server'

import { unstable_cache } from 'next/cache';

import { db } from '@/firebase-admin';
import { IUnit } from '@/interfaces';

export const getUnits = unstable_cache(
  async (id: string): Promise<IUnit[]> => {
    const unitsRef = db.collection('units');
    try {
      const snapshot = await unitsRef.where('owner', '==', db.doc(`users/${id}`)).get();
      const units: IUnit[] = snapshot.docs.map((doc) => {
        const unitData = doc.data();
        return {
          unit: unitData.unit,
          ref: doc.ref.path,
        };
      });
      return units;
    } catch (error: any) {
      throw new Error(`Error fetching units: ${error.message}`);
    }
  },
  undefined,
  { revalidate: false, tags: ['units'] }
);

