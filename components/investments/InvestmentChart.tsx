import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buildSeries, formatBRL, formatBRLPrecise, todayLabel, type Investment } from "lib/investmentCalc";

interface Props {
  investment: Investment;
  color?: string;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const values = payload.filter((p: any) => p.value != null);
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      {values.map((p: any) => (
        <p key={p.dataKey} className="text-sm font-semibold text-slate-800">
          {formatBRLPrecise(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function InvestmentChart({ investment, color = "#10b981" }: Props) {
  const data = buildSeries(investment);
  const interval = Math.max(1, Math.floor(data.length / 12));
  const gradId = `grad-${(investment.id || investment.name).replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            interval={interval}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatBRL(v)}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={todayLabel()}
            stroke="#cbd5e1"
            strokeDasharray="4 4"
            label={{ value: "Hoje", position: "top", fill: "#94a3b8", fontSize: 11 }}
          />
          <Area
            type="monotone"
            dataKey="evolucao"
            name="Evolução"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="projecao"
            name="Projeção"
            stroke={color}
            strokeWidth={2.5}
            strokeDasharray="6 4"
            fill={`url(#${gradId})`}
            fillOpacity={0.4}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}