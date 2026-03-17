import React from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("Contact");

  return (
    <div className="lg:col-span-3">
      <form className="space-y-8 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="space-y-2 text-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t("formTitle")}
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            {t("formSubtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-bold text-slate-700 ml-1"
            >
              {t("fullName")}
            </label>
            <input
              id="name"
              className="flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 text-foreground"
              placeholder={t("namePlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-bold text-slate-700 ml-1"
            >
              {t("emailAddress")}
            </label>
            <input
              id="email"
              type="email"
              className="flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 text-foreground"
              placeholder={t("emailPlaceholder")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-bold text-slate-700 ml-1"
          >
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            className="flex min-h-[160px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition-all focus-visible:outline-none focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 text-foreground resize-none"
            placeholder={t("messagePlaceholder")}
          />
        </div>

        <button
          type="button"
          className="w-full inline-flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-lg font-black text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-95 mt-4"
        >
          {t("submitButton")} <span aria-hidden="true">&rarr;</span>
        </button>
      </form>
    </div>
  );
}
