"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export function Navbar() {
  const t = useTranslations("Navigation");
  const { isAuthenticated, user, logout } = useAuthStore();
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md shadow-elevation-2 transition-all">
      <div className="container flex h-16 items-center px-4 md:px-8">
        <div className="mr-8 hidden md:flex">
          <Link
            href="/"
            className="mr-8 flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
          >
            <span className="hidden font-extrabold text-xl sm:inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Agnipengal Therapy
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-semibold">
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
                className="relative text-foreground/70 transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav Toggle placeholder (if needed later) */}

        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <nav className="flex items-center space-x-4">
            <LanguageSwitcher />

            {mounted && isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  href={getDashboardLink()}
                  className="font-bold text-sm text-primary hover:underline"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => logout()}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-secondary px-6 py-2 text-sm font-bold text-white shadow-elevation-2 transition-all hover:-translate-y-0.5 hover:shadow-elevation-3 hover:bg-secondary/90 active:scale-95 active:shadow-elevation-1"
                >
                  Logout
                </button>
              </div>
            ) : mounted ? (
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-elevation-2 transition-all hover:-translate-y-0.5 hover:shadow-elevation-3 hover:bg-primary/90 active:scale-95 active:shadow-elevation-1"
              >
                {t("login")}
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
