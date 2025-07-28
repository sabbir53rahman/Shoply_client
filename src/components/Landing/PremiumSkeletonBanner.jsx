import { Skeleton } from "@/components/ui/skeleton";

const PremiumSkeletonBanner = () => {
  return (
    <div className="relative w-full h-screen min-h-[600px] max-h-[800px] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-purple-50/90 to-pink-50/95" />

      {/* Colorful floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-white/30 to-blue-300/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-purple-300/30 to-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-white/10 to-pink-300/15 rounded-full blur-3xl animate-pulse" />

        {/* Decorative dots */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/50 rounded-full animate-pulse" />
        <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-white/30 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 w-full h-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full py-12 lg:py-0">
          {/* Left side content skeleton */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Colorful badge skeleton */}
            <Skeleton className="h-12 w-32 rounded-full bg-gradient-to-r from-white/50 to-white/40" />

            {/* Title skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-14 w-full bg-gradient-to-r from-white/60 to-white/50 rounded-xl" />
              <Skeleton className="h-14 w-4/5 bg-gradient-to-r from-white/55 to-white/45 rounded-xl" />
            </div>

            {/* Category skeleton */}
            <Skeleton className="h-10 w-40 rounded-full bg-white/50" />

            {/* Description skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-full bg-white/40 rounded-lg" />
              <Skeleton className="h-6 w-3/4 bg-white/35 rounded-lg" />
              <Skeleton className="h-6 w-1/2 bg-white/35 rounded-lg" />
            </div>

            {/* Features skeleton */}
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-28 rounded-full bg-white/45" />
              <Skeleton className="h-10 w-24 rounded-full bg-white/40" />
              <Skeleton className="h-10 w-32 rounded-full bg-white/40" />
            </div>

            {/* Price and rating skeleton */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-baseline gap-3">
                <Skeleton className="h-12 w-24 bg-gradient-to-r from-white/60 to-white/50 rounded-xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-16 bg-white/35 rounded-lg" />
                  <Skeleton className="h-4 w-20 bg-white/30 rounded-lg" />
                </div>
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-10 w-36 rounded-full bg-gradient-to-r from-yellow-200/50 to-orange-200/50" />
                <Skeleton className="h-8 w-20 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Skeleton className="h-14 w-44 rounded-xl bg-gradient-to-r from-white/60 to-white/50" />
              <Skeleton className="h-14 w-32 rounded-xl bg-white/50" />
            </div>
          </div>

          {/* Right side image skeleton */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-40"></div>
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-white/50 overflow-hidden">
                <Skeleton className="w-full h-full bg-gradient-to-br from-white/50 to-white/40" />
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full -z-10 blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-white/50 to-blue-300/40 rounded-full -z-10 blur-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons skeleton */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <Skeleton className="w-16 h-16 rounded-full bg-white/60" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <Skeleton className="w-16 h-16 rounded-full bg-white/60" />
      </div>

      {/* Pagination skeleton */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        <Skeleton className="w-8 h-3 rounded-full bg-white/70" />
        <Skeleton className="w-3 h-3 rounded-full bg-white/50" />
        <Skeleton className="w-3 h-3 rounded-full bg-white/50" />
      </div>
    </div>
  );
};

export default PremiumSkeletonBanner;
