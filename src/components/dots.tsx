"use client";

import Link from "next/link";
import { useEffect } from "react";

import Dot from "./dot";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useHomeContext } from "@/context";
import { ChartWithColorsType } from "@/interfaces";

export default function Dots({ chart }: { chart: ChartWithColorsType[] }) {
  const { toast } = useToast();
  const { dots, setAllDots, updateMaxValue } = useHomeContext();

  const maxValue = chart.reduce(
    (max, item) => Math.max(max, item[0]),
    -Infinity
  );

  useEffect(() => {
    updateMaxValue(maxValue);
    setAllDots(chart);
  }, []);

  useEffect(() => {
    const cookieValue = false;
    if (cookieValue) {
      setTimeout(() => {
        toast({
          title: `Hi ${cookieValue}, new here?`,
          description:
            "Set up your units and then come back here to log your daily contributions!",
          action: (
            <Link href={"/configure"}>
              <ToastAction altText="Redirect">Configure</ToastAction>
            </Link>
          ),
        });
      }, 2000);
    }
  }, []);

  return (
    <>
      {dots.map((_, index) => (
        <Dot key={index} dot={dots[index]} index={index} />
      ))}
    </>
  );
}
