"use server";

import {
  query,
  where,
  doc,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import { format } from "date-fns";

import { auth } from "@/auth";
import { db } from "@/firebase";
import { IUnitWithCount } from "@/interfaces";

export async function getUnitsCount(): Promise<IUnitWithCount[]> {
  const session = await auth();
  const userId = session?.user?.id as string;

  const dateString = format(new Date(), "yyyy-MM-dd");

  try {
    const user = doc(db, "users", userId);
    const unitsQuery = query(
      collection(db, "units"),
      where("owner", "==", user)
    );
    const unitsSnapshot = await getDocs(unitsQuery);

    const contributionRef = doc(
      db,
      "contributions",
      dateString,
      "users",
      userId
    );
    const contributionDoc = await getDoc(contributionRef);

    const contributions = contributionDoc.exists()
      ? contributionDoc.data().contributions
      : {};

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
}
