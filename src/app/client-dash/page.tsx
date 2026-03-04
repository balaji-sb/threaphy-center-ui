"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

export default function ClientDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "client") {
      router.push("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated, user, router]);

  if (loading) {
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
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50 pt-12 pb-24 shadow-sm">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight">
            My Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Welcome, {user?.name}. Manage your appointments, billing, and
            profile seamlessly.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 -mt-12 max-w-4xl mx-auto">
        <div className="grid gap-8">
          <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-elevation-1 transition-all hover:shadow-elevation-3">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                🗓️
              </span>
              Upcoming Appointments
            </h2>

            {appointments.length === 0 ? (
              <p className="text-muted-foreground bg-muted/30 p-6 rounded-2xl border border-border/50 text-center">
                You have no upcoming appointments.
              </p>
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="mb-4 bg-muted/30 border border-border/50 p-6 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all hover:bg-muted/50"
                >
                  <div>
                    <h4 className="font-bold text-lg">
                      {appt.serviceId?.title?.en || "Therapy Session"} with Dr.{" "}
                      {appt.therapistId?.name || "Therapist"}
                    </h4>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {new Date(appt.date).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      Status: {appt.status} | Payment: {appt.paymentStatus}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-sm font-bold bg-white border border-border/60 shadow-sm px-5 py-2.5 rounded-full hover:bg-muted/80 transition-all active:scale-95">
                      Reschedule
                    </button>
                    <button className="text-sm font-bold border border-destructive/30 bg-destructive/5 text-destructive px-5 py-2.5 rounded-full hover:bg-destructive hover:text-white transition-all active:scale-95 shadow-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-elevation-1 transition-all hover:shadow-elevation-3">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-sm">
                📄
              </span>
              Past Sessions & Invoices
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                No past sessions found yet.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-elevation-1 transition-all hover:shadow-elevation-3 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm">
                ⚙️
              </span>
              Profile Settings
            </h2>
            <form className="space-y-6 max-w-md">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-foreground/80 ml-1">
                  Full Name
                </label>
                <input
                  className="w-full rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-elevation-1"
                  defaultValue={user?.name || ""}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-foreground/80 ml-1">
                  Email
                </label>
                <input
                  className="w-full rounded-2xl border-none bg-muted/30 px-4 py-3 text-sm text-muted-foreground cursor-not-allowed"
                  defaultValue={user?.email || ""}
                  disabled
                />
              </div>
              <button
                disabled
                className="bg-primary/50 text-white px-6 py-3 rounded-full text-sm font-bold shadow-elevation-2 cursor-not-allowed mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
