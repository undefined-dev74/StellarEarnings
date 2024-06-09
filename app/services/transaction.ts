import { SuccessResponse } from "@/interfaces/response";
import { Transaction } from "@/interfaces/transaction";
import { apiClient } from "./client";

const getUserTransactions = async (): Promise<SuccessResponse<Transaction[]>> => {
  const response = await apiClient.get("/transaction?transactionType=CREDIT");
  return response.data;
};

export default { getUserTransactions };
