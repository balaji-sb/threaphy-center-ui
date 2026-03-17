import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

interface Service {
  _id: string;
  title?: Record<string, string>;
  description?: Record<string, string>;
  price: number;
  durationMinutes: number;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const t = useTranslations("Services");
  const locale = useLocale();

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-8 transition-all duration-300 hover:shadow-lg border border-slate-100 hover:border-slate-200 z-10">
      <div>
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-100 transition-colors group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10">
          <span className="font-semibold">{index + 1}</span>
        </div>
        <h3 className="mb-3 text-2xl font-semibold text-foreground transition-colors duration-300">
          {service.title?.[locale] || service.title?.en || t("fallbackTitle")}
        </h3>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {service.description?.[locale] ||
            service.description?.en ||
            t("fallbackDesc")}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
        <span className="inline-flex rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 border border-slate-100">
          ₹{service.price} • {service.durationMinutes} {t("min")}
        </span>
        <Link
          href={`/services/${service._id}`}
          className="text-sm font-medium text-primary flex items-center gap-1 transition-all hover:text-primary/80 group-hover:gap-2"
        >
          {t("details")} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
