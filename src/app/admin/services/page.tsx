"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Service = {
  _id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  methodology: { en: string; ta: string };
  confidentiality: { en: string; ta: string };
  whatToExpect: { en: string[]; ta: string[] };
  price: number;
  durationMinutes: number;
  icon: string;
  createdAt: string;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    titleEn: "",
    titleTa: "",
    descEn: "",
    descTa: "",
    methodologyEn: "",
    methodologyTa: "",
    confidentialityEn: "",
    confidentialityTa: "",
    whatToExpectEn: ["", "", "", ""],
    whatToExpectTa: ["", "", "", ""],
    price: 0,
    durationMinutes: 60,
    icon: "✨",
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      id: "",
      titleEn: "",
      titleTa: "",
      descEn: "",
      descTa: "",
      methodologyEn: "",
      methodologyTa: "",
      confidentialityEn: "",
      confidentialityTa: "",
      whatToExpectEn: ["", "", "", ""],
      whatToExpectTa: ["", "", "", ""],
      price: 0,
      durationMinutes: 60,
      icon: "✨",
    });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setFormData({
      id: service._id,
      titleEn: service.title.en,
      titleTa: service.title.ta,
      descEn: service.description.en,
      descTa: service.description.ta,
      methodologyEn: service.methodology?.en || "",
      methodologyTa: service.methodology?.ta || "",
      confidentialityEn: service.confidentiality?.en || "",
      confidentialityTa: service.confidentiality?.ta || "",
      whatToExpectEn: service.whatToExpect?.en?.length
        ? service.whatToExpect.en
        : ["", "", "", ""],
      whatToExpectTa: service.whatToExpect?.ta?.length
        ? service.whatToExpect.ta
        : ["", "", "", ""],
      price: service.price,
      durationMinutes: service.durationMinutes,
      icon: service.icon || "✨",
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: { en: formData.titleEn, ta: formData.titleTa },
      description: { en: formData.descEn, ta: formData.descTa },
      methodology: { en: formData.methodologyEn, ta: formData.methodologyTa },
      confidentiality: {
        en: formData.confidentialityEn,
        ta: formData.confidentialityTa,
      },
      whatToExpect: {
        en: formData.whatToExpectEn.filter((item) => item.trim() !== ""),
        ta: formData.whatToExpectTa.filter((item) => item.trim() !== ""),
      },
      price: formData.price,
      durationMinutes: formData.durationMinutes,
      icon: formData.icon,
    };

    try {
      if (isEdit) {
        await api.put(`/services/${formData.id}`, payload);
      } else {
        await api.post("/services", payload);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to save service. Check console for details.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Services
        </h1>
        <button
          onClick={handleOpenAdd}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>+</span> Add Service
        </button>
      </div>

      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
            Loading services...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Title (EN)
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Price
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Duration
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {services.map((s) => (
                  <tr
                    key={s._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      <span className="text-xl">{s.icon || "✨"}</span>
                      {s.title?.en}
                    </td>
                    <td className="px-6 py-4 text-slate-500">₹{s.price}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {s.durationMinutes} mins
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="text-red-500 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No services found.
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
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              {isEdit ? "Edit Service" : "Add Service"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Title (EN)
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) =>
                      setFormData({ ...formData, titleEn: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Title (TA)
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.titleTa}
                    onChange={(e) =>
                      setFormData({ ...formData, titleTa: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    dir="auto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Description (EN)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.descEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descEn: e.target.value })
                  }
                  className="w-full rounded-xl bg-slate-50 p-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Description (TA)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.descTa}
                  onChange={(e) =>
                    setFormData({ ...formData, descTa: e.target.value })
                  }
                  className="w-full rounded-xl bg-slate-50 p-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  dir="auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Methodology (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.methodologyEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        methodologyEn: e.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="e.g. Cognitive Behavioral Therapy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Methodology (TA)
                  </label>
                  <input
                    type="text"
                    value={formData.methodologyTa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        methodologyTa: e.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    dir="auto"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Confidentiality (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.confidentialityEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confidentialityEn: e.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="e.g. 100% Secure & Private"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Confidentiality (TA)
                  </label>
                  <input
                    type="text"
                    value={formData.confidentialityTa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confidentialityTa: e.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    dir="auto"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-slate-900 border-b pb-2">
                  What to Expect
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                      English Points
                    </label>
                    {formData.whatToExpectEn.map((point, idx) => (
                      <input
                        key={`en-pt-${idx}`}
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...formData.whatToExpectEn];
                          newPoints[idx] = e.target.value;
                          setFormData({
                            ...formData,
                            whatToExpectEn: newPoints,
                          });
                        }}
                        className="w-full h-10 rounded-lg bg-slate-50 px-3 text-sm border-none focus:ring-2 focus:ring-primary outline-none"
                        placeholder={`Point ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-400">
                      Tamil Points
                    </label>
                    {formData.whatToExpectTa.map((point, idx) => (
                      <input
                        key={`ta-pt-${idx}`}
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...formData.whatToExpectTa];
                          newPoints[idx] = e.target.value;
                          setFormData({
                            ...formData,
                            whatToExpectTa: newPoints,
                          });
                        }}
                        className="w-full h-10 rounded-lg bg-slate-50 px-3 text-sm border-none focus:ring-2 focus:ring-primary outline-none text-right"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Price (₹)
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Duration (mins)
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Icon (Emoji)
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all text-center text-xl"
                  />
                </div>
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
                  {isEdit ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
