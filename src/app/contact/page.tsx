import { useTranslations } from "next-intl";

export default function ContactPage() {
  const navT = useTranslations("Navigation");
  const t = useTranslations("Contact");
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Vibrant Material Header section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-500 via-blue-500 to-teal-500 border-b border-border/10 pt-20 pb-32 md:pt-28 md:pb-40 flex justify-center shadow-md">
        {/* Subtle, elegant organic background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[130%] rounded-[100%] bg-white blur-3xl transform rotate-12 opacity-10"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] rounded-[100%] bg-black blur-3xl transform -rotate-12 opacity-10"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-sm">
              {navT("contact")}
            </h1>
            <p className="mx-auto max-w-2xl text-white/90 text-lg md:text-xl leading-relaxed text-balance">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="relative py-12 px-4 md:px-6 -mt-20 md:-mt-24 z-20 container mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Column: Location Info & Map */}
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

          {/* Right Column: Contact Form */}
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
        </div>
      </div>
    </div>
  );
}
