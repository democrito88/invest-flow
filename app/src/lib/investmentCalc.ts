export interface Investment {
  id?: string;
  name: string;
  type: string;
  initial_amount: number;
  monthly_contribution: number;
  annual_return_rate: number;
  start_date: string;
  notes?: string;
  created_date?: string;
}

export const PALETTE = [
  "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6",
  "#ec4899", "#14b8a6", "#ef4444", "#6366f1",
];

export function colorFor(index: number): string {
  return PALETTE[index % PALETTE.length];
}

export function monthlyRate(annualRatePct: number): number {
  const r = annualRatePct / 100;
  return Math.pow(1 + r, 1 / 12) - 1;
}

export function valueAtMonth(
  initial: number,
  monthlyContribution: number,
  annualRatePct: number,
  monthIndex: number
): number {
  const i = monthlyRate(annualRatePct);
  const n = Math.max(0, monthIndex);
  if (Math.abs(i) < 1e-9) {
    return initial + monthlyContribution * n;
  }
  return (
    initial * Math.pow(1 + i, n) +
    monthlyContribution * ((Math.pow(1 + i, n) - 1) / i)
  );
}

export function monthsBetween(start: Date, end: Date): number {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function formatBRLPrecise(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value || 0);
}

export function formatPct(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value || 0).toFixed(1)}%`;
}

export interface ChartPoint {
  date: string;
  label: string;
  evolucao: number | null;
  projecao: number | null;
  isFuture: boolean;
}

export function buildSeries(
  inv: Investment,
  now: Date = new Date(),
  futureMonths: number = 120
): ChartPoint[] {
  const start = new Date(inv.start_date);
  const pastMonths = Math.max(0, monthsBetween(start, now));
  const totalMonths = pastMonths + futureMonths;
  const points: ChartPoint[] = [];
  for (let m = 0; m <= totalMonths; m++) {
    const d = addMonths(start, m);
    const value = valueAtMonth(
      inv.initial_amount || 0,
      inv.monthly_contribution || 0,
      inv.annual_return_rate || 0,
      m
    );
    const isFuture = m > pastMonths;
    points.push({
      date: d.toISOString(),
      label: `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`,
      evolucao: isFuture ? null : value,
      projecao: isFuture ? value : m === pastMonths ? value : null,
      isFuture,
    });
  }
  return points;
}

export function buildPortfolioSeries(
  investments: Investment[],
  now: Date = new Date(),
  futureMonths: number = 120
): ChartPoint[] {
  if (!investments.length) return [];
  const starts = investments.map((i) => new Date(i.start_date));
  const earliest = starts.reduce((a, b) => (a < b ? a : b));
  const pastMonths = Math.max(0, monthsBetween(earliest, now));
  const totalMonths = pastMonths + futureMonths;
  const points: ChartPoint[] = [];
  for (let m = 0; m <= totalMonths; m++) {
    const d = addMonths(earliest, m);
    const isFuture = m > pastMonths;
    let evolucao = 0;
    let projecao = 0;
    for (const inv of investments) {
      const invMonth = monthsBetween(new Date(inv.start_date), d);
      if (invMonth < 0) continue;
      const val = valueAtMonth(
        inv.initial_amount || 0,
        inv.monthly_contribution || 0,
        inv.annual_return_rate || 0,
        invMonth
      );
      if (!isFuture) evolucao += val;
      else projecao += val;
    }
    points.push({
      date: d.toISOString(),
      label: `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`,
      evolucao: isFuture ? null : evolucao,
      projecao: isFuture ? projecao : m === pastMonths ? evolucao : null,
      isFuture,
    });
  }
  return points;
}

export function todayLabel(now: Date = new Date()): string {
  return `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
}

export function computeSummary(
  investments: Investment[],
  now: Date = new Date(),
  futureMonths: number = 120
) {
  let invested = 0;
  let current = 0;
  let projected = 0;
  for (const inv of investments) {
    const months = Math.max(0, monthsBetween(new Date(inv.start_date), now));
    invested += (inv.initial_amount || 0) + (inv.monthly_contribution || 0) * months;
    current += valueAtMonth(
      inv.initial_amount || 0,
      inv.monthly_contribution || 0,
      inv.annual_return_rate || 0,
      months
    );
    projected += valueAtMonth(
      inv.initial_amount || 0,
      inv.monthly_contribution || 0,
      inv.annual_return_rate || 0,
      months + futureMonths
    );
  }
  const retorno = invested > 0 ? ((current - invested) / invested) * 100 : 0;
  return { invested, current, projected, retorno };
}