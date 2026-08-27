import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InvestmentChart from "@/components/investments/InvestmentChart";
import {
  colorFor,
  computeSummary,
  formatBRL,
  formatPct,
  type Investment,
} from "lib/investmentCalc";

interface Props {
  investment: Investment | null;
  index?: number;
  open: boolean;
  onClose: () => void;
}

export default function InvestmentDetailDialog({ investment, index = 0, open, onClose }: Props) {
  if (!investment) return null;
  const color = colorFor(index);
  const { invested, current, projected, retorno } = computeSummary([investment]);

  const stats = [
    { label: "Investido", value: formatBRL(invested) },
    { label: "Valor atual", value: formatBRL(current) },
    { label: "Projeção (10 anos)", value: formatBRL(projected) },
    { label: "Retorno", value: formatPct(retorno), tone: retorno >= 0 ? "text-emerald-600" : "text-rose-600" },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
            <DialogTitle>{investment.name}</DialogTitle>
          </div>
          <p className="text-sm text-slate-400">
            {investment.type} · Início {new Date(investment.start_date).toLocaleDateString("pt-BR")} ·{" "}
            {(investment.annual_return_rate || 0).toFixed(1)}% a.a.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className={`mt-1 text-sm font-semibold ${s.tone || "text-slate-800"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <div className="mb-2 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="h-2.5 w-4 rounded-full" style={{ backgroundColor: color }} /> Evolução
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="h-2.5 w-4 rounded-full border border-dashed" style={{ borderColor: color }} /> Projeção
            </span>
          </div>
          <InvestmentChart investment={investment} color={color} />
        </div>

        {investment.notes && (
          <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">{investment.notes}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}