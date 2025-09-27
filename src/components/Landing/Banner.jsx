"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import { useGetFeaturedProductsQuery } from "@/redux/features/productSlice/productSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import PremiumSkeletonBanner from "./PremiumSkeletonBanner";
import Link from "next/link";

const HeroBannerSlider = () => {
  const swiperRef = useRef(null);

  const {
    data: featuredProducts,
    isLoading,
    isError,
  } = useGetFeaturedProductsQuery();

  console.log(featuredProducts)

  if (isError) return <p>Failed to load featured products.</p>;
  if (isLoading)
    return (
      <div className="relative overflow-hidden">
        <PremiumSkeletonBanner />
      </div>
    );
  if (!featuredProducts || featuredProducts.length === 0)
    return <p>No featured products available.</p>;

  return (
    <div className="relative overflow-hidden">
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
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 6px;
          background: linear-gradient(135deg, #ffffff, #f0f9ff);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transform: scale(1.1);
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
      `}</style>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={false}
        pagination={{ clickable: true, dynamicBullets: false }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={800}
        className="hero-swiper"
      >
        {featuredProducts.map((product, idx) => {
          const colors = product.colors || {
<<<<<<< HEAD
            primary: "from-green-600 to-lime-500", // Fresh green gradient for main background
            secondary: "from-lime-400 to-yellow-300", // Bright and appetizing secondary gradient
            accent: "orange-500", // Warm and tasty accent for buttons/icons
            badge: "from-emerald-400 to-green-500", // Rich greens for badges (like "New", "Best Seller")
            text: "green-50", // Light text for contrast on dark greens
=======
            primary: "from-black to-emerald-0", // Background gradients
            secondary: "from-amber-0 to-yellow-0", // Accent gradients
            accent: "amber-0", // For buttons or icons
            badge: "from-emerald-0 to-lime-0", // For featured badges
            text: "green-30", // Light text for dark backgrounds
>>>>>>> tasin
          };

          const badge = product.badge || "Featured";
          const features = product.features || [];
          const originalPrice = product.originalPrice || null;

          return (
            <SwiperSlide key={product._id || idx}>
              <div className="relative w-full h-full flex items-center overflow-hidden">
                {/* Colorful gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br `}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br bg-black/15 opacity-95`}
                  />

                  {/* Floating colorful elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className={`absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-white/20 to-${colors.accent}/20 rounded-full blur-2xl animate-float`}
                    />
                    <div
                      className={`absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-${colors.accent}/30 to-white/10 rounded-full blur-xl animate-float`}
                      style={{ animationDelay: "1s" }}
                    />
                    <div
                      className={`absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-white/10 to-${colors.accent}/15 rounded-full blur-3xl animate-float`}
                      style={{ animationDelay: "2s" }}
                    />

                    {/* Decorative shapes */}
                    <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
                    <div
                      className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/40 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                    <div
                      className="absolute top-2/3 right-1/3 w-8 h-8 bg-white/20 rounded-full animate-pulse"
                      style={{ animationDelay: "2s" }}
                    />
                  </div>
                </div>

                <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 w-full">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full py-12 lg:py-0">
                    {/* Content Section */}
                    <div className="space-y-8 animate-fade-in-up order-2 lg:order-1">
                      <div className="flex items-center gap-[20px]">
                        {/* Colorful badge */}
                        <div
                          className={`inline-flex items-center gap-3 bg-gradient-to-r ${colors.badge} backdrop-blur-sm px-5 py-3 rounded-full colorful-shadow border border-white/30`}
                        >
                          <Leaf
                            className={`w-4 h-4 text-${colors.text} animate-pulse`}
                          />
                          <span
                            className={`text-${colors.text} font-semibold text-sm tracking-wide`}
                          >
                            {badge}
                          </span>
                        </div>

                        {/* Colorful category */}
                        <div
                          className={`inline-flex items-center gap-2 bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40`}
                        >
                          <div
                            className={`w-4 h-4 bg-${colors.accent} rounded-full animate-pulse`}
                          ></div>
                          <span className="capitalize text-gray-700 font-medium tracking-wide">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Colorful title */}
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                        <span
                          className={` `}
                        >
                          {product.name.split(" ")[0]}
                        </span>{" "}
                        <span className="text-gray-800">
                          {product.name.split(" ").slice(1).join(" ")}
                        </span>
                      </h1>

<<<<<<< HEAD
=======
                      {/* Colorful category */}
                      <div
                        className={`inline-flex items-center gap-2 bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40`}
                      >
                        <div
                          className={`w-2 h-2 bg-${colors.accent} rounded-full animate-pulse`}
                        ></div>
                        <span className="capitalize text-gray-700 font-medium tracking-wide">
                          {product.category}
                          {colors.accent}
                        </span>
                      </div>

>>>>>>> tasin
                      {/* Description */}
                      <p className="text-lg text-gray-700 max-w-lg leading-relaxed font-light">
                        {product.description}
                      </p>

                      {/* Colorful features */}
                      <div className="flex flex-wrap gap-3">
                        {features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-white/60 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium colorful-shadow border border-white/40 hover:scale-105 transition-transform duration-200"
                          >
                            ✨ {feature}
                          </span>
                        ))}
                      </div>

                      {/* Colorful pricing */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`text-4xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
                          >
                            ${product.price}
                          </span>
                          {originalPrice && (
                            <div className="flex flex-col">
                              <span className="text-lg text-gray-500 line-through font-light">
                                ${originalPrice}
                              </span>
                              <span
                                className={`text-sm text-${colors.text} font-semibold`}
                              >
                                Save ${originalPrice - product.price}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 backdrop-blur-sm px-4 py-2 rounded-full colorful-shadow border border-yellow-200">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold text-gray-700">
                              {product.rating}
                            </span>
                            <span className="text-sm text-gray-600">
                              ({product.numReviews})
                            </span>
                          </div>
                          <div className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-600 border border-white/40">
                            {product.sold} sold
                          </div>
                        </div>
                      </div>

                      {/* Colorful action buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href={`/products/${product._id}`}>
                          <Button
                            size="lg"
                            className={`bg-gradient-to-r ${colors.primary} hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 colorful-shadow hover:scale-105 group`}
                          >
                            <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                            Shop Now
                            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              →
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Colorful product display */}
                    <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-right">
                      <div className="relative group">
                        {/* Glowing Background Accent */}
                        <div className="absolute -inset-8 bg-gradient-to-r from-[#ffd90022] to-[#b8870b07] rounded-3xl blur-2xl opacity-20"></div>

                        {/* Main Product Card */}
                        <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.2)] transition-all duration-500 group-hover:scale-105">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover p-8 sm:p-12 rounded transition-transform duration-500 ease-out group-hover:scale-110"
                            priority={idx === 0}
                          />

                          {/* Decorative Dots */}
                          <div className="absolute top-4 right-4 w-3 h-3 bg-[#ffd90009] rounded-full animate-pulse"></div>
                          <div
                            className="absolute bottom-4 left-4 w-2 h-2 bg-[#b8870b0e] rounded-full animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>

                        {/* Accent Shadow Elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#ffd9000e] to-[#b8870b11] rounded-full -z-10 opacity-30 blur-xl"></div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-white/20 to-[#FFD700]/20 rounded-full -z-10 blur-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Arrows */}
      <button
        onClick={() => swiperRef.current?.swiper?.slidePrev()}
        className="absolute shadow-md left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 rounded-full p-4 colorful-shadow-md border border-white/60 transition-all duration-300 hover:scale-110 z-30 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      </button>

      <button
        onClick={() => swiperRef.current?.swiper?.slideNext()}
        className="absolute shadow-md right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 rounded-full p-4 colorful-shadow border border-white/60 transition-all duration-300 hover:scale-110 z-30 group"
      >
        <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default HeroBannerSlider;
