import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Line graph comparing actual vs predicted energy.
 *
 * Props:
 * - data: Array<{ time: string, actual: number | null, predicted: number | null }>
 * - isLoading: boolean
 * - error: string | null
 */
export default function EnergyGraph({ data, isLoading, error }) {
  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-800/95 p-6 shadow-sm">
      <h3 className="text-slate-200 font-semibold text-lg mb-2 tracking-tight">
        Predicted vs Actual Energy
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        Last 24 hours of actual usage with the AI-predicted next hour.
      </p>

      {isLoading && (
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading chart data…</span>
        </div>
      )}

      {!isLoading && error && (
        <p className="text-sm text-red-400">
          Unable to draw chart:{" "}
          <span className="font-mono break-all">{error}</span>
        </p>
      )}

      {!isLoading && !error && data && data.length > 0 && (
        <div className="h-[260px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={{ stroke: "#475569" }}
                label={{
                  value: "Time (hours)",
                  position: "insideBottom",
                  offset: -4,
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={{ stroke: "#475569" }}
                tickFormatter={(v) => `${v} kWh`}
                label={{
                  value: "Energy (kWh)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: 8,
                  color: "#e2e8f0",
                }}
                formatter={(value, name) => [
                  value != null ? `${value.toFixed(1)} kWh` : "—",
                  name === "actual" ? "Actual" : "Predicted",
                ]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend
                wrapperStyle={{ color: "#cbd5f5", fontSize: 12 }}
                formatter={(value) =>
                  value === "actual" ? "Actual" : "Predicted"
                }
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={false}
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

