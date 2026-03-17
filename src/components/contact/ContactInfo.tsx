import React from "react";
import { useTranslations } from "next-intl";

export function ContactInfo() {
  const t = useTranslations("Contact");

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <span className="text-primary">📍</span> {t("addressTitle")}
        </h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 shrink-0">
              🏠
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {t("addressTitle")}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t("addressValue")}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 shrink-0">
              📞
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {t("phoneTitle")}
              </h4>
              <p className="text-slate-500 text-sm font-semibold">
                {t("phoneValue")}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 shrink-0">
              ✉️
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {t("emailTitle")}
              </h4>
              <p className="text-slate-500 text-sm font-semibold">
                {t("emailValue")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 h-[350px] overflow-hidden group">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15549.46366034176!2d80.2435728871582!3d13.0123512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da53f930e1%3A0x867332c668631ed3!2sAdyar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709721600000!5m2!1sen!2sin"
          className="w-full h-full rounded-[1.5rem] border-0 transition-grayscale duration-500"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("findUs")}
        />
      </div>
    </div>
  );
}
