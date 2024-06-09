import { useQuery } from "@tanstack/react-query";
import { transactionService } from "..";

const { getUserTransactions } = transactionService;

const useGetUserTransaction = () => {
  return useQuery({ queryKey: ["user-transaction"], queryFn: getUserTransactions });
};

export default { useGetUserTransaction };
