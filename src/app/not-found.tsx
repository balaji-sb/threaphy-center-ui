import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-border/50 rounded-3xl p-12 text-center shadow-lg relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

        <div className="relative z-10">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400 mb-4 animate-pulse">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-slate-500 mb-8">
            Oops! The page you were looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-2xl shadow-sm hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>🏠</span> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
