import { getTranslations, getLocale } from "next-intl/server";

async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/blogs`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const t = await getTranslations("Blog");
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Vibrant Material Header section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-500 via-blue-500 to-teal-500 border-b border-border/10 pt-20 pb-32 md:pt-28 md:pb-40 flex justify-center shadow-md">
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

      <div className="relative py-12 px-4 md:px-6 mt-20 md:mt-24 z-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 ? (
            <p className="text-muted-foreground z-10 w-full text-center col-span-full">
              {t("noBlogs")}
            </p>
          ) : (
            blogs.map(
              (blog: {
                _id: string;
                title?: Record<string, string>;
                excerpt?: Record<string, string>;
                content?: Record<string, string>;
                author?: { name: string };
                createdAt: string;
              }) => (
                <article
                  key={blog._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 z-10"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 group-hover:scale-105 transition-transform duration-500">
                      <span className="text-slate-400 font-medium">
                        {t("coverPlaceholder")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                      <span className="text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                        {t("fallbackCategory")}
                      </span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="mb-3 text-2xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                      {blog.title?.[locale] || blog.title?.en}
                    </h2>

                    <p className="mb-6 flex-1 text-slate-500 leading-relaxed line-clamp-3">
                      {blog.excerpt?.[locale] ||
                        blog.content?.[locale] ||
                        blog.excerpt?.en ||
                        blog.content?.en}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                      <span className="text-sm font-medium text-slate-600">
                        {t("author")} {blog.author?.name}
                      </span>
                      <button className="text-sm font-medium text-primary flex items-center gap-1 transition-all hover:text-primary/80 group-hover:gap-2">
                        {t("readArticle")}{" "}
                        <span aria-hidden="true">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </article>
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
}
