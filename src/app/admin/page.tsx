"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const adminSession = useAuthStore((state) => state.admin);
  const { user, isAuthenticated } = adminSession;
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, user, router]);

  if (loading || !stats) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <p className="text-slate-500 font-medium animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: "✨",
            label: "Total Services",
            value: stats.totalServices,
            color: "bg-primary",
          },
          {
            icon: "🩺",
            label: "Active Therapists",
            value: stats.activeTherapists,
            color: "bg-secondary",
          },
          {
            icon: "👥",
            label: "Total Clients",
            value: stats.totalClients,
            color: "bg-accent",
          },
          {
            icon: "💰",
            label: "Monthly Revenue",
            value: `₹${stats.monthlyRevenue}`,
            color: "bg-green-500",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-border/50 bg-white p-6 shadow-sm transition-all hover:shadow-md relative overflow-hidden group"
          >
            <div
              className={`absolute right-0 top-0 h-full w-2 ${stat.color} group-hover:w-3 transition-all`}
            />
            <p className="text-3xl mb-2">{stat.icon}</p>
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-1">
              {stat.label}
            </h3>
            <p className="text-4xl font-extrabold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick-Access Modules */}
      <div>
        <h2 className="text-lg font-bold text-slate-700 mb-4">Manage</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/admin/appointments",
              icon: "🗓️",
              label: "Appointments",
              desc: "View & manage all bookings",
            },
            {
              href: "/admin/users",
              icon: "👥",
              label: "Users & Clients",
              desc: "Manage client accounts",
            },
            {
              href: "/admin/therapists",
              icon: "🩺",
              label: "Therapists",
              desc: "Manage therapist profiles",
            },
            {
              href: "/admin/services",
              icon: "✨",
              label: "Services",
              desc: "Edit service catalog",
            },
            {
              href: "/admin/blogs",
              icon: "📝",
              label: "Blogs",
              desc: "Publish & manage blog posts",
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-white hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Appointments
          </h2>
          <a
            href="/admin/appointments"
            className="text-sm font-bold text-primary hover:underline"
          >
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  Client
                </th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  Therapist
                </th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  Date
                </th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {stats.recentAppointments?.map((appt: any) => (
                <tr
                  key={appt._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {appt.client?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    Dr. {appt.therapist?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(appt.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        appt.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : appt.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!stats.recentAppointments ||
                stats.recentAppointments.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No recent appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
