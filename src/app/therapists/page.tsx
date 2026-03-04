async function getTherapists() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/users/therapists`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function TherapistsPage() {
  const therapists = await getTherapists();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header section */}
      <div className="bg-gradient-to-r from-secondary to-primary py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            Our Therapists
          </h1>
          <p className="text-white/90 text-xl max-w-2xl font-medium">
            Meet our empathetic and highly qualified therapists, dedicated to
            navigating life&apos;s challenges with you.
          </p>
        </div>
      </div>

      <div className="container py-12 px-4 md:px-6 -mt-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {therapists.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full">
              No therapists available at the moment.
            </p>
          ) : (
            therapists.map((therapist: any) => (
              <div
                key={therapist._id}
                className="group overflow-hidden rounded-3xl border border-border/50 bg-card shadow-elevation-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-elevation-4 z-10"
              >
                <div className="bg-muted/50 h-56 w-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-muted-foreground font-semibold">
                    Photo Placeholder
                  </span>
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-10 right-6 h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-md">
                    <div className="h-10 w-10 bg-primary/20 rounded-full" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">
                    Dr. {therapist.name}
                  </h3>
                  <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-4 uppercase tracking-wider">
                    Clinical Psychologist
                  </p>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                    Extensive experience in CBT and trauma-informed therapy.
                    Dedicated to helping individuals navigate life&apos;s
                    challenges with resilience.
                  </p>
                  <button className="w-full rounded-2xl bg-secondary/10 px-4 py-3 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-white">
                    View Profile
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
