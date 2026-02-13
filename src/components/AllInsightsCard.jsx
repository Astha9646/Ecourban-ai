const INSIGHTS = [
  'Peak usage between 6–9 PM',
  'Street lighting consumes highest energy',
  'Load shifting HVAC can reduce peak demand',
  'Estimated savings of 15–20%',
]

export default function AllInsightsCard({ optimizationEnabled }) {
  return (
    <div className={`relative rounded-xl border p-6 bg-slate-800/95 overflow-hidden transition-all duration-300 ease-out ${
      optimizationEnabled ? "border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "border-cyan-500/40 hover:shadow-lg hover:border-cyan-500/60"
    }`}>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-emerald-500 rounded-l-xl" />
      <div className="pl-5">
        <h3 className="text-cyan-300 font-semibold text-lg mb-1 flex items-center gap-2 tracking-tight">
          <span className="text-cyan-400" aria-hidden>◇</span>
          AI Insights & Recommendations
        </h3>
        <p className="text-slate-500 text-sm mb-5">
          Based on current consumption patterns
        </p>
        <ul className="space-y-3">
          {INSIGHTS.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
            >
              <span className="text-cyan-400 mt-0.5 shrink-0" aria-hidden>
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
