"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Blog = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string } | string;
  tags: string[];
  imageUrl: string;
  published: boolean;
  createdAt: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    tags: "",
    published: true,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      tags: "",
      published: true,
    });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: Blog) => {
    setFormData({
      id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      imageUrl: blog.imageUrl || "",
      tags: blog.tags?.join(", ") || "",
      published: blog.published ?? true,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      imageUrl: formData.imageUrl,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      published: formData.published,
    };

    try {
      if (isEdit) {
        await api.put(`/blogs/${formData.id}`, payload);
      } else {
        await api.post("/blogs", payload);
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) {
      console.error("Submit failed", error);
      alert("Failed to save blog. Check console for details.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Blogs
        </h1>
        <button
          onClick={handleOpenAdd}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>+</span> Create Post
        </button>
      </div>

      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
            Loading blogs...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Title
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Date
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {blogs.map((b) => (
                  <tr
                    key={b._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 truncate max-w-[300px]">
                      {b.title}
                    </td>
                    <td className="px-6 py-4">
                      {b.published ? (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="text-red-500 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No blogs found.
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
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              {isEdit ? "Edit Blog" : "Create Blog"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Title
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Excerpt
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full rounded-xl bg-slate-50 p-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                  Content (Markdown supported in frontend)
                </label>
                <textarea
                  required
                  rows={10}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full rounded-xl bg-slate-50 p-4 text-sm font-mono border-none focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-slate-50 px-4 text-sm border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="Mental Health, Therapy, Healing..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="w-5 h-5 rounded text-primary focus:ring-primary border-slate-300"
                />
                <label htmlFor="published" className="font-bold text-slate-700">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
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
                  {isEdit ? "Save Changes" : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
