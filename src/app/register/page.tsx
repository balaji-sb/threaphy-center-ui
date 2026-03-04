"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const { user, token } = response.data;

      login(user, token);

      // Initially, new users are likely clients unless assigned otherwise by an admin
      router.push("/client-dash");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-muted/20 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-4xl font-extrabold tracking-tight text-foreground">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground font-medium">
          Join us today to get started with your therapy journey
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
                htmlFor="name"
                className="block text-sm font-bold text-foreground/80 ml-1"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full flex h-14 rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-secondary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  className="w-full flex h-14 rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-secondary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-foreground/80 ml-1"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex h-14 rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-secondary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-elevation-2 text-sm font-bold text-white bg-secondary hover:bg-secondary/90 hover:-translate-y-1 hover:shadow-elevation-3 active:scale-95 transition-all mt-8 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-muted-foreground border-t border-border/50 pt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
