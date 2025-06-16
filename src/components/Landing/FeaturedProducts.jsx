"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import ProductCard from "../Product/ProductTem";

const featuredProducts = [
  {
    id: 1,
    name: "Cucumber 500 G (Approx. 200 G - 2500 G)",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    reviews: 1,
    originalPrice: 15.0,
    salePrice: 8.0,
    discount: 47,
    badge: "Sale",
    available: true,
  },
  {
    id: 2,
    name: "Potato Per Kg (Approx. 950 G - 1000 G)",
    image: "/placeholder.svg?height=200&width=200",
    rating: 0,
    reviews: 0,
    price: 12.0,
    available: true,
  },
  {
    id: 3,
    name: "Amaranthus 1 Bunch (Approx 160 G - 1500 G)",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    reviews: 2,
    price: 15.0,
    available: true,
  },
  {
    id: 4,
    name: "Milky Mist Mango Fruit Yogurt 100 G (Cup)",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    reviews: 3,
    price: 15.0,
    badge: "Sold out",
    available: false,
  },
  {
    id: 5,
    name: "Heinz Baby Puree With Peach, Mango, Banana",
    image: "/placeholder.svg?height=200&width=200",
    rating: 0,
    reviews: 0,
    price: 20.0,
    badge: "100% NATURAL",
    available: true,
  },
];

const FeaturedCollection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Promotional Banners */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Banner - Grocery Deals */}
          <div className="relative bg-gradient-to-br from-purple-200 via-purple-100 to-blue-100 rounded-3xl overflow-hidden p-10 hover:shadow-xl transition-shadow duration-300">
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
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Grocery basket"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Banner - Fruit Juice */}
          <div className="relative bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 rounded-3xl overflow-hidden p-10 hover:shadow-xl transition-shadow duration-300">
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
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Orange juice"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
