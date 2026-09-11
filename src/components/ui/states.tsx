import { cn } from "@/utils/cn";

export function LoadingState({ label = "Yükleniyor…" }: { label?: string }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-muted-foreground animate-fade-in">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-r-transparent" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 px-6 py-10 text-center animate-fade-in",
        className,
      )}
    >
      <p className="font-medium text-foreground">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function ErrorState({
  title = "Bir şeyler ters gitti",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-error/20 bg-error-soft/50 px-6 py-10 text-center animate-fade-in">
      <p className="font-medium text-error">{title}</p>
      {description ? <p className="text-sm text-error/80">{description}</p> : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          Tekrar dene
        </button>
      ) : null}
    </div>
  );
}
