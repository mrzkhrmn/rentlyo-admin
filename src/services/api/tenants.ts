import { apiRequest } from "@/services/api/client";
import type { PaginatedResult } from "@/types/api";
import type { PlatformTenantDetail, PlatformTenantListItem } from "@/types/tenant";

export function listTenants(params: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return apiRequest<PaginatedResult<PlatformTenantListItem>>({
    method: "GET",
    url: "/api/platform/tenants",
    params,
  });
}

export function getTenant(id: string) {
  return apiRequest<PlatformTenantDetail>({
    method: "GET",
    url: `/api/platform/tenants/${id}`,
  });
}

export function suspendTenant(id: string) {
  return apiRequest<null>({
    method: "POST",
    url: `/api/platform/tenants/${id}/suspend`,
  });
}

export function activateTenant(id: string) {
  return apiRequest<null>({
    method: "POST",
    url: `/api/platform/tenants/${id}/activate`,
  });
}

export function setTenantWebsite(id: string, websiteEnabled: boolean) {
  return apiRequest<null>({
    method: "POST",
    url: `/api/platform/tenants/${id}/website`,
    data: { websiteEnabled },
  });
}
