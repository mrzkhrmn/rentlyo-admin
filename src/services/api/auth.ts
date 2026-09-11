import { apiRequest } from "@/services/api/client";
import type { PlatformAuthResponse } from "@/types/auth";

export function loginPlatform(email: string, password: string) {
  return apiRequest<PlatformAuthResponse>({
    method: "POST",
    url: "/api/platform/auth/login",
    data: { email, password },
  });
}
