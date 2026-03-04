async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/blogs`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header section */}
      <div className="bg-gradient-to-r from-primary to-accent py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            Blog
          </h1>
          <p className="text-white/90 text-xl max-w-2xl font-medium">
            Explore our latest articles, insights, and expert advice on mental
            health, relationships, and holistic well-being.
          </p>
        </div>
      </div>

      <div className="container py-12 px-4 md:px-6 -mt-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full">
              No blog posts available at the moment.
            </p>
          ) : (
            blogs.map((blog: any) => (
              <article
                key={blog._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card shadow-elevation-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-elevation-4 z-10"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/50">
                  <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 group-hover:scale-105 transition-transform duration-500">
                    <span className="text-muted-foreground font-semibold">
                      Blog Cover
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">
                      Mental Health
                    </span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>

                  <h2 className="mb-3 text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {blog.title?.en}
                  </h2>

                  <p className="mb-6 flex-1 text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.excerpt?.en || blog.content?.en}
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Author: {blog.author?.name}
                    </span>
                    <button className="text-sm font-bold text-primary transition-all hover:text-primary/80 group-hover:underline">
                      Read Article &rarr;
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
