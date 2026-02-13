const IconDashboard = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
)
const IconSectors = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)
const IconInsights = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10M18 20V4M6 20v-4" />
  </svg>
)

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: IconDashboard, live: true },
  { id: 'sectors', label: 'Sectors', icon: IconSectors, live: false },
  { id: 'insights', label: 'Insights', icon: IconInsights, live: false },
]

export default function Sidebar({ activeItem, onSelect }) {
  return (
    <aside className="w-56 shrink-0 bg-slate-800/95 border-r border-slate-700/80 flex flex-col">
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ease-out border-l-2 flex items-center gap-3 group ${
                    isActive
                      ? 'bg-slate-600/90 text-white border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                      : 'border-transparent text-slate-300 hover:bg-slate-700/80 hover:text-white hover:shadow-[0_0_8px_rgba(34,211,238,0.08)]'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400/80'}>
                    <Icon />
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.live && (
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                      </span>
                      Live
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
