import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ResultTable({ title, rows = [] }) {
  const headers = rows.length ? Object.keys(rows[0]) : [];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold tracking-tight text-zinc-900 px-1">{title}</h3>
      <div className="relative w-full overflow-auto max-h-[380px] rounded-xl border border-zinc-200 shadow-sm">
        <Table className="min-w-[900px] w-full">
          <TableHeader className="sticky top-0 z-10 bg-zinc-50/95 backdrop-blur-md">
            <TableRow className="border-b-zinc-200 hover:bg-transparent">
              {headers.map((header) => (
                <TableHead
                  key={header}
                  className="h-11 whitespace-nowrap px-4 text-xs font-mono font-bold text-zinc-700 uppercase tracking-wider"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-zinc-100">
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="transition-colors hover:bg-zinc-50/60">
                  {headers.map((header) => (
                    <TableCell
                      key={`${rowIndex}-${header}`}
                      className="whitespace-nowrap px-4 py-3 text-xs text-zinc-600 font-normal"
                    >
                      {row[header] !== undefined && row[header] !== null && row[header] !== "" 
                        ? String(row[header]) 
                        : <span className="text-zinc-300">—</span>}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length || 1}
                  className="h-24 text-center text-xs text-zinc-400 font-mono"
                >
                  Zero active matrix instances mapping.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}