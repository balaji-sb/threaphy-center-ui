import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function getTherapists() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/users/therapists`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function TherapistsPage() {
  const therapists = await getTherapists();
  const t = await getTranslations("Therapists");

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Vibrant Material Header section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-500 via-blue-500 to-teal-500 border-b border-border/10 pt-12 pb-12 md:pt-16 md:pb-20 flex justify-center shadow-md">
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
          {therapists.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full">
              {t("noTherapists")}
            </p>
          ) : (
            therapists.map((therapist: { _id: string; name: string }) => (
              <div
                key={therapist._id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 z-10"
              >
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
