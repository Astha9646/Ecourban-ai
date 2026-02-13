const IconLightning = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)
const IconClock = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconChart = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)
const ArrowRight = () => (
  <svg className="w-5 h-5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)
const ArrowDown = () => (
  <svg className="w-4 h-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
)

const COMPARISON_ROWS = [
  {
    label: 'Energy usage',
    icon: IconLightning,
    before: { value: '124,580', unit: 'kWh', desc: '30-day total' },
    after: { value: '98,240', unit: 'kWh', desc: '30-day total' },
    trend: 'down',
  },
  {
    label: 'Peak load',
    icon: IconClock,
    before: { value: '2:45 PM', unit: '', desc: 'Weekday peak' },
    after: { value: '10:30 AM', unit: '', desc: 'Off-peak shifted' },
    trend: 'improved',
  },
  {
    label: 'Estimated savings',
    icon: IconChart,
    before: { value: '—', unit: '', desc: 'Baseline' },
    after: { value: '21.2', unit: '%', desc: 'vs. baseline' },
    trend: 'up',
  },
]

export default function ComparisonPanel() {
  return (
    <section aria-label="Before vs After Optimization">
      <h3 className="text-slate-300 font-semibold text-lg mb-4 tracking-tight">
        Before vs After Optimization
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-xl border border-slate-700/80 overflow-hidden bg-slate-800/95 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:border-slate-600/80">
        {/* Left: Before */}
        <div className="p-5 border-b md:border-b-0 md:border-r border-slate-700/80 bg-slate-800/80">
          <p className="text-amber-400/90 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden />
            Before Optimization
          </p>
          <ul className="space-y-4">
            {COMPARISON_ROWS.map((row) => {
              const Icon = row.icon
              return (
              <li key={row.label} className="flex items-start gap-3">
                <span className="text-amber-400/80 mt-0.5" aria-hidden>
                  <Icon />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{row.label}</p>
                  <p className="text-xl font-bold text-white tabular-nums mt-0.5">
                    {row.before.value}
                    {row.before.unit && <span className="text-slate-400 font-semibold ml-1">{row.before.unit}</span>}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{row.before.desc}</p>
                </div>
              </li>
              )
            })}
          </ul>
        </div>

        {/* Center: Arrows */}
        <div className="hidden md:flex flex-col justify-center items-center gap-6 py-6 px-4 bg-slate-800/50">
          {COMPARISON_ROWS.map((row) => (
            <div key={row.label} className="flex flex-col items-center gap-1">
              <ArrowRight />
              {row.trend === 'down' && <span className="text-xs text-green-400 font-medium">↓ Reduced</span>}
              {row.trend === 'improved' && <span className="text-xs text-cyan-400 font-medium">Shifted</span>}
              {row.trend === 'up' && <span className="text-xs text-green-400 font-medium">↑ Savings</span>}
            </div>
          ))}
        </div>

        {/* Right: After */}
        <div className="p-5 bg-slate-800/80">
          <p className="text-cyan-400/90 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" aria-hidden />
            After Optimization
          </p>
          <ul className="space-y-4">
            {COMPARISON_ROWS.map((row) => {
              const Icon = row.icon
              return (
              <li key={row.label} className="flex items-start gap-3">
                <span className="text-cyan-400/80 mt-0.5" aria-hidden>
                  <Icon />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{row.label}</p>
                  <p className="text-xl font-bold text-white tabular-nums mt-0.5 flex items-center gap-2">
                    {row.after.value}
                    {row.after.unit && <span className="text-slate-400 font-semibold">{row.after.unit}</span>}
                    {row.trend !== 'up' && row.trend !== 'improved' && <ArrowDown />}
                    {row.trend === 'up' && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400">
                        ↑
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{row.after.desc}</p>
                </div>
              </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Mobile: show arrow between columns */}
      <div className="md:hidden flex justify-center py-2 text-slate-500">
        <ArrowRight />
      </div>
    </section>
  )
}
