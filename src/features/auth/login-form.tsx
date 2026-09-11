"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/auth-provider";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";
import { ApiError } from "@/services/api/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await login(values.email, values.password);
      router.replace("/");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Giriş yapılamadı. Bilgilerinizi kontrol edin.";
      setFormError(message);
    }
  });

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-r-transparent" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="E-posta"
        type="email"
        autoComplete="username"
        placeholder="admin@rentlyo.local"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Şifre"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      {formError ? (
        <div className="rounded-md border border-error/20 bg-error-soft px-3 py-2 text-sm text-error">
          {formError}
        </div>
      ) : null}

      <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
        Giriş yap
      </Button>
    </form>
  );
}
