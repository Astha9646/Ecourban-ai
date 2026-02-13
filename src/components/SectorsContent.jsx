import { useState } from "react";

const SECTOR_DATA = [
  {
    id: "street-lighting",
    name: "Street Lighting",
    consumption: { baseline: "45,200", optimized: "36,100" },
    peakTime: { baseline: "6:00 PM – 10:00 PM", optimized: "Spread across off-peak" },
    recommendation:
      "Install smart LED controllers with motion sensors. Dimming during low-traffic hours can reduce usage by 20%.",
  },
  {
    id: "traffic-signals",
    name: "Traffic Signals",
    consumption: { baseline: "28,100", optimized: "22,400" },
    peakTime: { baseline: "7:00 AM – 9:00 AM", optimized: "Optimized timing" },
    recommendation:
      "Deploy adaptive traffic signal timing based on real-time flow. Coordinated green waves reduce idle time.",
  },
  {
    id: "hvac",
    name: "HVAC Systems",
    consumption: { baseline: "51,290", optimized: "39,740" },
    peakTime: { baseline: "2:00 PM – 4:00 PM", optimized: "Load shifted to 10 AM" },
    recommendation:
      "Shift HVAC load to off-peak hours. Pre-cool buildings before peak demand; use thermal mass for stability.",
  },
];

function SectorCard({ sector, optimized, onToggle }) {
  const consumption = optimized ? sector.consumption.optimized : sector.consumption.baseline;
  const peakTime = optimized ? sector.peakTime.optimized : sector.peakTime.baseline;
  const status = optimized ? "Optimized" : "Action Needed";

  return (
    <div
      className={`rounded-xl p-6 border bg-slate-800/95 transition-all duration-300 ease-out ${
        optimized
          ? "border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          : "border-slate-700/80 hover:shadow-lg hover:border-slate-600/80"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-white">{sector.name}</h3>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              optimized
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-amber-500/20 text-amber-400"
            }`}
          >
            {status}
          </span>
          <button
            type="button"
            onClick={() => onToggle(sector.id)}
            className={`w-12 h-6 rounded-full transition-all duration-300 ease-out shrink-0 ${
              optimized ? "bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.3)]" : "bg-slate-600 hover:bg-slate-500"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-out ${
                optimized ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
            Energy consumption (30-day)
          </p>
          <p className="text-2xl font-bold text-white tabular-nums">
            {consumption} <span className="text-slate-400 font-normal text-base">kWh</span>
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
            Peak usage time
          </p>
          <p className="text-sm text-slate-300">{peakTime}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
            AI recommendation
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">{sector.recommendation}</p>
        </div>
      </div>
    </div>
  );
}

export default function SectorsContent() {
  const [optimizedSectors, setOptimizedSectors] = useState({});

  const handleToggle = (id) => {
    setOptimizedSectors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="flex-1 p-8 bg-slate-900 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Sectors</h2>
        <p className="mt-1.5 text-slate-400 text-sm">
          Manage energy consumption by sector. Toggle AI optimization per sector.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTOR_DATA.map((sector) => (
          <SectorCard
            key={sector.id}
            sector={sector}
            optimized={optimizedSectors[sector.id] || false}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </main>
  );
}
