"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
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

      login(user, accessToken);

      // Redirect based on role
      switch (user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "therapist":
          router.push("/therapist-dash");
          break;
        default:
          router.push("/client-dash");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-muted/20 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-4xl font-extrabold tracking-tight text-foreground">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground font-medium">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-card py-10 px-6 sm:px-12 rounded-3xl border border-border/50 shadow-elevation-3 relative">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-foreground/80 ml-1"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex h-14 rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-foreground/80"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex h-14 rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-border/50 text-primary focus:ring-primary bg-muted/50"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm font-medium text-foreground"
              >
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-elevation-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 hover:-translate-y-1 hover:shadow-elevation-3 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-muted-foreground border-t border-border/50 pt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-secondary hover:underline hover:text-secondary/80 transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
