import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionsContext";

export function useTransactions() {
  return useContext(TransactionContext);
}