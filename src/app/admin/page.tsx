"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic protection
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
      <div className="min-h-screen bg-muted/20 flex justify-center items-center">
        <p className="text-muted-foreground font-medium animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      <div className="bg-primary/5 border-b border-border/50 pt-12 pb-24 shadow-sm">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, here is what&apos;s happening today.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 -mt-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-elevation-1 transition-all hover:-translate-y-1 hover:shadow-elevation-3 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-2 bg-primary group-hover:w-3 transition-all" />
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
              Total Services
            </h3>
            <p className="text-4xl font-extrabold text-foreground">
              {stats.totalServices}
            </p>
          </div>
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-elevation-1 transition-all hover:-translate-y-1 hover:shadow-elevation-3 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-2 bg-secondary group-hover:w-3 transition-all" />
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
              Active Therapists
            </h3>
            <p className="text-4xl font-extrabold text-foreground">
              {stats.activeTherapists}
            </p>
          </div>
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-elevation-1 transition-all hover:-translate-y-1 hover:shadow-elevation-3 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-2 bg-accent group-hover:w-3 transition-all" />
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
              Total Clients
            </h3>
            <p className="text-4xl font-extrabold text-foreground">
              {stats.totalClients}
            </p>
          </div>
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-elevation-1 transition-all hover:-translate-y-1 hover:shadow-elevation-3 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-2 bg-green-500 group-hover:w-3 transition-all" />
            <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">
              Monthly Revenue
            </h3>
            <p className="text-3xl font-extrabold text-foreground">
              ₹{stats.monthlyRevenue}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Appointments</h2>
            <button className="text-sm font-bold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="rounded-3xl border border-border/50 bg-card shadow-elevation-1 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Client
                  </th>
                  <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Therapist
                  </th>
                  <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Date
                  </th>
                  <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {stats.recentAppointments?.map((appt: any) => (
                  <tr
                    key={appt._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {appt.clientId?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      Dr. {appt.therapistId?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${appt.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
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
                      className="px-6 py-8 text-center text-muted-foreground"
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
    </div>
  );
}
