"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import Link from "next/link";

export default function ClientDashboardPage() {
  const clientSession = useAuthStore((state) => state.client);
  const { user } = clientSession;

  interface Appointment {
    _id: string;
    status: string;
    date: string;
    paymentStatus?: string;
    service?: { title?: { en: string; ta: string } };
    therapist?: { name: string };
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
          Loading your dashboard...
        </p>
      </div>
    );
  }

  const upcoming = appointments.filter(
    (a) => a.status !== "completed" && a.status !== "cancelled",
  );
  const past = appointments.filter(
    (a) => a.status === "completed" || a.status === "cancelled",
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-500 p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold mb-1">
            Welcome back, {user?.name}! 🌿
          </h2>
          <p className="text-indigo-100 font-medium">
            You have{" "}
            <span className="font-bold text-white">{upcoming.length}</span>{" "}
            upcoming appointment{upcoming.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-3 rounded-2xl text-sm hover:bg-indigo-50 transition-all shrink-0"
        >
          ✨ Book a Session
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Upcoming",
            value: upcoming.length,
            icon: "🗓️",
            color: "text-indigo-600 bg-indigo-50",
          },
          {
            label: "Completed Sessions",
            value: past.filter((a) => a.status === "completed").length,
            icon: "✅",
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            label: "Total Sessions",
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

      {/* Upcoming Appointments */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          🗓️ Upcoming Appointments
        </h2>
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <div className="rounded-3xl border border-border/50 bg-white p-8 text-center">
              <p className="text-slate-500 font-medium mb-4">
                No upcoming appointments.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl text-sm hover:bg-indigo-700 transition-all"
              >
                ✨ Book your first session
              </Link>
            </div>
          ) : (
            upcoming.map((appt) => (
              <div
                key={appt._id}
                className="flex flex-col sm:flex-row justify-between sm:items-center rounded-2xl border border-border/50 bg-white px-6 py-4 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="mb-3 sm:mb-0">
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {appt.service?.title?.en || "Therapy Session"} with Dr.{" "}
                    {appt.therapist?.name || "Therapist"}
                  </h4>
                  <p className="text-sm text-indigo-600 font-semibold mt-0.5">
                    {new Date(appt.date).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">
                    Status: {appt.status} · Payment: {appt.paymentStatus}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="text-sm font-bold bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all active:scale-95">
                    Reschedule
                  </button>
                  <button className="text-sm font-bold border border-red-100 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-all active:scale-95">
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Past Sessions */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          📄 Past Sessions
        </h2>
        <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
          {past.length === 0 ? (
            <p className="p-8 text-center text-slate-500 font-medium">
              No past sessions yet.
            </p>
          ) : (
            <div className="divide-y divide-border/50">
              {past.map((appt) => (
                <div
                  key={appt._id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {appt.service?.title?.en || "Session"} with Dr.{" "}
                      {appt.therapist?.name || "Therapist"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(appt.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      appt.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Profile Card */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">⚙️ Profile</h2>
        <div className="rounded-3xl border border-border/50 bg-white p-6 shadow-sm">
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                Full Name
              </label>
              <input
                className="w-full rounded-xl bg-slate-50 border-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                defaultValue={user?.name || ""}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                Email
              </label>
              <input
                className="w-full rounded-xl bg-slate-100 border-none px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                defaultValue={user?.email || ""}
                disabled
              />
            </div>
            <button
              disabled
              className="bg-indigo-500/60 text-white px-6 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
