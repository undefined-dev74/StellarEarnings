export interface Transaction {
  id: number;
  userId: number;
  investmentId: number;
  transactionType: string;
  status: string;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}
