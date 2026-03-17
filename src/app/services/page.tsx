import { getTranslations } from "next-intl/server";
import { getServices } from "@/services/api/services.api";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";

export default async function ServicesPage() {
  const services = await getServices();
  const t = await getTranslations("Services");

  return (
    <div className="min-h-screen bg-muted/20">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="relative py-12 px-4 md:px-6 mt-5 md:mt-12 z-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full">
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
              ) => <ServiceCard key={service._id} service={service} index={i} />,
            )
          )}
        </div>
      </div>
    </div>
  );
}
