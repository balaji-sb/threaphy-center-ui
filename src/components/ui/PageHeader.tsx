import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-500 via-blue-500 to-teal-500 border-b border-border/10 pt-12 pb-12 md:pt-16 md:pb-20 flex justify-center shadow-md">
      {/* Subtle, elegant organic background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
        <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[130%] rounded-[100%] bg-white blur-3xl transform rotate-12 opacity-10"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] rounded-[100%] bg-black blur-3xl transform -rotate-12 opacity-10"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <div className="space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-sm">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-white/90 text-lg md:text-xl leading-relaxed text-balance">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
