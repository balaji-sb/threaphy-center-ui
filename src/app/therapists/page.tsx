import { getTranslations } from "next-intl/server";
import { getTherapists } from "@/services/api/therapists.api";
import { PageHeader } from "@/components/ui/PageHeader";
import { TherapistCard } from "@/components/TherapistCard";

export default async function TherapistsPage() {
  const therapists = await getTherapists();
  const t = await getTranslations("Therapists");

  return (
    <div className="min-h-screen bg-muted/20">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="relative py-12 px-4 md:px-6 mt-5 md:mt-12 z-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {therapists.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full">
              {t("noTherapists")}
            </p>
          ) : (
            therapists.map((therapist: { _id: string; name: string }) => (
              <TherapistCard key={therapist._id} therapist={therapist} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
