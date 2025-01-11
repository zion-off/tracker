export const TableLayout = ({ children }: { children: React.ReactNode }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Mon", "Wed", "Fri"];

  return (
    <div className="grid grid-cols-[auto_repeat(12,1fr)] gap-1 text-xs min-w-[50rem]">
      {/* Header row with months */}
      <div className="p-1"></div>
      {months.map((month, index) => (
        <div key={index} className="p-1">
          {month}
        </div>
      ))}

      {/* Days column and component space */}
      <div className="col-span-1 row-span-7 flex flex-col justify-around text-right">
        {days.map((day, index) => (
          <div key={index} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Component space */}
      <div className="col-span-12 row-span-7">{children}</div>
    </div>
  );
};
