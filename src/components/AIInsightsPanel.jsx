import React from "react";

/**
 * Textual AI insights based on predicted vs average usage.
 *
 * Props:
 * - isLoading: boolean
 * - error: string | null
 * - predictedEnergy: number | null
 * - average: number | null
 * - current: number | null
 * - savingPercent: number | null
 * - isAnomaly: boolean
 */
export default function AIInsightsPanel({
  isLoading,
  error,
  predictedEnergy,
  average,
  current,
  savingPercent,
  isAnomaly,
}) {
  // Decide recommendation text based on prediction vs average usage.
  let recommendation = "";
  if (predictedEnergy != null && average != null) {
    if (predictedEnergy > average) {
      recommendation =
        "High energy demand expected — consider reducing load.";
    } else {
      recommendation =
        "Low demand period — good opportunity for energy saving.";
    }
  }

  const hasSaving =
    savingPercent != null && Number.isFinite(savingPercent);
  const savingColor =
    hasSaving && savingPercent > 0 ? "text-emerald-400" : "text-red-400";

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-800/95 p-6 shadow-sm flex flex-col">
      <h3 className="text-slate-200 font-semibold text-lg mb-2 tracking-tight">
        AI Insights
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        Plain-language recommendations generated from the forecast.
      </p>

      {isLoading && (
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Analyzing forecast…</span>
        </div>
      )}

      {!isLoading && error && (
        <p className="text-sm text-red-400">
          Unable to compute insights:{" "}
          <span className="font-mono break-all">{error}</span>
        </p>
      )}

      {!isLoading && !error && predictedEnergy != null && average != null && (
        <div className="space-y-4">
          {/* Recommendation text */}
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-700/80">
            <p className="text-sm text-slate-200">{recommendation}</p>
          </div>

          {/* Numbers summary */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Predicted
              </p>
              <p className="text-slate-100 font-semibold mt-1">
                {predictedEnergy.toFixed(1)}{" "}
                <span className="text-xs text-slate-400">kWh</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Average (24h)
              </p>
              <p className="text-slate-100 font-semibold mt-1">
                {average.toFixed(1)}{" "}
                <span className="text-xs text-slate-400">kWh</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Current hour
              </p>
              <p className="text-slate-100 font-semibold mt-1">
                {current != null ? current.toFixed(1) : "—"}{" "}
                <span className="text-xs text-slate-400">kWh</span>
              </p>
            </div>
          </div>

          {/* Energy saving percentage */}
          {hasSaving && (
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-700/80">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Potential Energy Saving
              </p>
              <p className={`text-base font-semibold mt-1 ${savingColor}`}>
                {savingPercent > 0
                  ? `+${savingPercent.toFixed(1)}%`
                  : `${savingPercent.toFixed(1)}%`}
              </p>
            </div>
          )}

          {/* Anomaly detection alert */}
          {isAnomaly && (
            <div className="p-3 rounded-lg bg-red-900/40 border border-red-500/60 text-red-100 text-sm">
              <p className="font-semibold mb-1">
                ⚠️ Unusual energy spike detected
              </p>
              <p className="text-xs text-red-100/90">
                Predicted usage is significantly higher than the 24-hour
                average. Consider investigating large loads or faulty
                equipment.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

