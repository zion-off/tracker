"use client";

import {
  useState,
  useOptimistic,
  createContext,
  useContext,
  ReactNode,
} from "react";

import {
  IUnitWithCount,
  IHomeContext,
  optimisticContributionUpdate,
} from "@/interfaces";

const HomeContext = createContext<IHomeContext | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [contributions, setContributions] = useState<IUnitWithCount[]>([]);
  const [optimisticContributions, setOptimisticContributions] = useOptimistic(
    contributions,
    (
      state: IUnitWithCount[],
      { action, contribution }: optimisticContributionUpdate
    ) => {
      switch (action) {
        case "increment":
          return contribution
            ? state.map((item) =>
                item.ref === contribution.ref
                  ? { ...item, count: (item.count || 0) + 1 }
                  : item
              )
            : state;
        case "decrement":
          return contribution
            ? state.map((item) =>
                item.ref === contribution.ref && (item.count || 0) > 0
                  ? { ...item, count: (item.count || 0) - 1 }
                  : item
              )
            : state;
        default:
          return state;
      }
    }
  );

  const value = {
    contributions,
    setContributions,
    optimisticContributions,
    setOptimisticContributions,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Home context not available");
  }
  return context;
}
