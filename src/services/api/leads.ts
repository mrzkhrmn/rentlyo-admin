import { apiRequest } from "@/services/api/client";
import type { PaginatedResult } from "@/types/api";
import type { Lead } from "@/types/lead";

export function listLeads(params: { page?: number; pageSize?: number }) {
  return apiRequest<PaginatedResult<Lead>>({
    method: "GET",
    url: "/api/platform/leads",
    params,
  });
}

export function updateLeadStatus(id: string, status: string) {
  return apiRequest<Lead>({
    method: "PATCH",
    url: `/api/platform/leads/${id}`,
    data: { status },
  });
}
