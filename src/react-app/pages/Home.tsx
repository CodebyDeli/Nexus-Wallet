import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/react-app/context/AuthContext";
import { Wallet, ArrowRight, Shield, Users, Smartphone } from "lucide-react";

export default function Home() {
  const { user, isPending, redirectToLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isPending) {
      navigate("/dashboard");
    }
  }, [user, isPending, navigate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
        <div className="animate-pulse">
          <Wallet className="w-16 h-16 text-indigo-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <nav className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Nexus Wallet</h1>
          </div>
          <button
            onClick={redirectToLogin}
            className="px-6 py-2.5 bg-white text-indigo-900 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </nav>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-indigo-200 text-sm font-medium">
              Secure POS Agent Platform
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Digital Wallet,
            <br />
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h2>
          <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with trusted POS agents, manage your finances securely, and
            experience seamless transactions with AI-powered verification.
          </p>
          <button
            onClick={redirectToLogin}
            className="group px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 inline-flex items-center gap-3"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-indigo-500/20 rounded-xl w-fit mb-6">
              <Shield className="w-8 h-8 text-indigo-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Bank-Level Security
            </h3>
            <p className="text-indigo-200 leading-relaxed">
              Multi-layer authentication with PIN, facial recognition, and
              device verification keeps your funds protected.
            </p>
          </div>

          <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-6">
              <Users className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Find Trusted Agents
            </h3>
            <p className="text-indigo-200 leading-relaxed">
              Discover verified POS agents near you with real-time location
              services and community ratings.
            </p>
          </div>

          <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="p-3 bg-pink-500/20 rounded-xl w-fit mb-6">
              <Smartphone className="w-8 h-8 text-pink-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              AI-Powered Receipts
            </h3>
            <p className="text-indigo-200 leading-relaxed">
              Automatically verify and organize transaction receipts with local
              AI processing for complete privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
