"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { Leaf, Apple, Beef, Milk, Grape, Croissant } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetAllCategorysQuery } from "@/redux/features/productSlice/productSlice";
import Image from "next/image";
import leaff from "../../assets/leaf (1).png";

const categories = [
  {
    name: "Vegetable",
    icon: Leaf,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    count: "250+ items",
  },
  {
    name: "Fruit",
    icon: Apple,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    count: "180+ items",
  },
  {
    name: "Meat",
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
    name: "Juice",
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

const CategorySection = () => {
  const { data: allCategory } = useGetAllCategorysQuery();

  return (
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
              480: { slidesPerView: 3, spaceBetween: 20 },
              640: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 5, spaceBetween: 24 },
              1024: { slidesPerView: 6, spaceBetween: 24 },
            }}
            className="categories-swiper !overflow-visible"
            style={{ overflow: "visible" }}
          >
            {allCategory?.map((category, index) => {
              return (
                <SwiperSlide key={index} className="!overflow-visible py-2">
                  <Link
                    href={`/products?category=${category?.category?.toLowerCase()}`}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:z-10 relative"
                  >
                    <div
                      style={{ backgroundColor: `${category?.color}23` }}
                      className={`${category?.bgColor}  rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200`}
                    >
                      <div
                        style={{ backgroundColor: `${category?.color}93` }}
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Image
                          src={category?.image}
                          className="w-6 h-6"
                          height={250}
                          width={250}
                          alt="cat"
                        />
                        {/* <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-black" /> */}
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base group-hover:text-gray-800 transition-colors">
                          {category.category}
                        </h4>
                        {/* <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                          {category?.count}
                        </p> */}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
