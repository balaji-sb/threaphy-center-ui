"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type Therapist = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  bio?: { en: string; ta: string };
  specialties?: { en: string[]; ta: string[] };
};

export default function TherapistProfilePage() {
  const { id } = useParams();
  const locale = useLocale() as "en" | "ta";
  const t = useTranslations("TherapistProfile");
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const res = await api.get(`/users/therapists/${id}`);
        setTherapist(res.data);
      } catch (error) {
        console.error("Failed to fetch therapist profile", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTherapist();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-slate-500 font-semibold tracking-wide">
            {t("loadingProfile")}
          </p>
        </div>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          {t("notFoundTitle")}
        </h2>
        <p className="text-slate-500 mb-8">{t("notFoundMessage")}</p>
        <Link
          href="/therapists"
          className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all"
        >
          {t("backToAll")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-24">
      <div className="max-w-5xl mx-auto px-6">
        <Link
          href="/therapists"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 group transition-colors"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="font-semibold text-sm">{t("back")}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Avatar and Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
              <div className="w-32 h-32 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-4xl mx-auto mb-6 shadow-inner">
                {therapist.name.charAt(0)}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                Dr. {therapist.name}
              </h1>
              <p className="text-primary font-bold text-sm uppercase tracking-wider mb-6">
                {t("certified")}
              </p>

              <div className="flex justify-center gap-2 pt-2">
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 cursor-pointer">
                  in
                </span>
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 cursor-pointer">
                  tw
                </span>
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 cursor-pointer">
                  fb
                </span>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                {t("quickStats")}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">
                    {t("experience")}
                  </span>
                  <span className="text-slate-900 font-bold">
                    {t("expValue")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">
                    {t("completedSessions")}
                  </span>
                  <span className="text-slate-900 font-bold">
                    {t("sessionsValue")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">
                    {t("availability")}
                  </span>
                  <span className="text-emerald-600 font-bold">
                    {t("onlineNow")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio and Services */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-primary">✨</span> {t("professionalBio")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {therapist.bio?.[locale] ||
                  therapist.bio?.en ||
                  t("defaultBio")}
              </p>

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {t("specialties")}
              </h3>
              <div className="flex flex-wrap gap-2 mb-10">
                {(
                  therapist.specialties?.[locale] || [
                    "Anxiety Relief",
                    "CBT",
                    "Stress Management",
                  ]
                ).map((spec) => (
                  <span
                    key={spec}
                    className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-100"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 text-center"
              >
                {t("scheduleCta", { name: therapist.name })}
              </Link> */}
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-blue-200/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {t("immediateAssist")}
                  </h3>
                  <p className="text-indigo-100 font-medium">
                    {t("emergencyCta")}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  {t("contactNow")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
