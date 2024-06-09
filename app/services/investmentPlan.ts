import { InvestmentLedgerEntry, InvestmentPlan } from "@/interfaces/investmentPlan";
import { SuccessResponse } from "@/interfaces/response";
import { apiClient } from "./client";

const getInvestmentPlans = async (): Promise<SuccessResponse<InvestmentPlan[]>> => {
  const response = await apiClient.get("/investment-plan");
  return response.data;
};

const getInvestmentLedger = async (investmentId: number): Promise<SuccessResponse<InvestmentLedgerEntry[]>> => {
  const response = await apiClient.get(`investment/ledger/${investmentId}`);
  return response.data;
};

export default { getInvestmentPlans, getInvestmentLedger };
