import { Wallet, LogOut, Menu } from "lucide-react";


interface User {
  email: string;
  name?: string;
  picture?: string;
}

interface HeaderProps {
  user: User;
  logout: () => void;
}

export default function Header({ user, logout }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Nexus Wallet</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div className="text-sm">
                <p className="text-white font-medium">{user.name || "User"}</p>
                <p className="text-indigo-300 text-xs">{user.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-indigo-200 hover:text-white"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>

            <button className="md:hidden p-2.5 hover:bg-white/10 rounded-xl transition-colors text-indigo-200 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
