const ALERTS = [
  {
    id: 1,
    message: 'High energy spike detected in Sector 5',
    time: 'Just now',
    type: 'warning',
  },
  {
    id: 2,
    message: 'Traffic signal optimization recommended',
    time: '2 min ago',
    type: 'info',
  },
  {
    id: 3,
    message: 'HVAC load shifted to off-peak hours',
    time: '5 min ago',
    type: 'success',
  },
]

const typeStyles = {
  warning: {
    dot: 'bg-amber-400',
    border: 'border-l-amber-500',
    bg: 'bg-amber-500/5',
  },
  info: {
    dot: 'bg-cyan-400',
    border: 'border-l-cyan-500',
    bg: 'bg-cyan-500/5',
  },
  success: {
    dot: 'bg-green-400',
    border: 'border-l-green-500',
    bg: 'bg-green-500/5',
  },
}

export default function CityAlertsPanel() {
  return (
    <section
      className="rounded-xl border border-slate-700/80 bg-slate-800/95 overflow-hidden shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:border-slate-600/80"
      aria-label="City Alerts"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/80">
        <h3 className="text-slate-300 font-semibold text-lg tracking-tight flex items-center gap-2">
          City Alerts
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            LIVE
          </span>
        </h3>
      </div>
      <ul className="divide-y divide-slate-700/60">
        {ALERTS.map((alert) => {
          const style = typeStyles[alert.type]
          return (
            <li
              key={alert.id}
              className={`flex items-start gap-3 px-5 py-4 border-l-4 ${style.border} ${style.bg} transition-colors duration-200 hover:bg-slate-700/30`}
            >
              <span
                className={`mt-1.5 shrink-0 w-2 h-2 rounded-full ${style.dot}`}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-200">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-0.5">{alert.time}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
