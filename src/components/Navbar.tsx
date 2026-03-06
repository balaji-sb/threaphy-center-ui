"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname() || "/";
  const session = useAuthStore((state) => state.getActiveSession(pathname));
  const { isAuthenticated, user } = session;
  const logout = useAuthStore((state) => state.logout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDashboardLink = () => {
    switch (user?.role) {
      case "admin":
        return "/admin";
      case "therapist":
        return "/therapist-dash";
      default:
        return "/client-dash";
    }
  };

  // Hide Navbar on dashboard layouts
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/therapist-dash") ||
    pathname.startsWith("/client-dash")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl shadow-sm transition-all">
      <div className="flex h-20 items-center justify-between px-4 md:px-8">
        {/* Left: Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="hidden font-extrabold text-2xl tracking-tight sm:inline-block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Joyful Journey
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex flex-1 justify-center items-center space-x-8 text-[15px] font-semibold whitespace-nowrap">
          {[
            { href: "/", label: t("home") },
            { href: "/services", label: t("services") },
            { href: "/therapists", label: t("therapists") },
            { href: "/blog", label: t("blog") },
            { href: "/contact", label: t("contact") },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-slate-600 transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher />

          {mounted && isAuthenticated ? (
            <div className="flex items-center space-x-4 ml-2">
              <Link
                href={getDashboardLink()}
                className="font-semibold text-sm text-slate-600 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  if (user?.role) logout(user.role);
                }}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : mounted ? (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-95 ml-2"
            >
              {t("login")}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
