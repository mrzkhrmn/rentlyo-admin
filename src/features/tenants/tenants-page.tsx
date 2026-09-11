"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/states";
import { TenantStatusBadge } from "@/components/ui/status-badges";
import { useTenants } from "@/hooks/use-tenants";
import { formatDate } from "@/utils/format";
import Link from "next/link";
import { useEffect, useState } from "react";

const PAGE_SIZE = 20;

export function TenantsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const query = useTenants({
    search: debouncedSearch || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  const items = query.data?.items ?? [];
  const totalCount = query.data?.totalCount ?? 0;

  return (
    <div>
      <PageHeader
        title="Şirketler"
        description="Platform üzerindeki tüm tenant şirketlerini yönetin."
      />
      <Card className="mb-4">
        <CardContent className="py-4">
          <Input
            placeholder="İsim veya slug ara…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {query.isLoading ? (
        <LoadingState label="Şirketler yükleniyor…" />
      ) : query.isError ? (
        <ErrorState
          description={(query.error as Error)?.message}
          onRetry={() => void query.refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Şirket bulunamadı"
          description="Aramanızla eşleşen tenant yok veya henüz kayıt oluşmamış."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border/70 bg-surface shadow-soft animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Şirket</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Website</th>
                  <th className="px-4 py-3 font-medium">Kayıt</th>
                </tr>
              </thead>
              <tbody>
                {items.map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="border-t border-border/60 transition hover:bg-accent-soft/40"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/tenants/${tenant.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {tenant.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">/{tenant.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <TenantStatusBadge status={tenant.status} />
                    </td>
                    <td className="px-4 py-3">
                      <p>{tenant.planName}</p>
                      <p className="text-xs text-muted-foreground">
                        {tenant.subscriptionStatus ?? "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {tenant.websiteEnabled ? "Açık" : "Kapalı"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(tenant.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border/60 px-4 py-3">
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              totalCount={totalCount}
              onPageChange={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
