"use client";

const ProductTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array(8)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse grid grid-cols-6 items-center gap-4 bg-white p-4 rounded shadow"
          >
            {/* Product Name */}
            <div className="col-span-1 h-4 bg-gray-200 rounded w-24" />

            {/* Category */}
            <div className="col-span-1 h-4 bg-gray-200 rounded w-20" />

            {/* Price */}
            <div className="col-span-1 h-4 bg-gray-200 rounded w-16" />

            {/* Stock */}
            <div className="col-span-1 h-4 bg-gray-200 rounded w-14" />

            {/* Button */}
            <div className="col-span-1 h-8 bg-gray-200 rounded w-32" />

            {/* Edit/Delete Icons */}
            <div className="col-span-1 flex gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductTableSkeleton;
