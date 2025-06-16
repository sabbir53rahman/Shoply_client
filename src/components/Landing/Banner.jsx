"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Apple,
  Beef,
  Milk,
  Grape,
  Croissant,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    subtitle: "Premium Quality • Vitamin Rich",
    title: "100% Natural & Organic Fruit Juice",
    description:
      "Experience the pure taste of nature with our handpicked organic fruits, packed with essential vitamins and minerals for your healthy lifestyle.",
    buttonText: "Shop Now",
    price: "$24.99",
    originalPrice: "$39.99",
    discount: "65% OFF",
    rating: 4.8,
    reviews: 2847,
    bgGradient: "from-cyan-400 via-blue-500 to-purple-600",
    bgOverlay: "from-cyan-50/90 via-blue-50/80 to-purple-50/90",
    image: "/images/juice-banner.png",
    features: ["100% Organic", "No Preservatives", "Rich in Vitamins"],
  },
  {
    id: 2,
    subtitle: "Farm Fresh • Daily Harvest",
    title: "Organic Vegetables & Fresh Produce",
    description:
      "Straight from our certified organic farms to your table. Fresh, nutritious, and sustainably grown vegetables for your family's health.",
    buttonText: "Order Fresh",
    price: "$18.99",
    originalPrice: "$29.99",
    discount: "40% OFF",
    rating: 4.9,
    reviews: 1923,
    bgGradient: "from-green-400 via-emerald-500 to-teal-600",
    bgOverlay: "from-green-50/90 via-emerald-50/80 to-teal-50/90",
    image: "/placeholder.svg?height=400&width=500",
    features: ["Pesticide Free", "Same Day Delivery", "Farm Fresh"],
  },
  {
    id: 3,
    subtitle: "Artisan Crafted • Daily Baked",
    title: "Freshly Baked Artisan Breads",
    description:
      "Handcrafted with love using traditional methods and premium ingredients. Taste the difference of authentic artisan baking.",
    buttonText: "Taste Now",
    price: "$12.99",
    originalPrice: "$19.99",
    discount: "35% OFF",
    rating: 4.7,
    reviews: 3156,
    bgGradient: "from-orange-400 via-amber-500 to-yellow-600",
    bgOverlay: "from-orange-50/90 via-amber-50/80 to-yellow-50/90",
    image: "/placeholder.svg?height=400&width=500",
    features: ["Handmade Daily", "Premium Ingredients", "Traditional Recipe"],
  },
];

const categories = [
  {
    name: "Vegetables",
    icon: Leaf,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    count: "250+ items",
  },
  {
    name: "Fruits",
    icon: Apple,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    count: "180+ items",
  },
  {
    name: "Meats",
    icon: Beef,
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-50",
    count: "120+ items",
  },
  {
    name: "Dairy",
    icon: Milk,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    count: "95+ items",
  },
  {
    name: "Juices",
    icon: Grape,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    count: "75+ items",
  },
  {
    name: "Bakery",
    icon: Croissant,
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    count: "140+ items",
  },
];

const HeroBannerSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative overflow-hidden">
      {/* Custom Swiper Styles */}
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
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Dynamic Background - Full Height */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${slide.bgOverlay}`}
                />

                {/* Floating Decorative Elements */}
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

              {/* Slide Content - Centered */}
              <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-8 lg:py-0">
                  {/* Left Content */}
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in-up order-2 lg:order-1">
                    {/* Subtitle Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                      <span className="hidden sm:inline">{slide.subtitle}</span>
                      <span className="sm:hidden">Premium Quality</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 max-w-lg leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {slide.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="bg-white/30 backdrop-blur-sm border border-white/40 text-gray-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price and Rating */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                          {slide.price}
                        </span>
                        <span className="text-sm sm:text-base lg:text-lg text-gray-500 line-through">
                          {slide.originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                        <span className="text-xs sm:text-sm font-medium text-gray-800">
                          {slide.rating}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600">
                          ({slide.reviews.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        size="lg"
                        className="bg-gray-900 hover:bg-gray-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl group w-full sm:w-auto"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                        {slide.buttonText}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl group w-full sm:w-auto"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">
                          Add to Wishlist
                        </span>
                        <span className="sm:hidden">Wishlist</span>
                      </Button>
                    </div>
                  </div>

                  {/* Right Content - Product Showcase */}
                  <div className="relative flex justify-center lg:justify-end animate-fade-in-right order-1 lg:order-2">
                    <div className="relative">
                      {/* Discount Badge */}
                      <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-20">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center transform rotate-12 shadow-2xl animate-pulse">
                            <div className="text-center">
                              <div className="text-xs font-bold">SAVE</div>
                              <div className="text-sm sm:text-base lg:text-lg font-bold">
                                {slide.discount}
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 blur-lg opacity-50 animate-ping" />
                        </div>
                      </div>

                      {/* Product Image Container */}
                      <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl scale-110" />

                        {/* Main Product Image */}
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                          <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            fill
                            className="object-contain p-4 sm:p-6 lg:p-8 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            priority={index === 0}
                          />
                        </div>

                        {/* Floating Info Cards - Hidden on mobile */}
                        <div
                          className="hidden sm:block absolute -left-4 top-1/4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/50 animate-bounce"
                          style={{ animationDelay: "1s" }}
                        >
                          <div className="text-xs text-gray-600">
                            Customer Rating
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-sm font-bold">
                              {slide.rating}
                            </span>
                          </div>
                        </div>

                        <div
                          className="hidden sm:block absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/50 animate-bounce"
                          style={{ animationDelay: "2s" }}
                        >
                          <div className="text-xs text-gray-600">
                            Happy Customers
                          </div>
                          <div className="text-sm font-bold text-green-600">
                            {slide.reviews.toLocaleString()}+
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Centered on slider */}
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

      {/* Enhanced Categories Section */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-white/20 py-8 sm:py-12 overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Shop by Category
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Discover our wide range of premium products
            </p>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                480: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 24,
                },
              }}
              className="categories-swiper !overflow-visible"
              style={{ overflow: "visible" }}
            >
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <SwiperSlide key={index} className="!overflow-visible py-2">
                    <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:z-10 relative">
                      <div
                        className={`${category.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200`}
                      >
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${category.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base group-hover:text-gray-800 transition-colors">
                            {category.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                            {category.count}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.2s both;
        }

        .categories-swiper {
          overflow: visible !important;
          padding: 8px 0;
        }

        .categories-swiper .swiper-wrapper {
          overflow: visible !important;
        }

        .categories-swiper .swiper-slide {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
};

export default HeroBannerSlider;
