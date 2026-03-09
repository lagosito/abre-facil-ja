import { Skeleton } from "@/components/ui/skeleton";

interface SectionSkeletonProps {
  lines?: number;
  showHeader?: boolean;
  headerNum?: string;
  headerTitle?: string;
}

const SectionSkeleton = ({ lines = 4, showHeader = true, headerNum, headerTitle }: SectionSkeletonProps) => (
  <section className="mb-16 animate-fade-up">
    {showHeader && (
      <>
        <div className="flex items-baseline gap-4 mb-3">
          {headerNum ? (
            <span className="font-serif italic text-sm text-muted-foreground">{headerNum}</span>
          ) : (
            <Skeleton className="h-4 w-6" />
          )}
          {headerTitle ? (
            <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-foreground">{headerTitle}</span>
          ) : (
            <Skeleton className="h-4 w-40" />
          )}
        </div>
        <div className="h-px bg-border mb-2.5" />
        <Skeleton className="h-4 w-[60%] mb-7" />
      </>
    )}
    <div className="bg-card rounded-lg p-6 space-y-4">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: `${85 - i * 10}%` }}
        />
      ))}
    </div>
  </section>
);

export const CardSkeleton = () => (
  <div className="bg-card rounded-lg p-6 space-y-3 animate-pulse">
    <Skeleton className="h-3 w-24" />
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-[80%]" />
  </div>
);

export const CalendarSkeleton = () => (
  <div className="bg-card rounded-lg p-6 animate-pulse">
    <div className="flex justify-between mb-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-5 w-24 rounded-full" />
    </div>
    <div className="grid grid-cols-7 gap-[5px]">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={`h-${i}`} className="h-3 w-full" />
      ))}
      {Array.from({ length: 35 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-[6px]" />
      ))}
    </div>
  </div>
);

export default SectionSkeleton;
