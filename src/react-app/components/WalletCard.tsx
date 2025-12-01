import { Wallet as WalletIcon, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { Wallet } from "@/shared/types";

interface WalletCardProps {
  wallet: Wallet | null;
}

export default function WalletCard({ wallet }: WalletCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: wallet?.currency || "USD",
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <WalletIcon className="w-5 h-5 text-white/80" />
              <p className="text-white/80 text-sm font-medium">
                Available Balance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-5xl font-bold text-white">
                {showBalance
                  ? formatBalance(wallet?.balance || 0)
                  : "••••••"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {showBalance ? (
                  <EyeOff className="w-5 h-5 text-white/80" />
                ) : (
                  <Eye className="w-5 h-5 text-white/80" />
                )}
              </button>
            </div>
          </div>

          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-1 text-white">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+0%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/20">
          <div>
            <p className="text-white/60 text-xs mb-1">Wallet ID</p>
            <p className="text-white font-mono text-sm">
              {wallet?.id.toString().padStart(8, "0") || "00000000"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs mb-1">Status</p>
            <span className="inline-block px-3 py-1 bg-green-500/30 text-green-100 rounded-full text-xs font-medium">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
