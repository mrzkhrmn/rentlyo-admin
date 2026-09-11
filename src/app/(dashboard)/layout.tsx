"use client";

import { AuthGuard } from "@/features/auth/auth-guard";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-dvh bg-app">
        <Sidebar />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
