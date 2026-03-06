"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Appointment = {
  _id: string;
  client: { _id: string; name: string };
  therapist: { _id: string; name: string };
  service: { _id: string; title: { en: string; ta: string }; price: number };
  date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Editing Status/Date
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    status: "pending",
  });

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleOpenEdit = (appt: Appointment) => {
    // Format date for datetime-local input
    const formattedDate = new Date(appt.date).toISOString().slice(0, 16);
    setFormData({ id: appt._id, date: formattedDate, status: appt.status });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete appointment.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/appointments/${formData.id}`, {
        date: formData.date,
        status: formData.status,
      });
      setIsModalOpen(false);
      fetchAppointments();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to update appointment. Check console for details.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-600 font-bold";
      case "failed":
        return "text-red-500 font-bold";
      default:
        return "text-slate-500";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Appointments
        </h1>
      </div>

      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
            Loading appointments...
          </div>
        ) : (
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
                    Service
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Payment
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {appointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {appt.client?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      Dr. {appt.therapist?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {appt.service?.title?.en || "Unknown"}
                    </td>
                    <td
                      className="px-6 py-4 text-slate-600 font-medium cursor-help"
                      title={new Date(appt.date).toLocaleString()}
                    >
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusColor(appt.status)}`}
                      >
                        {appt.status.charAt(0).toUpperCase() +
                          appt.status.slice(1)}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 ${getPaymentColor(appt.paymentStatus)}`}
                    >
                      {appt.paymentStatus.charAt(0).toUpperCase() +
                        appt.paymentStatus.slice(1)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(appt)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appt._id)}
                        className="text-red-500 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              Update Appointment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Date & Time
                </label>
                <input
                  required
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold rounded-xl bg-primary text-white hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
