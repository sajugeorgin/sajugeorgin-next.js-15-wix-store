import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-20">
        {/* IMAGE SKELETON */}
        <div className="w-full md:basis-2/5">
          <Skeleton className="aspect-square w-full animate-pulse rounded bg-gray-200 md:sticky md:top-5" />
        </div>

        {/* MAIN PRODUCT INFORMATION SKELETON */}
        <div className="flex w-full flex-col gap-4 md:basis-3/5">
          {/* NAME */}
          <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200 lg:h-9" />

          {/* BRAND, RIBBON AND PRICE */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-14 w-32 animate-pulse rounded bg-gray-200 p-3" />
          </div>

          {/* DESCRIPTION */}
          <div className="prose prose-sm my-3 max-w-none space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          </div>

          {/* PRODUCT OPTIONS */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="h-10 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
          </div>

          {/* BUTTONS */}
          <div className="mt-4 flex w-full flex-col gap-3">
            <div className="h-10 w-full animate-pulse rounded-none bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded-none bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
