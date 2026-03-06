"use client";

import React from "react";
import { TherapistSidebar } from "@/components/therapist/TherapistSidebar";
import { TherapistHeader } from "@/components/therapist/TherapistHeader";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TherapistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const therapistSession = useAuthStore((state) => state.therapist);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth guard for the login page itself
    if (pathname === "/therapist-dash/login") {
      setIsAuthorized(true);
      return;
    }
    if (
      !therapistSession.isAuthenticated ||
      therapistSession.user?.role !== "therapist"
    ) {
      router.push("/therapist-dash/login");
    } else {
      setIsAuthorized(true);
    }
  }, [therapistSession, router, pathname]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-teal-600 border-t-transparent animate-spin mb-4" />
          <p className="text-slate-500 font-semibold">Verifying Access...</p>
        </div>
      </div>
    );
  }

  // Render login page without the therapist shell
  if (pathname === "/therapist-dash/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <TherapistSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TherapistHeader />
        <main className="flex-1 overflow-y-auto p-8 relative">{children}</main>
      </div>
    </div>
  );
}
