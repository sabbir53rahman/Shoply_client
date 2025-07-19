"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useGetFeaturedProductsQuery } from "@/redux/features/productSlice/productSlice";
import PremiumSkeletonBanner from "./PremiumSkeletonBanner";

const HeroBannerSlider = () => {
  const swiperRef = useRef(null);

  // Fetch featured products from your API
  const {
    data: featuredProducts,
    isLoading,
    isError,
  } = useGetFeaturedProductsQuery();

  if (isError) return <p>Failed to load featured products.</p>;

  // Show skeleton while loading
  if (isLoading)
    return (
      <div className="relative overflow-hidden">
        <PremiumSkeletonBanner />
      </div>
    );

  // Fallback if no featured products
  if (!featuredProducts || featuredProducts.length === 0)
    return <p>No featured products available.</p>;

  return (
    <div className="relative overflow-hidden">
      {/* Swiper styles (same as before) */}
      <style jsx global>{`
        .hero-swiper {
          height: 100vh;
          min-height: 600px;
          max-height: 800px;
        }
        .hero-swiper .swiper-slide {
          height: 100vh;
          min-height: 600px;
          max-height: 800px;
        }
        .hero-swiper .swiper-pagination {
          bottom: 2rem !important;
          z-index: 20;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 6px;
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          display: none;
        }
        @media (max-width: 768px) {
          .hero-swiper,
          .hero-swiper .swiper-slide {
            height: 100vh;
            min-height: 500px;
            max-height: 700px;
          }
        }
        @media (max-width: 480px) {
          .hero-swiper,
          .hero-swiper .swiper-slide {
            height: 100vh;
            min-height: 450px;
            max-height: 600px;
          }
        }
      `}</style>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        navigation={false}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={800}
        className="hero-swiper"
      >
        {featuredProducts.map((product, index) => (
          <SwiperSlide key={product._id || index}>
            <div className="relative w-full h-full flex items-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/90 via-blue-50/80 to-purple-50/90" />
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 left-10 w-20 h-20 md:w-32 md:h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
                  <div
                    className="absolute top-40 right-20 w-16 h-16 md:w-24 md:h-24 bg-white/15 rounded-full blur-lg animate-bounce"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute bottom-32 left-1/4 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-full blur-2xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                  />
                  <div
                    className="absolute top-1/3 right-1/3 w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full blur-md animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>

              <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-8 lg:py-0">
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in-up order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                      <span>{product.subtitle || "Featured Product"}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                      {product.title || product.name}
                    </h1>

                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 max-w-lg leading-relaxed">
                      {product.description || product.shortDescription || ""}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {product.features?.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-white/30 backdrop-blur-sm border border-white/40 text-gray-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm sm:text-base lg:text-lg text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                        <span className="text-xs sm:text-sm font-medium text-gray-800">
                          {product.rating || "N/A"}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600">
                          ({(product.reviews || 0).toLocaleString()})
                        </span>
                      </div>
                    </div>

                    {/* Shop Now button links to product page */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Link href={`/products/${product._id}`} passHref>
                        <Button
                          size="lg"
                          className="bg-gray-900 hover:bg-gray-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl group w-full sm:w-auto cursor-pointer"
                          as="a"
                        >
                          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="relative flex justify-center lg:justify-end animate-fade-in-right order-1 lg:order-2">
                    <div className="relative">
                      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                        <Image
                          src={product.image || product.images?.[0]}
                          alt={product.title || product.name}
                          fill
                          className="object-contain p-4 sm:p-6 lg:p-8 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.swiper?.slidePrev()}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-gray-800 rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-30 group"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={() => swiperRef.current?.swiper?.slideNext()}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-gray-800 rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-30 group"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

export default HeroBannerSlider;
