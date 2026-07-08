"use client";

/**
 * @typedef {Object.<string, string | number>} RowData
 * @property {number} __rowNumber
 *
 * @param {{headers: string[], rows: RowData[]}} props
 */


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PreviewTable({ headers = [], rows = [] }) {
  return (
    <div className="relative w-full overflow-auto max-h-[380px]">
      <Table className="min-w-[800px] w-full border-collapse text-left">
        <TableHeader className="sticky top-0 z-10 bg-zinc-50/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(228,228,231,0.6)]">
          <TableRow className="border-b border-zinc-200 hover:bg-transparent">
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
        <TableBody className="bg-white">
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <TableRow
                key={row.__rowNumber || rowIndex}
                className="border-b border-zinc-100 transition-colors hover:bg-zinc-50/60"
              >
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
                className="h-24 px-4 text-center text-xs text-zinc-400 font-mono"
              >
                No active preview metrics indexed.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}