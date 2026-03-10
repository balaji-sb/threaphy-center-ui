"use client";

import { useEffect, useState } from "react";
import api, { getStaticUrl } from "@/lib/api";

type Event = {
  _id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  date: string;
  location: { en: string; ta: string };
  image?: string;
  link?: string;
  active: boolean;
  createdAt: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    title_en: "",
    title_ta: "",
    description_en: "",
    description_ta: "",
    date: "",
    location_en: "",
    location_ta: "",
    image: "",
    link: "",
    active: true,
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events/admin/all");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      id: "",
      title_en: "",
      title_ta: "",
      description_en: "",
      description_ta: "",
      date: "",
      location_en: "",
      location_ta: "",
      image: "",
      link: "",
      active: true,
    });
    setSelectedFile(null);
    setImagePreview(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event: Event) => {
    setFormData({
      id: event._id,
      title_en: event.title.en,
      title_ta: event.title.ta,
      description_en: event.description.en,
      description_ta: event.description.ta,
      date: new Date(event.date).toISOString().split("T")[0],
      location_en: event.location.en,
      location_ta: event.location.ta,
      image: event.image || "",
      link: event.link || "",
      active: event.active,
    });
    setSelectedFile(null);
    setImagePreview(getStaticUrl(event.image));
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", JSON.stringify({ en: formData.title_en, ta: formData.title_ta }));
      data.append("description", JSON.stringify({ en: formData.description_en, ta: formData.description_ta }));
      data.append("date", formData.date);
      data.append("location", JSON.stringify({ en: formData.location_en, ta: formData.location_ta }));
      data.append("link", formData.link);
      data.append("active", String(formData.active));
      
      if (selectedFile) {
        data.append("image", selectedFile);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (isEdit) {
        await api.put(`/events/${formData.id}`, data, config);
      } else {
        await api.post("/events", data, config);
      }
      setIsModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to save event. Check console for details.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Events
        </h1>
        <button
          onClick={handleOpenAdd}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>+</span> Add Event
        </button>
      </div>

      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
            Loading events...
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
                    Date
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Location (EN)
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {events.map((ev) => (
                  <tr
                    key={ev._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      {ev.image && (
                        <img 
                          src={getStaticUrl(ev.image) || ""} 
                          alt="" 
                          className="w-8 h-8 rounded-lg object-cover bg-slate-100"
                        />
                      )}
                      {ev.title.en}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(ev.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {ev.location.en}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          ev.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {ev.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleOpenEdit(ev)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ev._id)}
                        className="text-red-500 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No events found.
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
              {isEdit ? "Edit Event" : "Add Event"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Title (English)
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title_en}
                    onChange={(e) =>
                      setFormData({ ...formData, title_en: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Title (Tamil)
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title_ta}
                    onChange={(e) =>
                      setFormData({ ...formData, title_ta: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Description (English)
                </label>
                <textarea
                  required
                  value={formData.description_en}
                  onChange={(e) =>
                    setFormData({ ...formData, description_en: e.target.value })
                  }
                  className="w-full h-24 rounded-xl bg-slate-50 p-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Description (Tamil)
                </label>
                <textarea
                  required
                  value={formData.description_ta}
                  onChange={(e) =>
                    setFormData({ ...formData, description_ta: e.target.value })
                  }
                  className="w-full h-24 rounded-xl bg-slate-50 p-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Event Image
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="file"
                      id="event-image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="event-image"
                      className="flex-1 h-12 rounded-xl bg-slate-50 px-4 flex items-center text-sm text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors border-2 border-dashed border-slate-200"
                    >
                      {selectedFile ? selectedFile.name : "Choose Image..."}
                    </label>
                    {imagePreview && (
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Location (English)
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.location_en}
                    onChange={(e) =>
                      setFormData({ ...formData, location_en: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Location (Tamil)
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.location_ta}
                    onChange={(e) =>
                      setFormData({ ...formData, location_ta: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  External Link (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://event-details.com"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2 px-1">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="w-5 h-5 rounded text-primary focus:ring-primary border-slate-300"
                />
                <label htmlFor="active" className="text-sm font-bold text-slate-700">
                  Visible on Homepage
                </label>
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
                  {isEdit ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
