"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Star,
  Smile,
  CheckCircle2,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import HeroEventsCarousel from "@/components/HeroEventsCarousel";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("Index");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-50/30 selection:bg-primary/30 selection:text-primary-foreground">
      {/* Dynamic Hero Events Carousel */}
      <HeroEventsCarousel />

      {/* Stats Section - Normalized UI */}
      <section className="relative z-20 w-full flex justify-center -mt-20 px-4 pb-20">
        <div className="container max-w-6xl py-12 px-8 bg-white rounded-3xl border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {[
            {
              value: t("stat1"),
              label: t("stat1Label"),
              color: "text-primary",
            },
            {
              value: t("stat2"),
              label: t("stat2Label"),
              color: "text-purple-600",
              border: true,
            },
            {
              value: t("stat3"),
              label: t("stat3Label"),
              color: "text-teal-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`space-y-2 ${stat.border ? "md:border-x border-slate-100 px-4" : ""}`}
            >
              <p
                className={`text-5xl font-black tracking-tighter ${stat.color}`}
              >
                {stat.value}
              </p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section - Normalized Typography */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-white">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="text-primary font-bold uppercase tracking-widest text-xs">
              The Journey
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              {t("processTitle")}
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              {t("processSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { id: "01", title: t("step1Title"), desc: t("step1Desc") },
              { id: "02", title: t("step2Title"), desc: t("step2Desc") },
              { id: "03", title: t("step3Title"), desc: t("step3Desc") },
            ].map((step, i) => (
              <div
                key={i}
                className="group relative p-10 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1"
              >
                <span className="absolute top-6 right-6 text-4xl font-black text-slate-200 group-hover:text-primary/10 transition-colors">
                  {step.id}
                </span>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Balanced Design */}
      <section className="w-full py-24 flex justify-center bg-slate-50/50">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl space-y-4">
              <div className="text-secondary font-bold uppercase tracking-widest text-xs">
                Expert Services
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                {t("whyUsTitle")}
              </h2>
            </div>
            <Link
              href="/services"
              className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2 group transition-all hover:bg-primary active:scale-95 shadow-lg shadow-slate-200"
            >
              Explore All{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Smile,
                title: t("individualTherapyTitle"),
                desc: t("individualTherapyDesc"),
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Users,
                title: t("couplesCounselingTitle"),
                desc: t("couplesCounselingDesc"),
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: ShieldCheck,
                title: t("groupTherapyTitle"),
                desc: t("groupTherapyDesc"),
                color: "bg-teal-50 text-teal-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-10 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Refined spacing */}
      <section className="w-full py-32 flex justify-center bg-white">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <MessageSquare className="h-12 w-12 text-primary/30 mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
              {t("testimonialsTitle")}
            </h2>
            <p className="text-xl text-slate-500 font-medium italic">
              {t("testimonialsSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { text: t("testimonial1"), author: t("testimonial1Author") },
              { text: t("testimonial2"), author: t("testimonial2Author") },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 bg-slate-50 rounded-3xl border border-slate-100 text-left space-y-6 transition-all hover:bg-white hover:shadow-xl shadow-sm"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xl font-bold text-slate-900 italic leading-relaxed">
                  &quot;{item.text}&quot;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <span className="font-black text-slate-900 uppercase tracking-widest text-xs">
                    {item.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section - More professional imagery and layout */}
      <section className="w-full py-32 flex justify-center bg-slate-900 text-white overflow-hidden">
        <div className="container px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/therapy_vision_image_1773167911909.png"
                alt="Our Vision"
                width={1920}
                height={1080}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end p-8">
                <p className="text-white text-xl font-bold italic">
                  &quot;Healing is not linear, but it is always possible.&quot;
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <div className="text-primary font-bold uppercase tracking-widest text-xs">
                  Our Vision
                </div>
                <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight">
                  {t("visionTitle")}
                </h2>
              </div>
              <p className="text-lg text-slate-300 font-medium leading-relaxed">
                {t("visionDesc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Expert Compassion",
                  "Inclusive Care",
                  "Safe Environment",
                  "Client-Centered",
                ].map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3 text-white p-4 rounded-2xl bg-white/5 border border-white/5"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-bold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex h-16 items-center justify-center rounded-xl bg-primary px-10 font-black text-white text-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Professional Accordion */}
      <section className="w-full py-32 flex justify-center bg-white text-slate-900">
        <div className="container max-w-4xl px-4 md:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              {t("faqTitle")}
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              {t("faqSubtitle")}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { q: t("q1"), a: t("a1") },
              { q: t("q2"), a: t("a2") },
              { q: t("q3"), a: t("a3") },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-bold">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${activeFaq === i ? "max-h-[300px] opacity-100 p-6 pt-0" : "max-h-0 opacity-0 overflow-hidden"}`}
                >
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Professional & Trustworthy */}
      <section className="w-full py-24 px-4 bg-slate-50">
        <div className="container max-w-6xl">
          <div className="relative p-12 md:p-24 rounded-[3rem] bg-slate-900 overflow-hidden text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Your journey to healing{" "}
                <span className="text-primary italic">starts today.</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                Take the first step towards a more resilient and joyful version
                of yourself. Our experts are here to support you.
              </p>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/services"
                  className="h-16 px-10 inline-flex items-center justify-center rounded-2xl bg-primary font-black text-white text-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
                >
                  Get Started
                </Link>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <Image
                        key={i}
                        src={`https://i.pravatar.cc/100?u=${i + 10}`}
                        className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover"
                        alt="Community member"
                        width={500}
                        height={250}
                      />
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black">
                      +2K
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">Join our community</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      Growing together
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
