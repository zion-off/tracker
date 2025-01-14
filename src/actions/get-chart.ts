'use server'

import { unstable_cache } from 'next/cache';

import { db } from '@/firebase';

export const getChartData = unstable_cache(
  async (id: string, year: string) => {
    const chartRef = db.doc(`charts/${id}/years/${year}`);

    try {
      const chartDoc = await chartRef.get();
      if (!chartDoc.exists) {
        return new Array(366).fill(0);
      }

      return chartDoc.data()?.counts;
    } catch (error: any) {
      throw new Error(`Failed to fetch chart data: ${error.message}`);
    }
  },
  undefined,
  { revalidate: false, tags: ['chart'] }
);

