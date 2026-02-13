const IconBrain = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
  </svg>
)
const IconBolt = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)
const IconCloud = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z" />
  </svg>
)
const IconDollar = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)
const IconClock = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconAlert = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const INSIGHTS_TIMELINE = [
  { id: 1, time: "2:34 PM", text: "Peak demand analysis complete. Suggested load shift for HVAC systems.", status: "analysis" },
  { id: 2, time: "2:31 PM", text: "Street lighting consumption 18% above baseline. Dimming recommended for low-traffic zones.", status: "warning" },
  { id: 3, time: "2:28 PM", text: "Traffic signal optimization applied. Green wave coordination improved.", status: "success" },
  { id: 4, time: "2:15 PM", text: "Forecast: Next peak in 3 hours. Pre-cooling cycle initiated.", status: "prediction" },
  { id: 5, time: "2:00 PM", text: "Daily energy profile updated. Baseline recalibrated.", status: "info" },
]

const SMART_ALERTS = [
  { id: 1, message: "Street lighting exceeds threshold in Zone B. Immediate dimming recommended.", priority: "high" },
  { id: 2, message: "HVAC load shift opportunity in next 2 hours. Estimated savings: 12% peak.", priority: "medium" },
  { id: 3, message: "Traffic signal timing sync available. Low impact, deferrable.", priority: "low" },
  { id: 4, message: "Anomaly detected: Sector 3 consumption spike. Review sensor data.", priority: "high" },
  { id: 5, message: "Routine maintenance window suggested for lighting controllers.", priority: "low" },
]

const IMPACT_CARDS = [
  {
    id: "energy",
    label: "Energy Saved",
    value: "9,100",
    unit: "kWh",
    subtext: "30-day rolling",
    icon: IconBolt,
    color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/40",
    text: "text-cyan-400",
  },
  {
    id: "co2",
    label: "CO₂ Reduction",
    value: "4.2",
    unit: "tons",
    subtext: "Estimated annual",
    icon: IconCloud,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
  },
  {
    id: "cost",
    label: "Cost Savings",
    value: "₹42,800",
    unit: "",
    subtext: "Projected monthly",
    icon: IconDollar,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/40",
    text: "text-amber-400",
  },
]

const priorityStyles = {
  high: { bg: "bg-red-500/20", text: "text-red-400", border: "border-l-red-500" },
  medium: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-l-amber-500" },
  low: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-l-slate-500" },
}

const statusStyles = {
  analysis: { dot: "bg-cyan-400", label: "Analysis" },
  warning: { dot: "bg-amber-400", label: "Warning" },
  success: { dot: "bg-emerald-400", label: "Applied" },
  prediction: { dot: "bg-violet-400", label: "Prediction" },
  info: { dot: "bg-slate-400", label: "Info" },
}

export default function InsightsContent() {
  return (
    <main className="flex-1 p-8 bg-slate-900 overflow-y-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <span className="text-cyan-400">
          <IconBrain />
        </span>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Decision System</h2>
          <p className="text-slate-400 text-sm mt-1">
            System-generated insights and impact analysis
          </p>
        </div>
      </div>

      {/* Impact Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {IMPACT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.id}
              className={`rounded-xl p-6 border bg-gradient-to-br ${card.gradient} ${card.border} transition-all duration-300 ease-out hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={card.text}>
                  <Icon />
                </span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.subtext}</span>
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-white tabular-nums">
                {card.value}
                {card.unit && <span className={`text-lg font-normal ml-1 ${card.text}`}>{card.unit}</span>}
              </p>
            </div>
          )
        })}
      </div>

      {/* Two-column layout: Timeline + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights Timeline */}
        <section className="rounded-xl border border-slate-700/80 bg-slate-800/95 overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:border-slate-600/80">
          <div className="px-5 py-4 border-b border-slate-700/80 flex items-center gap-2">
            <IconClock className="text-cyan-400" />
            <h3 className="text-slate-300 font-semibold text-lg">AI Insights Timeline</h3>
          </div>
          <ul className="divide-y divide-slate-700/60">
            {INSIGHTS_TIMELINE.map((item) => {
              const style = statusStyles[item.status]
              return (
                <li key={item.id} className="px-5 py-4 flex gap-4 transition-colors duration-200 hover:bg-slate-700/20">
                  <span className={`shrink-0 w-2.5 h-2.5 rounded-full mt-0.5 ${style.dot}`} aria-hidden />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">{item.time} · {style.label}</p>
                    <p className="text-sm text-slate-200 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Smart Alerts */}
        <section className="rounded-xl border border-slate-700/80 bg-slate-800/95 overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:border-slate-600/80">
          <div className="px-5 py-4 border-b border-slate-700/80 flex items-center gap-2">
            <IconAlert className="text-amber-400" />
            <h3 className="text-slate-300 font-semibold text-lg">Smart Alerts</h3>
          </div>
          <ul className="divide-y divide-slate-700/60">
            {SMART_ALERTS.map((alert) => {
              const style = priorityStyles[alert.priority]
              return (
                <li
                  key={alert.id}
                  className={`px-5 py-4 border-l-4 ${style.border} ${style.bg} transition-colors duration-200 hover:bg-slate-700/30`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                    {alert.priority}
                  </span>
                  <p className="text-sm text-slate-200 mt-1 leading-relaxed">{alert.message}</p>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
