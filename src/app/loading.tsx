import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4 md:p-8 space-y-8">
      <Skeleton className="h-12 w-1/2 rounded-md" />
      <Skeleton className="h-64 w-full max-w-3xl rounded-lg" />
      <div className="space-y-4 w-full max-w-3xl">
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-5/6 rounded-md" />
      </div>
      <Skeleton className="h-10 w-40 rounded-md" />
    </div>
  );
}