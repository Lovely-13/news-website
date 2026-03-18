export function SourceCardSkeleton() {
  return (
    <div className="flex flex-col justify-between p-5 bg-card rounded-xl shadow-card animate-pulse">
      <div>
        <div className="h-5 bg-muted rounded w-2/3 mb-3" />
        <div className="h-4 bg-muted rounded w-full mb-1.5" />
        <div className="h-4 bg-muted rounded w-4/5 mb-3" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 bg-muted rounded-lg w-16" />
        <div className="h-5 bg-muted rounded w-6" />
        <div className="h-5 bg-muted rounded w-6" />
      </div>
    </div>
  );
}
