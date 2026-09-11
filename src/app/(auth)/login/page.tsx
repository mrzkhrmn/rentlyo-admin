import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Rentlyo
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
            Platform Admin
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Yalnızca tanımlı platform yöneticileri giriş yapabilir.
          </p>
        </div>

        <div className="glass-panel rounded-xl border border-border/70 p-6 md:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
