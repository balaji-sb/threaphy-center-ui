"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Menu, X } from "lucide-react";

export function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname() || "/";
  const session = useAuthStore((state) => state.getActiveSession(pathname));
  const { isAuthenticated, user } = session;
  const logout = useAuthStore((state) => state.logout);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/therapist-dash") ||
    pathname.startsWith("/client-dash")
  ) {
    return null;
  }

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/therapists", label: t("therapists") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-500 bg-white/80 backdrop-blur-2xl border-b border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex h-14 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500">
              <span className="text-white font-black text-xl">J</span>
            </div>
            <span className="font-black text-2xl tracking-tighter transition-colors duration-500 text-slate-900">
              Joyful<span className="text-primary italic">Journey</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex flex-[2] justify-center items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 hover:text-primary py-2 text-slate-600 ${pathname === link.href ? "text-primary translate-y-[-2px]" : ""}`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end space-x-6">
          <div className="text-slate-900">
            <LanguageSwitcher />
          </div>

          <div className="hidden md:block">
            {mounted && isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  href={getDashboardLink()}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all hover:bg-white active:scale-90 bg-slate-50 border-slate-100 text-slate-600"
                  title="Dashboard"
                >
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => user?.role && logout(user.role)}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all hover:bg-red-50 hover:text-red-600 active:scale-90 bg-slate-50 border-slate-100 text-slate-600"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : mounted ? (
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-[1.2rem] px-8 text-xs font-black uppercase tracking-widest transition-all active:scale-95 bg-slate-900 text-white shadow-xl shadow-slate-200"
              >
                {t("login")}
              </Link>
            ) : null}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl transition-colors hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-slate-900" />
            ) : (
              <Menu className="text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[110] bg-slate-900 text-white transition-transform duration-700 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-12">
          <div className="flex justify-between items-center mb-20">
            <span className="font-black text-2xl tracking-tighter">
              Joyful<span className="text-primary italic">Journey</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-4 rounded-3xl bg-white/10"
            >
              <X />
            </button>
          </div>
          <nav className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-black tracking-tighter hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-12">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="h-20 w-full inline-flex items-center justify-center rounded-3xl bg-primary text-white font-black text-xl uppercase tracking-widest shadow-2xl shadow-primary/20"
              >
                {t("login")}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
