import { Pencil, Trash2, Eye, TrendingUp } from "lucide-react";
import { Button } from "components/ui/button";
import {
  formatBRL,
  formatPct,
  valueAtMonth,
  monthsBetween,
  colorFor,
  type Investment,
} from "@/lib/calculations/investment-calc";

interface Props {
  investments: Investment[];
  onView: (inv: Investment) => void;
  onEdit: (inv: Investment) => void;
  onDelete: (inv: Investment) => void;
}

export default function InvestmentList({ investments, onView, onEdit, onDelete }: Props) {
  const now = new Date();

  if (!investments.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
          <TrendingUp className="h-5 w-5 text-slate-400" />
        </span>
        <p className="text-sm font-medium text-slate-600">Nenhum investimento cadastrado</p>
        <p className="mt-1 text-xs text-slate-400">Clique em “Novo investimento” para começar.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3 font-medium">Investimento</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 text-right font-medium">Valor inicial</th>
            <th className="px-4 py-3 text-right font-medium">Aporte/mês</th>
            <th className="px-4 py-3 text-right font-medium">Rentab.</th>
            <th className="px-4 py-3 text-right font-medium">Valor atual</th>
            <th className="px-4 py-3 text-right font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv, idx) => {
            const months = Math.max(0, monthsBetween(new Date(inv.start_date), now));
            const invested = (inv.initial_amount || 0) + (inv.monthly_contribution || 0) * months;
            const current = valueAtMonth(
              inv.initial_amount || 0,
              inv.monthly_contribution || 0,
              inv.annual_return_rate || 0,
              months
            );
            const ret = invested > 0 ? ((current - invested) / invested) * 100 : 0;
            return (
              <tr
                key={inv.id}
                className="border-b border-slate-50 transition hover:bg-slate-50/60"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: colorFor(idx) }}
                    />
                    <div>
                      <p className="font-medium text-slate-800">{inv.name}</p>
                      <p className="text-xs text-slate-400">
                        Início {new Date(inv.start_date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500">{inv.type}</td>
                <td className="px-4 py-3 text-right text-slate-600">{formatBRL(inv.initial_amount || 0)}</td>
                <td className="px-4 py-3 text-right text-slate-600">{formatBRL(inv.monthly_contribution || 0)}</td>
                <td className="px-4 py-3 text-right text-slate-600">{(inv.annual_return_rate || 0).toFixed(1)}%</td>
                <td className="px-4 py-3 text-right">
                  <div className="font-semibold text-slate-800">{formatBRL(current)}</div>
                  <div className={`text-xs ${ret >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    {formatPct(ret)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onView(inv)} title="Ver evolução">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(inv)} title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(inv)}
                      title="Remover"
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}