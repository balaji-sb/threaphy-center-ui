"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type Service = {
  _id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  methodology?: { en: string; ta: string };
  confidentiality?: { en: string; ta: string };
  whatToExpect?: { en: string[]; ta: string[] };
  price: number;
  durationMinutes: number;
  icon?: string;
};

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale() as "en" | "ta";
  const t = useTranslations("ServiceDetails");
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data);
      } catch (error) {
        console.error("Failed to fetch service details", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-slate-500 font-semibold tracking-wide">
            {t("loadingDetails")}
          </p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          {t("notFoundTitle")}
        </h2>
        <p className="text-slate-500 mb-8">{t("notFoundDescription")}</p>
        <Link
          href="/services"
          className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all"
        >
          {t("backToServices")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 pt-24 pb-40 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 group transition-colors"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span className="font-semibold text-sm">{t("back")}</span>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl shadow-xl border border-white/20">
              {service.icon || "🌿"}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2">
                {service.title[locale] || service.title.en}
              </h1>
              <div className="flex items-center gap-4 text-blue-50/90 font-medium">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs border border-white/10">
                  ⏱️ {service.durationMinutes} {t("minutes")}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs border border-white/10">
                  💳 {t("fixedPrice")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-primary">✨</span> {t("aboutSession")}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
              {service.description[locale] || service.description.en}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-wider opacity-50">
                  {t("methodology")}
                </h4>
                <p className="text-slate-600 font-medium italic">
                  {service.methodology?.[locale] || t("evidenceBase")}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-wider opacity-50">
                  {t("confidentiality")}
                </h4>
                <p className="text-slate-600 font-medium italic">
                  {service.confidentiality?.[locale] ||
                    t("confidentialityPolicy")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ/Pre-req section placeholder */}
          <div className="bg-indigo-50/50 rounded-[2rem] p-8 border border-indigo-100/50">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">
              {t("whatToExpect")}
            </h3>
            <ul className="space-y-3">
              {(service.whatToExpect?.[locale]?.length
                ? service.whatToExpect[locale]
                : [
                    t("expectItem1"),
                    t("expectItem2"),
                    t("expectItem3"),
                    t("expectItem4"),
                  ]
              ).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-indigo-700 font-medium"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs shadow-sm">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Booking Sidebar */}

        {/* <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-[2rem] p-8 shadow-2xl shadow-blue-900/10 border border-blue-50 ring-4 ring-blue-50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-teal-400"></div>

            <div className="mb-8">
              <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mb-1">
                {t("totalInvestment")}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">
                  ₹{service.price}
                </span>
                <span className="text-slate-400 font-bold text-sm">
                  {t("perSession")}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-500 font-medium">
                  {t("duration")}
                </span>
                <span className="text-slate-900 font-bold">
                  {service.durationMinutes} {t("minutes")}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-500 font-medium">
                  {t("platform")}
                </span>
                <span className="text-slate-900 font-bold">
                  {t("platformValue")}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-500 font-medium">
                  {t("cancellations")}
                </span>
                <span className="text-slate-900 font-bold">
                  {t("cancellationsValue")}
                </span>
              </div>
            </div>

            <Link
              href="/services"
              className="block w-full text-center py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-95 text-lg"
            >
              {t("bookNow")}
            </Link>

            <p className="mt-6 text-center text-slate-400 text-xs font-medium">
              {t("paymentNote")}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
