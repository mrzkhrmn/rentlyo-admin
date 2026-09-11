import { Badge } from "@/components/ui/badge";

export function tenantStatusTone(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("active") || normalized === "aktif") return "success" as const;
  if (normalized.includes("suspend") || normalized.includes("askı")) return "error" as const;
  if (normalized.includes("trial")) return "info" as const;
  return "neutral" as const;
}

export function TenantStatusBadge({ status }: { status: string }) {
  return <Badge tone={tenantStatusTone(status)}>{status}</Badge>;
}

export function leadStatusTone(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "new") return "info" as const;
  if (normalized === "contacted") return "warning" as const;
  if (normalized === "closed") return "success" as const;
  return "neutral" as const;
}

export function LeadStatusBadge({ status }: { status: string }) {
  return <Badge tone={leadStatusTone(status)}>{status}</Badge>;
}
