export function SkeletonText({ width = 'w-3/4', height = 'h-4' }: { width?: string; height?: string }) {
  return (
    <div className={`${width} ${height} bg-white/10 animate-pulse`} />
  );
}

export function SkeletonHeading({ level = 2 }: { level?: 1 | 2 | 3 }) {
  const heights = { 1: 'h-10', 2: 'h-8', 3: 'h-6' };
  return <SkeletonText height={heights[level]} width="w-1/2" />;
}

export function SkeletonParagraph({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonText
          key={i}
          width={i === lines - 1 ? 'w-4/5' : 'w-full'}
          height="h-4"
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="h-64 bg-white/10 animate-pulse" />
      <div className="p-6 space-y-4">
        <SkeletonHeading level={3} />
        <SkeletonParagraph lines={2} />
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-white/10 animate-pulse" />
          <div className="h-6 w-20 bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProjectGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
