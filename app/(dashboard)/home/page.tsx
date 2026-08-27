'use client';

import { useEffect, useState } from "react";
import { Plus, LineChart } from "lucide-react";

import {
  type Investment,
  ListInvestment,
  CreateInvestmentInput,
  UpdateInvestmentInput,
  deleteInvestment,
} from "@/types/investment";

import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/alert-dialog";
import SummaryCards from "@/components/general/SummaryCards";
import PortfolioChart from "@/components/general/PortfolioChart";
import InvestmentList from "@/components/investments/InvestmentList";
import InvestmentForm from "@/components/investments/InvestmentForm";
import InvestmentDetailDialog from "@/components/investments/InvestmentDetailDialog";

export default function Home() {
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Investment | null>(null);
  const [detail, setDetail] = useState<Investment | null>(null);
  const [detailIndex, setDetailIndex] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<Investment | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const list = await ListInvestment();
      setInvestments(list as Investment[]);
    } catch {
      toast({ title: "Erro ao carregar investimentos", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (data: Partial<Investment>) => {
    setSaving(true);
    try {
      if (editing?.id) {
        await UpdateInvestmentInput(editing.id, data);
        toast({ title: "Investimento atualizado" });
      } else {
        await createInvestment(data);
        toast({ title: "Investimento criado" });
      }
      setFormOpen(false);
      setEditing(null);
      await load();
    } catch {
      toast({ title: "Erro ao salvar investimento", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteInvestment(deleteTarget.id!);
      toast({ title: "Investimento removido" });
      setDeleteTarget(null);
      await load();
    } catch {
      toast({ title: "Erro ao remover investimento", variant: "destructive" });
    }
  };

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (inv: Investment) => {
    setEditing(inv);
    setFormOpen(true);
  };

  const openDetail = (inv: Investment) => {
    setDetailIndex(investments.findIndex((i) => i.id === inv.id));
    setDetail(inv);
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Painel de Investimentos
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Acompanhe a evolução e a projeção dos seus investimentos.
            </p>
          </div>
          <Button onClick={openNew} className="gap-2">
            <Plus className="h-4 w-4" /> Novo investimento
          </Button>
        </header>

        <section className="mb-8">
          <SummaryCards investments={investments} />
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <LineChart className="h-4 w-4 text-slate-400" />
            <h2 className="text-base font-semibold text-slate-800">Evolução do portfólio</h2>
            <span className="ml-auto text-xs text-slate-400">Projeção de 10 anos</span>
          </div>
          <PortfolioChart investments={investments} />
        </section>

        <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800">Meus investimentos</h2>
            <span className="text-xs text-slate-400">{investments.length} ativos</span>
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
            </div>
          ) : (
            <InvestmentList
              investments={investments}
              onView={openDetail}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          )}
        </section>
      </div>

      <InvestmentForm
        open={formOpen}
        investment={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        saving={saving}
      />

      <InvestmentDetailDialog
        investment={detail}
        index={detailIndex}
        open={!!detail}
        onClose={() => setDetail(null)}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover investimento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover “{deleteTarget?.name}”? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-600"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}