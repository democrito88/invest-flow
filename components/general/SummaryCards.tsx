import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { computeSummary, formatBRL, formatPct, type Investment } from "lib/investmentCalc";

interface Props {
  investments: Investment[];
}

export default function SummaryCards({ investments }: Props) {
  const { invested, current, projected, retorno } = computeSummary(investments);
  const positive = retorno >= 0;

  const cards = [
    {
      label: "Total Investido",
      value: formatBRL(invested),
      icon: PiggyBank,
      tone: "text-slate-500",
      bg: "bg-slate-50",
    },
    {
      label: "Valor Atual",
      value: formatBRL(current),
      icon: Wallet,
      tone: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Projeção (10 anos)",
      value: formatBRL(projected),
      icon: TrendingUp,
      tone: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Retorno",
      value: formatPct(retorno),
      icon: positive ? TrendingUp : TrendingDown,
      tone: positive ? "text-emerald-600" : "text-rose-600",
      bg: positive ? "bg-emerald-50" : "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {c.label}
              </span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.bg}`}>
                <Icon className={`h-4 w-4 ${c.tone}`} />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              {c.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}