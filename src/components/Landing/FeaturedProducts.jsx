"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Slice } from "lucide-react";
import Image from "next/image";
import ProductCard from "../Product/ProductTem";
import { useGetFeaturedProductsQuery, useGetLeatestProductsQuery, useGetPaginatedProductsQuery } from "@/redux/features/productSlice/productSlice";
import { Skeleton } from "antd";
import rVegetable from "../../assets/rvegetable.png"
import healthyFood from "../../assets/healthy.png"


const FeaturedCollection = () => {
  const {data, isLoading } = useGetFeaturedProductsQuery()
  const {data : allProducts, isLoading : paginateLoadint } = useGetPaginatedProductsQuery(1)
  const {data : leatestProducts, isLoading : popularLoading } = useGetLeatestProductsQuery()

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/*Featured Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Discover our handpicked premium products
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-4 rounded-lg shadow bg-white">
                  <div className="w-full bg-gray-300 rounded-lg h-20 md:h-32 xl:h-44"></div>
                  <Skeleton active paragraph={{ rows: 4 }} />
                </div>
              ))
            : data?.slice(0, 5).map((product) => (
                <ProductCard key={product?._id} product={product} />
          ))}
        </div>

        {/*Popular Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Leatest Products
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Discover our handpicked premium products
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {leatestProducts?.slice(0,5).map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>

        {/* Promotional Banners */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Banner - Grocery Deals */}
          <div className="relative leftBanner rounded-3xl overflow-hidden p-10 hover:shadow-xl transition-shadow duration-300">
            <div className="relative z-10">
              <div className="inline-block bg-white/30 backdrop-blur-sm text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Up to 45% OFF
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Don&apos;t Miss Out on
                <br />
                <span className="text-purple-700">Tasty Grocery Deals!</span>
              </h3>

              <Button className="primary_button">
                View More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute right-0 bottom-0 w-72 h-72 opacity-20">
              
            </div>
          </div>

          {/* Right Banner - Fruit Juice */}
          <div className="relative rightBanner rounded-3xl overflow-hidden p-10 hover:shadow-xl transition-shadow duration-300">
            <div className="relative z-10">
              <div className="inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold mb-6">
                Flat 15% OFF
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="text-blue-700">Tasty Fruits Juice</span>
                <br />
                from Farm
              </h3>

              <Button className="secondary_button">
                Shop Now
                <ShoppingCart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute right-0 bottom-0 w-56 h-56 opacity-30">
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
