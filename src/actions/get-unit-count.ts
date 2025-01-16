'use server'

import { unstable_cache } from 'next/cache';
import { format } from 'date-fns';

import { db } from '@/lib/firebase';
import { UnitWithCountType } from '@/interfaces';

export const getUnitsCount = unstable_cache(
  async (userId: string): Promise<UnitWithCountType[]> => {
    const dateString = format(new Date(), 'yyyy-MM-dd');

    try {
      const unitsRef = db.collection('units');
      const unitsSnapshot = await unitsRef.where('owner', '==', db.doc(`users/${userId}`)).get();

      const contributionRef = db.doc(`contributions/${dateString}/users/${userId}`);
      const contributionDoc = await contributionRef.get();

      const contributions = contributionDoc.exists ? contributionDoc.data()?.contributions : {};

      const units: IUnitWithCount[] = unitsSnapshot.docs.map((doc) => {
        const unitData = doc.data();
        return {
          unit: unitData.unit,
          ref: doc.ref.path,
          count: contributions[doc.ref.path] || 0,
        };
      });

      return units;
    } catch (error) {
      throw error;
    }
  },
  undefined,
  { revalidate: false, tags: ['unit-count'] }
);

