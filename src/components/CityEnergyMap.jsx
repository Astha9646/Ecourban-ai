export default function CityEnergyMap({ optimizationEnabled }) {
  return (
    <section
      className={`bg-slate-800/95 rounded-xl p-6 shadow-sm overflow-hidden transition-all duration-200 ${
        optimizationEnabled ? 'border-2 border-cyan-500/50' : 'border border-slate-700/80'
      }`}
      aria-label="City Energy Map"
    >
      <h3 className="text-slate-300 font-semibold mb-4 tracking-tight flex items-center gap-2">
        City Energy Map
        {optimizationEnabled && (
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
            Routes highlighted
          </span>
        )}
      </h3>
      <div className="relative rounded-lg overflow-hidden bg-slate-900/80 aspect-[16/9] min-h-[280px]">
        {/* Static city map background (SVG placeholder - replace with static image if desired) */}
        <div className="absolute inset-0">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect fill='%231e293b' width='800' height='450'/%3E%3Cg fill='none' stroke='%23334155' stroke-width='1.2'%3E%3Cpath d='M0 90h800M0 180h800M0 270h800M0 360h800'/%3E%3Cpath d='M100 0v450M200 0v450M300 0v450M400 0v450M500 0v450M600 0v450M700 0v450'/%3E%3C/g%3E%3Crect x='10' y='10' width='80' height='70' fill='%230f172a' opacity='0.8'/%3E%3Crect x='110' y='100' width='80' height='70' fill='%230f172a' opacity='0.7'/%3E%3Crect x='310' y='20' width='80' height='60' fill='%230f172a' opacity='0.75'/%3E%3Crect x='510' y='110' width='90' height='60' fill='%230f172a' opacity='0.7'/%3E%3Crect x='610' y='200' width='80' height='60' fill='%230f172a' opacity='0.8'/%3E%3Crect x='210' y='190' width='90' height='70' fill='%230f172a' opacity='0.7'/%3E%3Crect x='110' y='280' width='80' height='70' fill='%230f172a' opacity='0.75'/%3E%3Crect x='410' y='290' width='90' height='60' fill='%230f172a' opacity='0.7'/%3E%3C/svg%3E"
            alt="City map"
            className="w-full h-full object-cover opacity-95"
          />
        </div>

        {/* High energy consumption zones - red circles */}
        <div
          className={`absolute w-16 h-16 rounded-full border-2 top-[18%] left-[22%] transition-opacity duration-200 ${
            optimizationEnabled ? 'bg-red-500/30 border-red-400/70' : 'bg-red-500/50 border-red-400'
          }`}
          title="High consumption zone"
        />
        <div
          className={`absolute w-20 h-20 rounded-full border-2 top-[55%] left-[48%] transition-opacity duration-200 ${
            optimizationEnabled ? 'bg-red-500/30 border-red-400/70' : 'bg-red-500/50 border-red-400'
          }`}
          title="High consumption zone"
        />
        <div
          className={`absolute w-14 h-14 rounded-full border-2 top-[35%] right-[28%] transition-opacity duration-200 ${
            optimizationEnabled ? 'bg-red-500/30 border-red-400/70' : 'bg-red-500/50 border-red-400'
          }`}
          title="High consumption zone"
        />
        <div
          className={`absolute w-12 h-12 rounded-full border-2 bottom-[25%] left-[35%] transition-opacity duration-200 ${
            optimizationEnabled ? 'bg-red-500/30 border-red-400/70' : 'bg-red-500/50 border-red-400'
          }`}
          title="High consumption zone"
        />

        {/* Energy hubs - blue markers */}
        <div
          className="absolute w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-300 shadow-lg top-[25%] left-[38%]"
          title="Energy hub"
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-300 shadow-lg top-[48%] left-[62%]"
          title="Energy hub"
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-300 shadow-lg bottom-[32%] right-[38%]"
          title="Energy hub"
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-300 shadow-lg top-[70%] left-[28%]"
          title="Energy hub"
        />

        {/* Green optimized route line overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 80 120 Q 200 80 320 130 T 520 100 T 700 180 L 720 220"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth={optimizationEnabled ? 10 : 8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="none"
            opacity={optimizationEnabled ? 1 : 0.7}
            filter={optimizationEnabled ? 'url(#routeGlow)' : undefined}
          />
          <path
            d="M 80 120 Q 200 80 320 130 T 520 100 T 700 180 L 720 220"
            fill="none"
            stroke="#22c55e"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={optimizationEnabled ? 0.9 : 0.5}
          />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-4 px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-red-400 shrink-0" aria-hidden />
            <span className="text-xs text-slate-300">High energy zones</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-green-500 shrink-0" aria-hidden />
            <span className="text-xs text-slate-300">Optimized route</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 border border-blue-300 shrink-0" aria-hidden />
            <span className="text-xs text-slate-300">Energy hubs</span>
          </div>
        </div>
      </div>
    </section>
  )
}
