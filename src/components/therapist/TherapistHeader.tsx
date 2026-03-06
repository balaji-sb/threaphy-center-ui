"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/therapist-dash": "Dashboard",
  "/therapist-dash/appointments": "My Appointments",
  "/therapist-dash/clients": "My Clients",
  "/therapist-dash/notes": "Session Notes",
  "/therapist-dash/availability": "Manage Availability",
};

export function TherapistHeader() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Therapist Dashboard";

  return (
    <header className="flex h-16 items-center justify-between px-8 border-b border-border/50 bg-white/80 backdrop-blur-xl shrink-0">
      <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          Online
        </span>
      </div>
    </header>
  );
}
