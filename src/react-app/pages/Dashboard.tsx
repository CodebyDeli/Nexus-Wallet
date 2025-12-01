import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/react-app/context/AuthContext";
import WalletCard from "@/react-app/components/WalletCard";
import TransactionList from "@/react-app/components/TransactionList";
import Header from "@/react-app/components/Header";
import type { Wallet, Transaction } from "@/shared/types";

export default function Dashboard() {
  const { user, isPending, logout } = useAuth();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/");
    }
  }, [user, isPending, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, transactionsRes] = await Promise.all([
          fetch("/api/wallet"),
          fetch("/api/transactions"),
        ]);

        if (walletRes.ok) {
          const walletData = await walletRes.json();
          setWallet(walletData);
        }

        if (transactionsRes.ok) {
          const transactionsData = await transactionsRes.json();
          setTransactions(transactionsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (isPending || isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <Header user={user} logout={logout} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <WalletCard wallet={wallet} />
            <TransactionList transactions={transactions} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-200">
                  Send Money
                </button>
                <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200">
                  Request Payment
                </button>
                <button className="w-full px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-medium transition-all duration-200">
                  Find Agent
                </button>
              </div>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200 text-sm">KYC Status</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium">
                    Pending
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200 text-sm">Account Type</span>
                  <span className="text-white text-sm font-medium">User</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
