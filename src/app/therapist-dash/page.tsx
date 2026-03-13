"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

export default function TherapistDashboardPage() {
  const therapistSession = useAuthStore((state) => state.therapist);
  const { user } = therapistSession;

  interface Appointment {
    _id: string;
    status: string;
    date: string;
    client?: { name: string };
    service?: { title?: { en: string; ta: string } };
    [key: string]: unknown;
  }
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-slate-500 font-medium animate-pulse">
          Loading your sessions...
        </p>
      </div>
    );
  }

  const upcoming = appointments.filter(
    (a) => a.status === "confirmed" || a.status === "pending",
  );
  const completed = appointments.filter((a) => a.status === "completed");

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-500 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-extrabold mb-1">
          Welcome back, Dr. {user?.name}! 👋
        </h2>
        <p className="text-teal-100 font-medium">
          You have{" "}
          <span className="font-bold text-white">{upcoming.length}</span>{" "}
          upcoming session{upcoming.length !== 1 ? "s" : ""} scheduled.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Upcoming Sessions",
            value: upcoming.length,
            icon: "📅",
            color: "text-teal-600 bg-teal-50",
          },
          {
            label: "Completed Sessions",
            value: completed.length,
            icon: "✅",
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            label: "Total Appointments",
            value: appointments.length,
            icon: "📊",
            color: "text-slate-600 bg-slate-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-border/50 bg-white p-6 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${s.color}`}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">
                {s.value}
              </p>
              <p className="text-sm text-slate-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          📅 Upcoming Sessions
        </h2>
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <div className="rounded-3xl border border-border/50 bg-white p-8 text-center text-slate-500 font-medium">
              No upcoming sessions. All clear! 🎉
            </div>
          ) : (
            upcoming.map((appt) => (
              <div
                key={appt._id}
                className="flex flex-col sm:flex-row justify-between sm:items-center rounded-2xl border border-border/50 bg-white px-6 py-4 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                    {appt.client?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                      {appt.client?.name || "Client"}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {new Date(appt.date).toLocaleString()} ·{" "}
                      {appt.service?.title?.en || "Session"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                      appt.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-teal-700 active:scale-95 transition-all">
                    Join
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Session Notes */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          📝 Session Notes
        </h2>
        <div className="rounded-3xl border border-border/50 bg-white p-6 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-4">
            Select a client to view or add session notes.
          </p>
          <textarea
            className="w-full min-h-[140px] p-4 rounded-2xl border border-slate-100 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 resize-none transition-all"
            placeholder="Write encrypted session notes here..."
          />
          <div className="mt-3 flex justify-end">
            <button className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-700 active:scale-95 transition-all">
              Save Securely
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
