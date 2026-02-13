import React from "react";

/**
 * Simple card that shows the latest predicted energy value.
 *
 * Props:
 * - isLoading: boolean – whether the prediction request is in progress
 * - error: string | null – error message if the API call failed
 * - predictedEnergy: number | null – predicted next-hour energy usage (kWh)
 */
export default function EnergyPredictionCard({
  isLoading,
  error,
  predictedEnergy,
}) {
  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-800/95 p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-slate-200 font-semibold text-lg mb-2 tracking-tight">
          Predicted Next Hour Energy
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          Forecast from the LSTM model running in the backend.
        </p>
      </div>

      {/* Content area */}
      <div className="mt-2 flex-1 flex flex-col justify-center">
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Fetching latest prediction…</span>
          </div>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-400">
            Failed to load prediction:{" "}
            <span className="font-mono break-all">{error}</span>
          </p>
        )}

        {!isLoading && !error && predictedEnergy != null && (
          <div>
            <p className="text-4xl font-bold text-white tabular-nums">
              {predictedEnergy.toFixed(1)}
              <span className="text-lg font-medium text-cyan-300 ml-2">
                kWh
              </span>
            </p>
            <p className="text-xs text-slate-500 mt-2">
              This value is computed using the last 24 hours of energy usage.
            </p>
          </div>
        )}

        {!isLoading && !error && predictedEnergy == null && (
          <p className="text-sm text-slate-400">
            No prediction available yet. Please refresh the page to try again.
          </p>
        )}
      </div>
    </div>
  );
}

