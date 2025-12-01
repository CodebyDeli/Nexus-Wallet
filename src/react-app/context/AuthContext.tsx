import { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  name?: string;
  picture?: string;
}

interface AuthContextProps {
  user: User | null;
  isPending: boolean;
  login: (userData: User) => void;
  logout: () => void;
  redirectToLogin: () => void; // added
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setIsPending(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // This can redirect to a login page or perform any login logic
  const redirectToLogin = () => {
    window.location.href = "/auth/callback?mock_login=1"; // or your login route
  };

  return (
    <AuthContext.Provider
      value={{ user, isPending, login, logout, redirectToLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
