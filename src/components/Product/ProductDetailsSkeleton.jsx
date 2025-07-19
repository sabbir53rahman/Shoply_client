import { Package, Star } from "lucide-react";

export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="h-4 w-48 bg-gray-300 rounded mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Skeleton */}
          <div>
            <div className="relative aspect-square bg-gray-300 rounded-lg shadow-lg" />
          </div>

          {/* Right: Details Skeleton */}
          <div className="space-y-6">
            {/* Product Title */}
            <div className="h-10 w-3/4 bg-gray-300 rounded-md" />

            {/* Rating & Category */}
            <div className="flex items-center gap-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <div className="h-6 w-24 bg-gray-300 rounded-full" />
            </div>

            {/* Price & Stock */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <div className="h-8 w-20 bg-gray-300 rounded-md" />
                <div className="h-5 w-12 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-300" />
              <div className="h-5 w-36 bg-gray-300 rounded-md" />
            </div>

            <div className="h-24 bg-gray-300 rounded-md" />

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <div className="h-5 w-20 bg-gray-300 rounded" />
              <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                <div className="h-8 w-8 bg-gray-300 rounded-md" />
                <div className="h-8 w-10 bg-gray-300 rounded-md" />
                <div className="h-8 w-8 bg-gray-300 rounded-md" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-gray-300 rounded-lg" />
              <div className="h-12 w-32 bg-gray-300 rounded-lg" />
              <div className="h-12 w-12 bg-gray-300 rounded-lg" />
            </div>

            {/* Delivery guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-200 rounded-lg"
                >
                  <div className="h-5 w-5 bg-gray-300 rounded" />
                  <div className="space-y-1 flex-1">
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                    <div className="h-3 w-16 bg-gray-300 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Product info card */}
            <div className="p-4 bg-gray-200 rounded-lg space-y-3 mt-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center gap-2"
                >
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                  <div className="h-4 w-32 bg-gray-300 rounded" />
                </div>
              ))}
            </div>

            {/* Review form */}
            <div className="mt-6 p-6 bg-gray-200 rounded-lg space-y-4">
              <div className="h-6 w-40 bg-gray-300 rounded" />
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <div className="h-24 bg-gray-300 rounded-lg" />
              <div className="h-12 w-32 bg-gray-300 rounded" />
            </div>

            {/* Reviews list */}
            <div className="mt-8 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                  </div>
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                  <div className="h-5 w-full bg-gray-300 rounded" />
                  <div className="h-5 w-5/6 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
