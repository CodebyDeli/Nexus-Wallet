import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/react-app/context/AuthContext";
import { Wallet } from "lucide-react";

export default function AuthCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");
    const name = params.get("name");
    const picture = params.get("picture");

    if (!email) {
      navigate("/");
      return;
    }

    login({
      email,
      name: name || "User",
      picture: picture || undefined,
    });

    navigate("/dashboard");
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <div className="text-center">
        <div className="animate-pulse mb-6 flex justify-center">
          <Wallet className="w-16 h-16 text-indigo-300" />
        </div>
        <p className="text-xl text-indigo-200 font-medium">
          Completing sign in...
        </p>
      </div>
    </div>
  );
}
