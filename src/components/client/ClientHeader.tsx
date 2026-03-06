"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/client-dash": "My Dashboard",
  "/client-dash/appointments": "My Appointments",
  "/client-dash/sessions": "Past Sessions",
  "/client-dash/profile": "Profile Settings",
};

export function ClientHeader() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Client Dashboard";

  return (
    <header className="flex h-16 items-center justify-between px-8 border-b border-border/50 bg-white/80 backdrop-blur-xl shrink-0">
      <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <a
          href="/services"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-all"
        >
          <span>✨</span> Book a Session
        </a>
      </div>
    </header>
  );
}
