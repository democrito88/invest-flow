export const investmentTypes = [
  "Ações",
  "Renda Fixa",
  "Fundo Imobiliário",
  "Cripto",
  "Tesouro",
  "ETF",
  "Outros",
] as const;

export type InvestmentType = (typeof investmentTypes)[number];

export interface Investment {
  id : number | null;
  user_id : number | null;
  name: string;
  type: InvestmentType;
  initial_amount: number;
  monthly_contribution: number;
  annual_return_rate: number;
  start_date: string;
  notes?: string;
}

export type CreateInvestmentInput = {
  name: string;
  type: InvestmentType;
  initial_amount: number;
  monthly_contribution?: number;
  annual_return_rate?: number;
  start_date: string;
  notes?: string;
};

export type UpdateInvestmentInput = Partial<CreateInvestmentInput>;

export type ListInvestment = Investment[];