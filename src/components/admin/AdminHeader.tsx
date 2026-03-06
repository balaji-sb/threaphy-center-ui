"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function AdminHeader() {
  const pathname = usePathname();

  // Format the path into a readable header title
  const getHeaderTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    const segment = pathname.split("/").pop();
    if (!segment) return "Dashboard";
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full h-20 border-b border-border/50 bg-white/80 backdrop-blur-xl shrink-0 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {getHeaderTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <div className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center">
          🔔
        </div>
      </div>
    </header>
  );
}
