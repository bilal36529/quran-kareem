import { Skeleton } from '@/components/ui/skeleton';

export default function QuranSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton 
          key={i} 
          className="h-[180px] rounded-lg bg-accent/5"
        />
      ))}
    </div>
  );
}