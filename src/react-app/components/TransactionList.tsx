import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import type { Transaction } from "@/shared/types";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
      case "withdraw":
        return <ArrowUpRight className="w-5 h-5" />;
      case "receive":
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "send":
      case "withdraw":
        return "text-red-400";
      case "receive":
      case "deposit":
        return "text-green-400";
      default:
        return "text-yellow-400";
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">
          Recent Transactions
        </h3>
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-indigo-300/30 mx-auto mb-4" />
          <p className="text-indigo-200/60 text-lg">No transactions yet</p>
          <p className="text-indigo-200/40 text-sm mt-2">
            Your transaction history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-6">
        Recent Transactions
      </h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl bg-white/10 ${getTransactionColor(
                  transaction.transaction_type
                )}`}
              >
                {getTransactionIcon(transaction.transaction_type)}
              </div>
              <div>
                <p className="text-white font-medium capitalize">
                  {transaction.transaction_type}
                </p>
                <p className="text-indigo-200/60 text-sm">
                  {transaction.description || "No description"}
                </p>
                <p className="text-indigo-200/40 text-xs mt-1">
                  {formatDate(transaction.created_at)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  transaction.transaction_type === "receive" ||
                  transaction.transaction_type === "deposit"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {transaction.transaction_type === "receive" ||
                transaction.transaction_type === "deposit"
                  ? "+"
                  : "-"}
                {formatAmount(transaction.amount, transaction.currency)}
              </p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  transaction.status === "completed"
                    ? "bg-green-500/20 text-green-300"
                    : transaction.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
