"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/states";
import { LeadStatusBadge } from "@/components/ui/status-badges";
import { useLeads, useUpdateLeadStatus } from "@/hooks/use-leads";
import type { LeadStatus } from "@/types/lead";
import { formatDateTime } from "@/utils/format";
import { useState } from "react";

const PAGE_SIZE = 20;
const STATUSES: LeadStatus[] = ["New", "Contacted", "Closed"];

export function LeadsPage() {
  const [page, setPage] = useState(1);
  const query = useLeads({ page, pageSize: PAGE_SIZE });
  const updateStatus = useUpdateLeadStatus();

  const items = query.data?.items ?? [];
  const totalCount = query.data?.totalCount ?? 0;

  return (
    <div>
      <PageHeader
        title="Leadler"
        description="Satış taleplerini görüntüleyin ve durumlarını güncelleyin."
      />

      {query.isLoading ? (
        <LoadingState label="Leadler yükleniyor…" />
      ) : query.isError ? (
        <ErrorState
          description={(query.error as Error)?.message}
          onRetry={() => void query.refetch()}
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Henüz lead yok"
          description="Public formdan gelen talepler burada listelenir."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border/70 bg-surface shadow-soft animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Kişi</th>
                  <th className="px-4 py-3 font-medium">Şirket</th>
                  <th className="px-4 py-3 font-medium">İletişim</th>
                  <th className="px-4 py-3 font-medium">Website</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {items.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-border/60 align-top transition hover:bg-accent-soft/30"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{lead.name}</p>
                      {lead.message ? (
                        <p className="mt-1 line-clamp-2 max-w-xs text-xs text-muted-foreground">
                          {lead.message}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">{lead.company}</td>
                    <td className="px-4 py-3">
                      <p>{lead.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.phone ?? "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {lead.wantsWebsite ? "İstiyor" : "Hayır"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        <LeadStatusBadge status={lead.status} />
                        <select
                          className="h-9 rounded-md border border-border bg-surface px-2 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          value={lead.status}
                          disabled={updateStatus.isPending}
                          onChange={(e) =>
                            updateStatus.mutate({
                              id: lead.id,
                              status: e.target.value,
                            })
                          }
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDateTime(lead.createdAt)}
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
