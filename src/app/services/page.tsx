import { useTranslations } from "next-intl";

async function getServices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/services`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function ServicesPage() {
  const services = await getServices();
  // We can't use useTranslations in an async Server Component directly in newest next-intl without getTranslations,
  // but since it's already implemented like this, we'll keep it as a Client component if we want to use `useTranslations`,
  // OR we use the server equivalent `getTranslations`. Let me use getTranslations.
  // Actually wait, in Next-intl app router, if we don't have getTranslations we can make it a Client component, but Server component is better.
  // I will just use static text for the header for now to avoid next-intl async issues, or keep useTranslations and make it "use client".
  // Let's make it a server component since `services` is fetched.

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            Services
          </h1>
          <p className="text-white/90 text-xl max-w-2xl font-medium">
            Discover a comprehensive range of professional therapy services
            designed to support and empower your mental health journey.
          </p>
        </div>
      </div>

      <div className="container py-12 px-4 md:px-6 -mt-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full">
              No services available at the moment.
            </p>
          ) : (
            services.map((service: any, i: number) => (
              <div
                key={service._id}
                className="group relative flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-8 shadow-elevation-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-elevation-4 z-10"
              >
                <div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">
                    {service.title?.en || "Specialized Therapy"}
                  </h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    {service.description?.en ||
                      "A comprehensive description of this therapy service. Designed to foster emotional resilience and deep understanding."}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                    ₹{service.price} / {service.durationMinutes} min
                  </span>
                  <button className="text-sm font-bold text-primary transition-all hover:text-primary/80 group-hover:underline">
                    Details &rarr;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
