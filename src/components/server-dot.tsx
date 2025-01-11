import { colors, hoverCardWord } from "@/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ServerDot({
  maxChartValue,
  contribution,
  index,
}: {
  maxChartValue: number;
  contribution: number;
  index: number;
}) {
  const colorClass = () => {
    if (contribution === 0) return colors[4];

    const percentage = (contribution / maxChartValue) * 100;

    if (percentage <= 25) return colors[3];
    if (percentage <= 50) return colors[2];
    if (percentage <= 75) return colors[1];
    return colors[0];
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          className={`aspect-square ${colorClass()} text-xs flex items-center justify-center h-[10px] rounded-sm cursor-pointer`}
        />
      </HoverCardTrigger>
      <HoverCardContent>{hoverCardWord(contribution, index)}</HoverCardContent>
    </HoverCard>
  );
}
