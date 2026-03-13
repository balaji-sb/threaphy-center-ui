"use client";

import { useEffect, useState, useCallback } from "react";
import api, { getStaticUrl } from "@/lib/api";
import { useLocale } from "next-intl";
import {
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
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

export default function HeroEventsCarousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = useLocale() as "en" | "ta";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        const activeEvents = res.data.filter((e: Event) => e.active);
        setEvents(activeEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  useEffect(() => {
    if (events.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [events.length, nextSlide]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Healing & Growth
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Join us on a journey to wellness. Check back soon for upcoming
            workshops and sessions.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-primary px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/20"
          >
            View Our Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[85vh] lg:h-[90vh] overflow-hidden bg-black">
      {/* Slides */}
      <div className="relative w-full h-full">
        {events.map((event, index) => (
          <div
            key={event._id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              {event.image ? (
                <Image
                  src={getStaticUrl(event.image) || ""}
                  alt={event.title[locale]}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-900"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="container relative z-10 h-full flex flex-col justify-center px-6 md:px-12">
              <div className="max-w-4xl space-y-6 pt-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground text-xs font-bold uppercase tracking-widest">
                  Upcoming Event
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                  {event.title[locale]}
                </h1>

                <p className="text-lg md:text-2xl text-slate-200 max-w-2xl font-medium leading-relaxed line-clamp-2 md:line-clamp-none">
                  {event.description[locale]}
                </p>

                <div className="flex flex-wrap gap-6 text-white py-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <span className="font-bold">
                      {new Date(event.date).toLocaleDateString(locale, {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <span className="font-bold">{event.location[locale]}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {event.link && (
                    <Link
                      href={event.link}
                      className="inline-flex h-16 items-center justify-center rounded-2xl bg-primary px-10 font-black text-white text-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30"
                    >
                      Register Now
                    </Link>
                  )}
                  <Link
                    href="/services"
                    className="inline-flex h-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-10 font-bold text-white text-lg hover:bg-white/20 transition-all"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {events.length > 1 && (
        <>
          <div className="absolute bottom-10 right-10 z-40 flex gap-4">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-10 left-10 z-40 flex gap-2">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "w-12 bg-primary" : "w-4 bg-white/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
