"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function ClientLoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, accessToken } = response.data;

      if (user.role !== "client") {
        setError("Access denied. This portal is for clients only.");
        setLoading(false);
        return;
      }

      login(user, accessToken);
      router.push("/client-dash");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-400 mb-4 shadow-lg">
            <span className="text-3xl">🌿</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Client Portal
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Sign in to manage your appointments and sessions
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 rounded-xl bg-white/10 border border-white/10 px-4 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 rounded-xl bg-white/10 border border-white/10 px-4 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Signing in..." : "Sign in to Client Portal"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-2">
            <p className="text-slate-400 text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
              >
                Register here
              </a>
            </p>
            <a
              href="/"
              className="block text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Back to main site
            </a>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Joyful Journey Multi-Therapy Centre · Client Access
        </p>
      </div>
    </div>
  );
}
