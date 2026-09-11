"use client";

import { listLeads, updateLeadStatus } from "@/services/api/leads";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const leadKeys = {
  all: ["leads"] as const,
  list: (params: { page: number; pageSize: number }) =>
    [...leadKeys.all, "list", params] as const,
};

export function useLeads(params: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: leadKeys.list(params),
    queryFn: () => listLeads(params),
  });
}

export function useUpdateLeadStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateLeadStatus(id, status),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: leadKeys.all });
    },
  });
}
