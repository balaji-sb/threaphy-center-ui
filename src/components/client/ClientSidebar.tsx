"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const clientNavItems = [
  { href: "/client-dash", label: "Dashboard", icon: "🏠" },
  { href: "/client-dash/appointments", label: "My Appointments", icon: "🗓️" },
  { href: "/client-dash/sessions", label: "Past Sessions", icon: "📄" },
  { href: "/client-dash/profile", label: "Profile", icon: "👤" },
];

export function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const clientSession = useAuthStore((state) => state.client);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout("client");
    router.push("/client-dash/login");
  };

  return (
    <aside className="w-72 hidden md:flex flex-col border-r border-border/50 bg-white/80 backdrop-blur-xl h-screen sticky top-0">
      <div className="flex h-20 items-center px-8 border-b border-border/50 shrink-0">
        <Link
          href="/client-dash"
          className="flex items-center space-x-2 transition-transform hover:scale-[1.02] active:scale-95"
        >
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            My Portal
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1.5">
          {clientNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold text-[15px] ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Book New Appointment CTA */}
        <div className="mt-6">
          <a
            href="/services"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm hover:bg-indigo-100 transition-all"
          >
            <span>✨</span> Book New Appointment
          </a>
        </div>
      </div>

      <div className="p-4 border-t border-border/50 shrink-0">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
            {clientSession.user?.name?.charAt(0).toUpperCase() || "C"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">
              {clientSession.user?.name || "Client"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {clientSession.user?.email || ""}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 bg-red-50 text-red-600 font-semibold text-sm transition-all hover:bg-red-100 active:scale-95"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
