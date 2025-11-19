import { Skeleton } from "../ui/skeleton";

export function LoadingSkeleton() {
  return (
    // When creating loading skeletons use the css grid/ div container styles
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-115 w-full bg-gray-300 md:h-90 xl:h-108"
        />
      ))}
    </div>
  );
}
