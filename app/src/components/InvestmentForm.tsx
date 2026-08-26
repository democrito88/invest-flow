import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Investment } from "@/lib/investmentCalc";

const TYPES = ["Ações", "Renda Fixa", "Fundo Imobiliário", "Cripto", "Tesouro", "ETF", "Outros"];

interface Props {
  open: boolean;
  investment: Investment | null;
  onClose: () => void;
  onSave: (data: Partial<Investment>) => void;
  saving?: boolean;
}

const emptyForm = {
  name: "",
  type: "Ações",
  initial_amount: "",
  monthly_contribution: "",
  annual_return_rate: "",
  start_date: new Date().toISOString().slice(0, 10),
  notes: "",
};

export default function InvestmentForm({ open, investment, onClose, onSave, saving }: Props) {
  const [form, setForm] = useState<any>(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (investment) {
      setForm({
        name: investment.name || "",
        type: investment.type || "Ações",
        initial_amount: String(investment.initial_amount ?? ""),
        monthly_contribution: String(investment.monthly_contribution ?? ""),
        annual_return_rate: String(investment.annual_return_rate ?? ""),
        start_date: investment.start_date ? investment.start_date.slice(0, 10) : "",
        notes: investment.notes || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, investment]);

  const set = (key: string, value: any) => setForm((f: any) => ({ ...f, [key]: value }));

  const submit = () => {
    if (!form.name || !form.initial_amount || !form.start_date) return;
    onSave({
      name: form.name,
      type: form.type,
      initial_amount: Number(form.initial_amount) || 0,
      monthly_contribution: Number(form.monthly_contribution) || 0,
      annual_return_rate: Number(form.annual_return_rate) || 0,
      start_date: form.start_date,
      notes: form.notes,
    });
  };

  const valid = form.name && form.initial_amount && form.start_date;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{investment ? "Editar investimento" : "Novo investimento"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: Tesouro Selic 2029" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start_date">Data de início</Label>
              <Input id="start_date" type="date" value={form.start_date} onChange={(e) => set("start_date", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="initial_amount">Valor inicial (R$)</Label>
              <Input id="initial_amount" type="number" min="0" step="0.01" value={form.initial_amount} onChange={(e) => set("initial_amount", e.target.value)} placeholder="0,00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthly_contribution">Aporte mensal (R$)</Label>
              <Input id="monthly_contribution" type="number" min="0" step="0.01" value={form.monthly_contribution} onChange={(e) => set("monthly_contribution", e.target.value)} placeholder="0,00" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="annual_return_rate">Rentabilidade anual (%)</Label>
            <Input id="annual_return_rate" type="number" step="0.01" value={form.annual_return_rate} onChange={(e) => set("annual_return_rate", e.target.value)} placeholder="Ex: 10" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea id="notes" rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Opcional" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={submit} disabled={!valid || saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}