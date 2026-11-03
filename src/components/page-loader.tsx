import { Spinner } from "@/components/ui/spinner";

export function PageLoader({ label }: { label: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Spinner className="size-7 text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
