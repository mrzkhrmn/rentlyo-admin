import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/config/env";
import type { ApiResponse } from "@/types/api";
import { clearSession, getAccessToken } from "@/utils/auth-storage";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearSession();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.request<ApiResponse<T>>(config);
    const payload = response.data;

    if (!payload?.isSuccess) {
      throw new ApiError(payload?.message ?? "İstek başarısız oldu", response.status);
    }

    return payload.data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Beklenmeyen bir hata oluştu";
    const status = axiosError.response?.status ?? 500;
    throw new ApiError(message, status);
  }
}
