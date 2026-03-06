"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type ClientUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/clients");
      setClients(res.data);
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ id: "", name: "", email: "", password: "" });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: ClientUser) => {
    setFormData({
      id: client._id,
      name: client.name,
      email: client.email,
      password: "",
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/users/clients/${formData.id}`, {
          name: formData.name,
          email: formData.email,
          ...(formData.password ? { password: formData.password } : {}),
        });
      } else {
        await api.post("/users/clients", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }
      setIsModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to save user details. Check console for details.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Users & Clients
        </h1>
        <button
          onClick={handleOpenAdd}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>+</span> Add User
        </button>
      </div>

      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
            Loading clients...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Name
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Email
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Joined
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {clients.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      {c.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{c.email}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-500 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No users found.
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
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              {isEdit ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Password{" "}
                  {isEdit && (
                    <span className="text-slate-400 font-normal">
                      (Leave blank to keep current)
                    </span>
                  )}
                </label>
                <input
                  required={!isEdit}
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
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
                  {isEdit ? "Save Changes" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
