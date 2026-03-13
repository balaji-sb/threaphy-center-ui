"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/lib/api";
import { useLocale, useTranslations } from "next-intl";
import {
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Event = {
  _id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  date: string;
  location: { en: string; ta: string };
  image?: string;
  link?: string;
  active: boolean;
};

export default function EventsCarousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale() as "en" | "ta";
  const t = useTranslations("Index");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="w-full py-24 flex justify-center bg-slate-50/50">
        <div className="container px-4">
          <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-full mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-slate-100 animate-pulse rounded-[3rem]"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) return null;

  return (
    <section className="w-full py-24 md:py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 text-slate-600 text-sm font-bold shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Community & Connection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {t("upcomingEvents")}
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              {t("eventsSubtitle")}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg shadow-slate-200/50 active:scale-90"
              aria-label="Previous events"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg shadow-slate-200/50 active:scale-90"
              aria-label="Next events"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        >
          {events.map((event) => (
            <div
              key={event._id}
              className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-center md:snap-start group"
            >
              <div className="h-full bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-primary/10">
                {/* Image Section */}
                <div className="relative h-[300px] overflow-hidden">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title[locale]}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Calendar className="h-20 w-20 text-slate-300" />
                    </div>
                  )}

                  {/* Glass Card for Date */}
                  <div className="absolute top-6 left-6 p-4 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 text-white flex flex-col items-center min-w-[70px] shadow-2xl">
                    <span className="text-2xl font-black leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest mt-1 opacity-80">
                      {new Date(event.date).toLocaleString(locale, {
                        month: "short",
                      })}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                    <span className="px-4 py-2 bg-primary/90 backdrop-blur-md rounded-2xl text-[10px] font-black text-white shadow-xl uppercase tracking-[0.2em]">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-10 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {event.title[locale]}
                    </h3>
                    <p className="text-slate-500 text-lg line-clamp-3 font-medium leading-relaxed">
                      {event.description[locale]}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Date & Time
                        </span>
                        <span className="text-sm font-bold">
                          {new Date(event.date).toLocaleDateString(locale, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Location
                        </span>
                        <span className="text-sm font-bold">
                          {event.location[locale]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {event.link && (
                    <Link
                      href={event.link}
                      target="_blank"
                      className="relative h-16 w-full inline-flex items-center justify-center gap-3 bg-slate-900 rounded-3xl text-white font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:bg-primary active:scale-95 group/btn shadow-xl shadow-slate-200"
                    >
                      <span className="relative z-10">Register Now</span>
                      <ExternalLink className="h-4 w-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
