import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, HeartPulse, Users, ShieldCheck } from "lucide-react";

export default function Home() {
  const t = useTranslations("Index");
  const common = useTranslations("Common");

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Vibrant Material Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-[#8A2BE2] to-secondary py-20 md:py-32 lg:py-48 flex justify-center text-white">
        {/* Abstract decorative shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute top-48 right-12 w-80 h-80 bg-white rounded-full mix-blend-overlay blur-2xl"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
                {t("title")}
              </h1>
              <p className="mx-auto max-w-[750px] text-white/90 md:text-2xl font-medium drop-shadow-sm">
                {t("description")}
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="group relative inline-flex h-12 md:h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 md:px-12 font-bold text-primary shadow-elevation-3 transition-all hover:scale-105 hover:shadow-elevation-4 active:scale-95"
              >
                <span className="mr-2 text-lg">{common("bookNow")}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg
            className="relative block w-full h-[50px] md:h-[100px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.2,192.39,101.9,236.4,89.5,280.4,70.5,321.39,56.44Z"
              className="fill-background"
            ></path>
          </svg>
        </div>
      </section>

      {/* Services Overview with Floating Material Cards */}
      <section className="w-full py-16 md:py-24 lg:py-32 flex justify-center bg-background relative z-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground">
              {t("coreTherapies")}
            </h2>
            <div className="mt-4 h-1 w-20 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-card p-8 rounded-3xl shadow-elevation-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-elevation-4 border border-border/50 group">
              <div className="p-5 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <HeartPulse className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {t("individualTherapyTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("individualTherapyDesc")}
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-card p-8 rounded-3xl shadow-elevation-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-elevation-4 border border-border/50 group">
              <div className="p-5 bg-secondary/10 rounded-2xl mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <Users className="h-10 w-10 text-secondary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {t("couplesCounselingTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("couplesCounselingDesc")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-card p-8 rounded-3xl shadow-elevation-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-elevation-4 border border-border/50 group">
              <div className="p-5 bg-accent/10 rounded-2xl mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="h-10 w-10 text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {t("groupTherapyTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("groupTherapyDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
