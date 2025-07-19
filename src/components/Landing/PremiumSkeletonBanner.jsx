const PremiumSkeletonBanner = () => {
  return (
    <div className="relative w-full h-[700px] max-h-[800px] min-h-[600px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-3xl overflow-hidden">
      {/* Gradient overlay with pulse animation */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 opacity-70" />

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        {/* Left side: Text skeleton */}
        <div className="w-1/2 space-y-6">
          {/* Subtitle bar */}
          <div className="h-6 bg-gray-300 rounded-full w-32" />
          {/* Title bars */}
          <div className="h-12 bg-gray-300 rounded-xl w-3/4" />
          <div className="h-12 bg-gray-300 rounded-xl w-2/3" />
          {/* Description */}
          <div className="h-5 bg-gray-300 rounded-md w-full max-w-lg" />
          <div className="h-5 bg-gray-300 rounded-md w-full max-w-lg" />
          {/* Features badges */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-300 rounded-full w-20" />
            ))}
          </div>
          {/* Price & rating */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-20 bg-gray-300 rounded-lg" />
            <div className="h-8 w-24 bg-gray-300 rounded-full" />
          </div>
          {/* Button */}
          <div className="h-12 w-40 bg-gray-400 rounded-xl shadow-lg" />
        </div>

        {/* Right side: Image skeleton */}
        <div className="w-1/2 flex justify-center">
          <div className="h-[400px] w-[400px] rounded-3xl bg-gray-300 shadow-lg" />
        </div>
      </div>
    </div>
  );
};
export default PremiumSkeletonBanner;
