"use client";

import { TenantDetailPage } from "@/features/tenants/tenant-detail-page";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <TenantDetailPage id={id} />;
}
