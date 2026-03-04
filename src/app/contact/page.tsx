import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const t = useTranslations("Navigation");
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header section */}
      <div className="bg-gradient-to-r from-secondary to-accent py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            {t("contact")}
          </h1>
          <p className="text-white/90 text-xl max-w-2xl font-medium mx-auto">
            Reach out to us if you have any questions, need support, or want to
            schedule an initial consultation.
          </p>
        </div>
      </div>

      <div className="container py-12 px-4 md:px-6 -mt-10 max-w-3xl mx-auto relative z-10">
        <form className="space-y-8 bg-card p-8 md:p-12 rounded-3xl border border-border/50 shadow-elevation-3">
          <div className="space-y-2 text-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              We&apos;re Here to Listen
            </h2>
            <p className="text-muted-foreground text-sm">
              Please fill out the form below and our team will get back to you
              shortly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label
                htmlFor="name"
                className="text-sm font-bold text-foreground/80 ml-1"
              >
                Full Name
              </label>
              <input
                id="name"
                className="flex h-14 w-full rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="email"
                className="text-sm font-bold text-foreground/80 ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="flex h-14 w-full rounded-2xl border-none bg-muted/50 px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="message"
              className="text-sm font-bold text-foreground/80 ml-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              className="flex min-h-[150px] w-full rounded-2xl border-none bg-muted/50 px-4 py-4 text-sm transition-all focus-visible:outline-none focus-visible:-translate-y-1 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-elevation-1 placeholder:text-muted-foreground text-foreground resize-none"
              placeholder="How can we support you today?"
            />
          </div>

          <button
            type="button"
            className="w-full inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-elevation-2 transition-all hover:bg-primary/90 hover:-translate-y-1 hover:shadow-elevation-3 active:scale-95 active:shadow-elevation-1 mt-4"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
