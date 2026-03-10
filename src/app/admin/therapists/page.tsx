"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Therapist = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  bio?: { en: string; ta: string };
  specialties?: { en: string[]; ta: string[] };
  createdAt: string;
};

export default function AdminTherapistsPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    bio_en: "",
    bio_ta: "",
    specialties_en: "",
    specialties_ta: "",
  });

  const fetchTherapists = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/therapists");
      setTherapists(res.data);
    } catch (error) {
      console.error("Failed to fetch therapists", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      bio_en: "",
      bio_ta: "",
      specialties_en: "",
      specialties_ta: "",
    });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (therapist: Therapist) => {
    setFormData({
      id: therapist._id,
      name: therapist.name,
      email: therapist.email,
      password: "",
      phone: therapist.phone || "",
      bio_en: therapist.bio?.en || "",
      bio_ta: therapist.bio?.ta || "",
      specialties_en: therapist.specialties?.en?.join(", ") || "",
      specialties_ta: therapist.specialties?.ta?.join(", ") || "",
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this therapist?")) return;
    try {
      await api.delete(`/users/therapists/${id}`);
      fetchTherapists();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: { en: formData.bio_en, ta: formData.bio_ta },
        specialties: {
          en: formData.specialties_en.split(",").map((s) => s.trim()).filter(Boolean),
          ta: formData.specialties_ta.split(",").map((s) => s.trim()).filter(Boolean),
        },
        ...(formData.password ? { password: formData.password } : {}),
      };

      if (isEdit) {
        await api.put(`/users/therapists/${formData.id}`, payload);
      } else {
        await api.post("/users/therapists", payload);
      }
      setIsModalOpen(false);
      fetchTherapists();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to save therapist. Check console for details.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Therapists
        </h1>
        <button
          onClick={handleOpenAdd}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>+</span> Add Therapist
        </button>
      </div>

      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
            Loading therapists...
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
                {therapists.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                      {t.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{t.email}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-500 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {therapists.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No therapists found.
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
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              {isEdit ? "Edit Therapist" : "Add Therapist"}
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
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Bio (English)
                </label>
                <textarea
                  value={formData.bio_en}
                  onChange={(e) =>
                    setFormData({ ...formData, bio_en: e.target.value })
                  }
                  className="w-full h-24 rounded-xl bg-slate-50 p-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Bio (Tamil)
                </label>
                <textarea
                  value={formData.bio_ta}
                  onChange={(e) =>
                    setFormData({ ...formData, bio_ta: e.target.value })
                  }
                  className="w-full h-24 rounded-xl bg-slate-50 p-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Specialties (English)
                  <span className="text-slate-400 font-normal ml-2">
                    (Comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.specialties_en}
                  onChange={(e) =>
                    setFormData({ ...formData, specialties_en: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Specialties (Tamil)
                  <span className="text-slate-400 font-normal ml-2">
                    (Comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.specialties_ta}
                  onChange={(e) =>
                    setFormData({ ...formData, specialties_ta: e.target.value })
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
                  {isEdit ? "Save Changes" : "Create Therapist"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
