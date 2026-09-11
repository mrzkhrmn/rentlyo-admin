"use client";

import {
  activateTenant,
  getTenant,
  listTenants,
  setTenantWebsite,
  suspendTenant,
} from "@/services/api/tenants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const tenantKeys = {
  all: ["tenants"] as const,
  list: (params: { search?: string; page: number; pageSize: number }) =>
    [...tenantKeys.all, "list", params] as const,
  detail: (id: string) => [...tenantKeys.all, "detail", id] as const,
};

export function useTenants(params: {
  search?: string;
  page: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: tenantKeys.list(params),
    queryFn: () => listTenants(params),
  });
}

export function useTenant(id: string) {
  return useQuery({
    queryKey: tenantKeys.detail(id),
    queryFn: () => getTenant(id),
    enabled: Boolean(id),
  });
}

export function useSuspendTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => suspendTenant(id),
    onSuccess: (_data, id) => {
      void qc.invalidateQueries({ queryKey: tenantKeys.all });
      void qc.invalidateQueries({ queryKey: tenantKeys.detail(id) });
    },
  });
}

export function useActivateTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => activateTenant(id),
    onSuccess: (_data, id) => {
      void qc.invalidateQueries({ queryKey: tenantKeys.all });
      void qc.invalidateQueries({ queryKey: tenantKeys.detail(id) });
    },
  });
}

export function useSetTenantWebsite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, websiteEnabled }: { id: string; websiteEnabled: boolean }) =>
      setTenantWebsite(id, websiteEnabled),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: tenantKeys.all });
      void qc.invalidateQueries({ queryKey: tenantKeys.detail(vars.id) });
    },
  });
}
