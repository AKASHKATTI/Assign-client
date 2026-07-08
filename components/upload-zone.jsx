"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileSpreadsheet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UploadZone({ onFileSelect, file, loading }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files) => {
    const selected = files?.[0];
    if (!selected) return;
    onFileSelect(selected);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition sm:p-10",
        dragging
          ? "border-black bg-black/[0.03]"
          : "border-black/15 bg-white hover:bg-black/[0.02]",
        loading && "pointer-events-none opacity-60"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={loading}
      />

      <div className="mx-auto flex max-w-lg flex-col items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/10 bg-white">
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-black" />
          ) : (
            <UploadCloud className="h-6 w-6 text-black" />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
            {loading ? "Reading your CSV file..." : "Drag and drop your CSV file"}
          </h3>

          <p className="mx-auto max-w-md text-base leading-7 text-black/60">
            Upload one CSV file to preview its columns and prepare it for import.
          </p>
        </div>

        {!file && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="mt-1 h-11 rounded-xl border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black hover:text-white"
          >
            Choose File
          </Button>
        )}

        {file && !loading && (
          <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3">
            <FileSpreadsheet className="h-5 w-5 shrink-0 text-black" />

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-black">
                {file.name}
              </p>
              <p className="text-sm text-black/55">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}