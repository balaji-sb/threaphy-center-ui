"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/appointments", label: "Appointments", icon: "🗓️" },
  { href: "/admin/users", label: "Users & Clients", icon: "👥" },
  { href: "/admin/therapists", label: "Therapists", icon: "🩺" },
  { href: "/admin/services", label: "Services", icon: "✨" },
  { href: "/admin/blogs", label: "Blogs", icon: "📝" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const adminSession = useAuthStore((state) => state.admin);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout("admin");
    router.push("/admin/login");
  };

  return (
    <aside className="w-72 hidden md:flex flex-col border-r border-border/50 bg-white/80 backdrop-blur-xl h-screen sticky top-0">
      <div className="flex h-20 items-center px-8 border-b border-border/50 shrink-0">
        <Link
          href="/admin"
          className="flex items-center space-x-2 transition-transform hover:scale-[1.02] active:scale-95"
        >
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1.5">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold text-[15px] ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border/50 shrink-0">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
            {adminSession.user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">
              {adminSession.user?.name || "Admin"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {adminSession.user?.email || "admin@example.com"}
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
