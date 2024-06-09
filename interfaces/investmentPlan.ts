export interface InvestmentPlan {
  id: number;
  name: string;
  amount: number;
  durationDays: number;
  returnPercentage: number;
  status: string;
  startDate: string;
  endDate: string;
  dailyInterest: number;
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentLedgerEntry {
  id: number;
  userId: number;
  investmentId: number;
  dueDate: string;
  status: string;
  receivable: number;
  paid: number;
  createdAt: string;
  updatedAt: string;
  principal: number; // New field for principal amount
  interest: number; // New field for interest amount
  earningDate: string;
}
