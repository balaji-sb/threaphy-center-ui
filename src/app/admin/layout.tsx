"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const adminSession = useAuthStore((state) => state.admin);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth guard for the /admin/login page itself
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }
    if (!adminSession.isAuthenticated || adminSession.user?.role !== "admin") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [adminSession, router, pathname]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-slate-500 font-semibold">Verifying Access...</p>
        </div>
      </div>
    );
  }

  // Render the login page without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8 relative">{children}</main>
      </div>
    </div>
  );
}
