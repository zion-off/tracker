import { Dots } from "./dots";
import { TableLayout } from "./table-layout";

export default async function Chart({userId}: {userId: string}) {
  // TODO: Change this to accepting year as a prop
  const year = new Date().getFullYear();
  const invisibleDots = new Array(new Date(year, 0).getDay()).fill(-1);

  return (
    <div className="w-full h-auto items-end flex">
      <div className="my-4 border border-slate-200 dark:border-zinc-800 p-5 rounded-md overflow-x-scroll">
        <TableLayout>
          <Dots id={userId} padding={invisibleDots} />
        </TableLayout>
      </div>
    </div>
  );
}
