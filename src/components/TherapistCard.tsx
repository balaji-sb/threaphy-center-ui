import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Therapist {
  _id: string;
  name: string;
}

interface TherapistCardProps {
  therapist: Therapist;
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  const t = useTranslations("Therapists");

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 z-10">
      <div className="bg-slate-100 h-56 w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="text-slate-400 font-medium">
          {t("photoPlaceholder")}
        </span>
      </div>
      <div className="p-8 relative">
        <div className="absolute -top-10 right-6 h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg">
            {therapist.name.charAt(0)}
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-1 text-foreground group-hover:text-primary transition-colors duration-300">
          Dr. {therapist.name}
        </h3>
        <p className="inline-flex rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4 uppercase tracking-wider border border-primary/10">
          {t("fallbackRole")}
        </p>
        <p className="text-slate-500 leading-relaxed line-clamp-3 mb-6">
          {t("fallbackBio")}
        </p>
        <Link
          href={`/therapists/${therapist._id}`}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 border border-slate-100 transition-all hover:bg-primary hover:text-white hover:border-primary group-hover:shadow-md"
        >
          {t("viewProfile")} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
