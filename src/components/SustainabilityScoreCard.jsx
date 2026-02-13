const IconLeaf = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)
const IconCloud = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)
const IconBolt = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const SCORE = 78
const CO2_REDUCTION_PCT = 24
const GREEN_ENERGY_PCT = 42

export default function SustainabilityScoreCard() {
  return (
    <section
      className="rounded-xl border border-slate-700/80 bg-slate-800/95 p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:border-slate-600/80"
      aria-label="City Sustainability Score"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-emerald-400" aria-hidden>
          <IconLeaf />
        </span>
        <h3 className="text-slate-300 font-semibold text-lg tracking-tight">
          City Sustainability Score
        </h3>
      </div>

      {/* Score out of 100 */}
      <div className="flex items-end gap-4 mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white tabular-nums">{SCORE}</span>
          <span className="text-xl font-medium text-slate-400">/ 100</span>
        </div>
        <div className="flex-1 h-3 rounded-full bg-slate-700/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${SCORE}%` }}
          />
        </div>
      </div>

      {/* CO2 reduction */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
            <span className="text-cyan-400" aria-hidden><IconCloud /></span>
            CO2 reduction estimate
          </span>
          <span className="text-sm font-semibold text-cyan-400 tabular-nums">{CO2_REDUCTION_PCT}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-700/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-500"
            style={{ width: `${CO2_REDUCTION_PCT}%` }}
          />
        </div>
      </div>

      {/* Green energy impact */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
            <span className="text-emerald-400" aria-hidden><IconBolt /></span>
            Green energy impact
          </span>
          <span className="text-sm font-semibold text-emerald-400 tabular-nums">{GREEN_ENERGY_PCT}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-700/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${GREEN_ENERGY_PCT}%` }}
          />
        </div>
      </div>
    </section>
  )
}
