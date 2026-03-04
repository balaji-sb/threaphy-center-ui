"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

export default function TherapistDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "therapist") {
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
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border-b border-border/50 pt-12 pb-24 shadow-sm">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Therapist Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Welcome Dr. {user?.name}, view your daily schedule and upcoming
            sessions.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 -mt-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                    📅
                  </span>
                  My Sessions
                </h2>
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {appointments.length} Scheduled
                </span>
              </div>
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <p className="text-muted-foreground bg-card p-6 rounded-3xl border border-border/50 text-center">
                    No upcoming sessions.
                  </p>
                ) : (
                  appointments.map((appt) => (
                    <div
                      key={appt._id}
                      className="flex flex-col sm:flex-row justify-between sm:items-center rounded-3xl border border-border/50 bg-card p-6 shadow-elevation-1 transition-all hover:shadow-elevation-3 group"
                    >
                      <div className="flex items-start gap-4 mb-4 sm:mb-0">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                          {appt.clientId?.name?.substring(0, 2).toUpperCase() ||
                            "??"}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {appt.clientId?.name || "Client Name"}
                          </h4>
                          <p className="text-sm font-semibold text-muted-foreground mt-1">
                            {new Date(appt.date).toLocaleString()} •{" "}
                            {appt.serviceId?.title?.en || "Service"}
                          </p>
                        </div>
                      </div>
                      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold shadow-elevation-2 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-elevation-3 active:scale-95 transition-all">
                        Join Session
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-sm">
                  📝
                </span>
                Session Notes
              </h2>
              <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-elevation-1 transition-all hover:shadow-elevation-3">
                <p className="text-muted-foreground font-medium mb-6">
                  Select a client to view or add encrypted session notes.
                </p>
                <textarea
                  className="w-full min-h-[180px] p-5 rounded-2xl border-none bg-muted/50 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-secondary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground resize-none"
                  placeholder="Write securely encrypted notes here..."
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button className="bg-secondary text-white px-6 py-3 rounded-full text-sm font-bold shadow-elevation-2 hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-elevation-3 active:scale-95 transition-all">
                    Save Securely
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-elevation-1 transition-all hover:shadow-elevation-3 sticky top-28">
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm">
                  ⏰
                </span>
                Manage Availability
              </h3>
              <p className="text-sm text-muted-foreground mb-6 font-medium">
                Set hours you are available for appointments.
              </p>

              <div className="bg-muted/30 h-64 rounded-2xl flex flex-col items-center justify-center border border-dashed border-border/60">
                <p className="text-sm font-bold text-muted-foreground">
                  Calendar Widget
                </p>
                <p className="text-xs text-muted-foreground mt-2 text-center px-4">
                  Integration with calendar goes here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
