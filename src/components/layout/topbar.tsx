"use client";

import { useAuth } from "@/features/auth/auth-provider";

export function Topbar({ title }: { title?: string }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/60 bg-surface-elevated px-6 backdrop-blur-xl">
      <div>
        {title ? (
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Platform yönetimi</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
          <p className="text-xs text-muted-foreground">Platform Admin</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-sm font-semibold text-primary">
          {user?.fullName?.charAt(0)?.toUpperCase() ?? "A"}
        </div>
      </div>
    </header>
  );
}
