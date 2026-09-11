"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ErrorState, LoadingState } from "@/components/ui/states";
import { TenantStatusBadge } from "@/components/ui/status-badges";
import {
  useActivateTenant,
  useSetTenantWebsite,
  useSuspendTenant,
  useTenant,
} from "@/hooks/use-tenants";
import { formatDate } from "@/utils/format";
import type { ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";

export function TenantDetailPage({ id }: { id: string }) {
  const query = useTenant(id);
  const suspend = useSuspendTenant();
  const activate = useActivateTenant();
  const setWebsite = useSetTenantWebsite();
  const [confirmSuspend, setConfirmSuspend] = useState(false);

  if (query.isLoading) return <LoadingState label="Şirket detayı yükleniyor…" />;
  if (query.isError || !query.data) {
    return (
      <ErrorState
        description={(query.error as Error)?.message ?? "Şirket bulunamadı"}
        onRetry={() => void query.refetch()}
      />
    );
  }

  const tenant = query.data;
  const isSuspended = tenant.status.toLowerCase().includes("suspend");

  return (
    <div className="animate-slide-up">
      <PageHeader
        title={tenant.name}
        description={`/${tenant.slug}`}
        actions={
          <Link
            href="/tenants"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Listeye dön
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-display text-lg font-semibold">Genel bilgi</h2>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Info label="Durum">
              <TenantStatusBadge status={tenant.status} />
            </Info>
            <Info label="Plan">{tenant.planName}</Info>
            <Info label="Abonelik">{tenant.subscriptionStatus ?? "—"}</Info>
            <Info label="Website">{tenant.websiteEnabled ? "Açık" : "Kapalı"}</Info>
            <Info label="E-posta">{tenant.email ?? "—"}</Info>
            <Info label="Telefon">{tenant.phone ?? "—"}</Info>
            <Info label="Adres" className="sm:col-span-2">
              {tenant.address ?? "—"}
            </Info>
            <Info label="Kayıt tarihi">{formatDate(tenant.createdAt)}</Info>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h2 className="font-display text-lg font-semibold">Metrikler</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Metric label="Araç" value={tenant.vehicleCount} />
              <Metric label="Rezervasyon" value={tenant.reservationCount} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-display text-lg font-semibold">İşlemler</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {isSuspended ? (
                <Button
                  loading={activate.isPending}
                  onClick={() => activate.mutate(tenant.id)}
                >
                  Aktifleştir
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={() => setConfirmSuspend(true)}
                >
                  Askıya al
                </Button>
              )}
              <Button
                variant="outline"
                loading={setWebsite.isPending}
                onClick={() =>
                  setWebsite.mutate({
                    id: tenant.id,
                    websiteEnabled: !tenant.websiteEnabled,
                  })
                }
              >
                Website’i {tenant.websiteEnabled ? "kapat" : "aç"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmSuspend}
        title="Şirketi askıya al"
        description={`${tenant.name} askıya alınacak. Tenant kullanıcıları erişim kaybedebilir.`}
        confirmLabel="Askıya al"
        tone="danger"
        loading={suspend.isPending}
        onClose={() => setConfirmSuspend(false)}
        onConfirm={() => {
          suspend.mutate(tenant.id, {
            onSuccess: () => setConfirmSuspend(false),
          });
        }}
      />
    </div>
  );
}

function Info({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 text-sm text-foreground">{children}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-accent-soft/50 px-3 py-3">
      <p className="text-2xl font-semibold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
