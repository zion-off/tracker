export function Spectrum() {
  return (
    <div className="flex items-center justify-end text-xxs gap-2">
      <p>Less</p>
      <div className="flex gap-1 items-center">
        <div
          className={`aspect-square bg-gh-green-5 text-xs h-[10px] rounded-sm cursor-pointer`}
        />
        <div
          className={`aspect-square bg-gh-green-4 text-xs h-[10px] rounded-sm cursor-pointer`}
        />
        <div
          className={`aspect-square bg-gh-green-3 text-xs h-[10px] rounded-sm cursor-pointer`}
        />
        <div
          className={`aspect-square bg-gh-green-2 text-xs h-[10px] rounded-sm cursor-pointer`}
        />
        <div
          className={`aspect-square bg-gh-green-1 text-xs h-[10px] rounded-sm cursor-pointer`}
        />
      </div>

      <p>More</p>
    </div>
  );
}
