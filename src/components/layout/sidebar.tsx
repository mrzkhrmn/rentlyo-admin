"use client";

import { useAuth } from "@/features/auth/auth-provider";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: DashboardIcon },
  { href: "/tenants", label: "Şirketler", icon: BuildingsIcon },
  { href: "/leads", label: "Leadler", icon: LeadsIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <aside className="relative flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-white/5 bg-sidebar text-sidebar-foreground animate-fade-in">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_srgb,var(--color-sidebar-accent)_35%,transparent),transparent_45%)]" />
      <div className="relative border-b border-white/8 px-5 py-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sidebar-accent">
          Rentlyo
        </p>
        <h1 className="mt-1 font-display text-xl font-semibold tracking-tight">
          Platform Admin
        </h1>
        <p className="mt-1 text-xs text-sidebar-foreground/60">
          SaaS yönetim paneli
        </p>
      </div>

      <nav className="relative flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-sidebar-accent/20 text-white shadow-glow"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-white",
              )}
            >
              <Icon className={cn("h-4 w-4", active && "text-sidebar-accent")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="relative border-t border-white/8 p-4">
        <div className="mb-3 rounded-md bg-sidebar-muted/80 px-3 py-2.5">
          <p className="truncate text-sm font-medium">{user?.fullName}</p>
          <p className="truncate text-xs text-sidebar-foreground/55">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-md px-3 py-2 text-left text-sm text-sidebar-foreground/70 transition hover:bg-white/5 hover:text-white"
        >
          Çıkış yap
        </button>
      </div>
    </aside>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h7v7H4V4Zm9 0h7v5h-7V4ZM4 13h7v7H4v-7Zm9 3h7v4h-7v-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuildingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V7l8-3 8 3v13M9 20v-5h6v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10.5-1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 20a5.5 5.5 0 0 1 11 0M14 17.5a4.5 4.5 0 0 1 7.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
