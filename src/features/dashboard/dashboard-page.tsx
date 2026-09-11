"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorState, LoadingState } from "@/components/ui/states";
import { useLeads } from "@/hooks/use-leads";
import { useTenants } from "@/hooks/use-tenants";
import Link from "next/link";

export function DashboardPage() {
  const tenants = useTenants({ page: 1, pageSize: 100 });
  const leads = useLeads({ page: 1, pageSize: 100 });

  const loading = tenants.isLoading || leads.isLoading;
  const error = tenants.isError || leads.isError;

  if (loading) return <LoadingState label="Özet yükleniyor…" />;
  if (error) {
    return (
      <ErrorState
        description="Dashboard verileri alınamadı"
        onRetry={() => {
          void tenants.refetch();
          void leads.refetch();
        }}
      />
    );
  }

  const tenantItems = tenants.data?.items ?? [];
  const leadItems = leads.data?.items ?? [];

  const activeTenants = tenantItems.filter((t) =>
    t.status.toLowerCase().includes("active"),
  ).length;
  const suspendedTenants = tenantItems.filter((t) =>
    t.status.toLowerCase().includes("suspend"),
  ).length;
  const websiteEnabled = tenantItems.filter((t) => t.websiteEnabled).length;
  const newLeads = leadItems.filter(
    (l) => l.status.toLowerCase() === "new",
  ).length;

  const stats = [
    {
      label: "Toplam şirket",
      value: tenants.data?.totalCount ?? tenantItems.length,
      hint: "Kayıtlı tenant",
      href: "/tenants",
    },
    {
      label: "Aktif",
      value: activeTenants,
      hint: "Aktif şirketler",
      href: "/tenants",
    },
    {
      label: "Askıda",
      value: suspendedTenants,
      hint: "Askıya alınanlar",
      href: "/tenants",
    },
    {
      label: "Yeni lead",
      value: newLeads,
      hint: `${leads.data?.totalCount ?? leadItems.length} toplam lead`,
      href: "/leads",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Platform genelindeki şirket ve lead durumuna hızlı bakış."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group animate-slide-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <Card className="h-full transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-elevated">
              <CardContent className="relative overflow-hidden py-5">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-soft" />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="animate-slide-up" style={{ animationDelay: "120ms" }}>
          <CardContent className="py-5">
            <h2 className="font-display text-lg font-semibold">Website açık</h2>
            <p className="mt-2 text-3xl font-semibold text-primary">
              {websiteEnabled}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Public website bayrağı açık olan şirket sayısı
            </p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "180ms" }}>
          <CardContent className="py-5">
            <h2 className="font-display text-lg font-semibold">Son leadler</h2>
            <ul className="mt-3 space-y-2">
              {leadItems.slice(0, 5).map((lead) => (
                <li
                  key={lead.id}
                  className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-sm"
                >
                  <span className="font-medium">{lead.company}</span>
                  <span className="text-muted-foreground">{lead.status}</span>
                </li>
              ))}
              {leadItems.length === 0 ? (
                <li className="text-sm text-muted-foreground">Henüz lead yok</li>
              ) : null}
            </ul>
            <Link
              href="/leads"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              Tüm leadler →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
