import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const SECTOR_BASELINE = [
  { sector: 'Street Lighting', kWh: 45200 },
  { sector: 'Traffic Signals', kWh: 28100 },
  { sector: 'HVAC', kWh: 51290 },
]
const SECTOR_OPTIMIZED = [
  { sector: 'Street Lighting', kWh: 36100 },
  { sector: 'Traffic Signals', kWh: 22400 },
  { sector: 'HVAC', kWh: 39740 },
]

const tooltipStyle = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '8px',
  color: '#e2e8f0',
}

export default function SectorEnergyChart({ optimizationEnabled }) {
  const data = optimizationEnabled ? SECTOR_OPTIMIZED : SECTOR_BASELINE
  return (
    <div className={`rounded-xl border p-6 bg-slate-800/95 shadow-sm transition-all duration-300 ease-out ${
      optimizationEnabled ? 'border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/80 hover:shadow-lg hover:border-slate-600/80'
    }`}>
      <h3 className="text-slate-300 font-semibold text-lg mb-4 tracking-tight flex items-center gap-2">
        Sector-wise Energy Usage
        {optimizationEnabled && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">Optimized</span>
        )}
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={{ stroke: '#475569' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="sector"
              width={120}
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={{ stroke: '#475569' }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => [`${value.toLocaleString()} kWh`, 'Usage']}
            />
            <Bar
              dataKey="kWh"
              fill="#34d399"
              radius={[0, 4, 4, 0]}
              name="Energy (kWh)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
