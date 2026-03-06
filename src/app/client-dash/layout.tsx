"use client";

import React from "react";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { ClientHeader } from "@/components/client/ClientHeader";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const clientSession = useAuthStore((state) => state.client);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth guard for the login page itself
    if (pathname === "/client-dash/login") {
      setIsAuthorized(true);
      return;
    }
    if (
      !clientSession.isAuthenticated ||
      clientSession.user?.role !== "client"
    ) {
      router.push("/client-dash/login");
    } else {
      setIsAuthorized(true);
    }
  }, [clientSession, router, pathname]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mb-4" />
          <p className="text-slate-500 font-semibold">Verifying Access...</p>
        </div>
      </div>
    );
  }

  // Render login page without the client shell
  if (pathname === "/client-dash/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <ClientSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <ClientHeader />
        <main className="flex-1 overflow-y-auto p-8 relative">{children}</main>
      </div>
    </div>
  );
}
