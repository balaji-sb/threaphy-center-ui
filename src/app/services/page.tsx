import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
async function getServices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/services`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function ServicesPage() {
  const services = await getServices();
  const t = await getTranslations("Services");
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Professional Calm Header section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-500 via-blue-500 to-teal-500 border-b border-border/50 pt-12 pb-12 md:pt-16 md:pb-20 flex justify-center">
        {/* Subtle, elegant organic background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[130%] rounded-[100%] bg-white blur-3xl transform rotate-12 opacity-10"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] rounded-[100%] bg-black blur-3xl transform -rotate-12 opacity-10"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-sm">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-white/90 text-lg md:text-xl leading-relaxed text-balance">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="relative py-12 px-4 md:px-6 mt-5 md:mt-12 z-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full text-center">
              {t("noServices")}
            </p>
          ) : (
            services.map(
              (
                service: {
                  _id: string;
                  title?: Record<string, string>;
                  description?: Record<string, string>;
                  price: number;
                  durationMinutes: number;
                },
                i: number,
              ) => (
                <div
                  key={service._id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white p-8 transition-all duration-300 hover:shadow-lg border border-slate-100 hover:border-slate-200 z-10"
                >
                  <div>
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-100 transition-colors group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10">
                      <span className="font-semibold">{i + 1}</span>
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold text-foreground transition-colors duration-300">
                      {service.title?.[locale] ||
                        service.title?.en ||
                        t("fallbackTitle")}
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
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
}
