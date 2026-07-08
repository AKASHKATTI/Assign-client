"use client";

import { useMemo, useReducer } from "react";
import UploadZone from "@/components/upload-zone";
import PreviewTable from "@/components/preview-table";
import ResultTable from "@/components/result-table";
import StatsCards from "@/components/stats-cards";
import { previewCsvApi, processCsvApi } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";

const initialState = {
  file: null,
  previewData: null,
  resultData: null,
  status: "idle", // 'idle' | 'previewing' | 'processing' | 'error'
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_FILE":
      return { ...initialState, file: action.payload, status: "previewing" };
    case "PREVIEW_SUCCESS":
      return { ...state, status: "idle", previewData: action.payload };
    case "PROCESS_START":
      return { ...state, status: "processing", error: "" };
    case "PROCESS_SUCCESS":
      return { ...state, status: "idle", resultData: action.payload };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      throw new Error("Unknown action type");
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { file, previewData, resultData, status, error } = state;

  const previewLoading = status === "previewing";
  const processLoading = status === "processing";

  const canProcess = useMemo(() => {
    return Boolean(file && previewData && !processLoading);
  }, [file, previewData, processLoading]);

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;

    dispatch({ type: "SELECT_FILE", payload: selectedFile });

    try {
      const data = await previewCsvApi(selectedFile);
      dispatch({ type: "PREVIEW_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Failed to preview CSV",
      });
    }
  };

  const handleConfirmImport = async () => {
    if (!file) return;

    dispatch({ type: "PROCESS_START" });

    try {
      const data = await processCsvApi(file);
      dispatch({ type: "PROCESS_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Failed to process CSV",
      });
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const isWorking = previewLoading || processLoading;

  return (
    <main className="min-h-screen bg-white text-black antialiased">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-black/10 bg-white">
                <FileSpreadsheet className="h-6 w-6 text-black" />
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  AI CSV Importer
                </h1>
                <p className="max-w-2xl text-base leading-7 text-black/65 sm:text-lg">
                  Upload a CSV file to preview, clean, map, and import account
                  data into your CRM workflow.
                </p>
              </div>
            </div>

            {(file || previewData || resultData) && !isWorking && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="h-11 rounded-xl border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-black/[0.04]"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </header>

          {status === "error" && error && (
            <Alert className="rounded-2xl border border-black/10 bg-black/[0.03] text-black">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm leading-6">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6 lg:p-8">
            <div className="mb-6 space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Upload CSV</h2>
              <p className="text-sm sm:text-base leading-6 text-black/60">
                Select a raw CSV file to inspect its structure before import.
              </p>
            </div>

            <UploadZone
              onFileSelect={handleFileSelect}
              file={file}
              loading={previewLoading}
            />
          </section>

          {previewData && (
            <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6 lg:p-8">
              <div className="mb-6 space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
                <p className="text-sm leading-6 text-black/60">
                  Review file metadata and sample rows before importing.
                </p>
              </div>

              <StatsCards
                stats={[
                  { label: "File name", value: previewData.fileName || "-" },
                  { label: "Rows", value: previewData.totalRows || 0 },
                  { label: "Headers", value: previewData.headers?.length || 0 },
                ]}
              />

              <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white">
                <PreviewTable
                  headers={previewData.headers || []}
                  rows={previewData.previewRows || []}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleConfirmImport}
                  disabled={!canProcess}
                  className="h-11 rounded-xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50"
                >
                  {processLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Confirm Import
                    </>
                  )}
                </Button>
              </div>
            </section>
          )}

          {resultData && (
            <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6 lg:p-8">
              <div className="mb-6 space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Import Results
                </h2>
                <p className="text-sm leading-6 text-black/60">
                  Review imported records and skipped entries.
                </p>
              </div>

              <StatsCards
                stats={[
                  { label: "Total rows", value: resultData.totalRows || 0 },
                  { label: "Imported", value: resultData.importedCount || 0 },
                  { label: "Skipped", value: resultData.skippedCount || 0 },
                ]}
              />

              <div className="mt-6 space-y-6">
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                  <ResultTable
                    title="Imported Records"
                    rows={resultData.parsedRecords || []}
                  />
                </div>

                {(resultData.skippedRecords || []).length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold tracking-tight">
                      Skipped Records
                    </h3>
                    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02]">
                      <ResultTable
                        title="Skipped Records"
                        rows={resultData.skippedRecords || []}
                        isDark={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}