import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const HOURLY_BASELINE = [
  { hour: '00:00', kWh: 420 },
  { hour: '02:00', kWh: 380 },
  { hour: '04:00', kWh: 350 },
  { hour: '06:00', kWh: 520 },
  { hour: '08:00', kWh: 780 },
  { hour: '10:00', kWh: 920 },
  { hour: '12:00', kWh: 950 },
  { hour: '14:00', kWh: 1020 },
  { hour: '16:00', kWh: 980 },
  { hour: '18:00', kWh: 890 },
  { hour: '20:00', kWh: 720 },
  { hour: '22:00', kWh: 580 },
]
const HOURLY_OPTIMIZED = [
  { hour: '00:00', kWh: 380 },
  { hour: '02:00', kWh: 340 },
  { hour: '04:00', kWh: 320 },
  { hour: '06:00', kWh: 450 },
  { hour: '08:00', kWh: 620 },
  { hour: '10:00', kWh: 880 },
  { hour: '12:00', kWh: 820 },
  { hour: '14:00', kWh: 780 },
  { hour: '16:00', kWh: 750 },
  { hour: '18:00', kWh: 720 },
  { hour: '20:00', kWh: 580 },
  { hour: '22:00', kWh: 480 },
]

const tooltipStyle = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '8px',
  color: '#e2e8f0',
}

export default function HourlyEnergyChart({ optimizationEnabled }) {
  const data = optimizationEnabled ? HOURLY_OPTIMIZED : HOURLY_BASELINE
  return (
    <div className={`rounded-xl border p-6 bg-slate-800/95 shadow-sm transition-all duration-300 ease-out ${
      optimizationEnabled ? 'border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/80 hover:shadow-lg hover:border-slate-600/80'
    }`}>
      <h3 className="text-slate-300 font-semibold text-lg mb-4 tracking-tight flex items-center gap-2">
        Hourly Energy Consumption (24h)
        {optimizationEnabled && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">Optimized</span>
        )}
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="hour"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={{ stroke: '#475569' }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={{ stroke: '#475569' }}
              tickFormatter={(v) => `${v} kWh`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => [`${value} kWh`, 'Consumption']}
              labelFormatter={(label) => `Hour: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="kWh"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ fill: '#38bdf8', strokeWidth: 0 }}
              activeDot={{ r: 4, fill: '#0ea5e9' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
