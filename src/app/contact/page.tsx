import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  const navT = useTranslations("Navigation");
  const t = useTranslations("Contact");
  
  return (
    <div className="min-h-screen bg-muted/20">
      <PageHeader title={navT("contact")} subtitle={t("subtitle")} />

      <div className="relative py-12 px-4 md:px-6 -mt-20 md:-mt-24 z-20 container mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
