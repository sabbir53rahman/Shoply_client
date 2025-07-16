"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProductCard from "@/components/Product/ProductTem";
import {
  useGetPaginatedProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByPriceRangeQuery,
} from "@/redux/features/productSlice/productSlice";
import { useState } from "react";
import { Skeleton } from "antd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Leaf, Apple, Beef, Milk, Grape, Croissant } from "lucide-react";

// ✅ category values that actually match your DB
const categories = [
  {
    name: "Vegetable",
    value: "vegetable",
    icon: Leaf,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Fruit",
    value: "fruit",
    icon: Apple,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: "Meat",
    value: "meat",
    icon: Beef,
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-50",
  },
  {
    name: "Dairy",
    value: "dairy",
    icon: Milk,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Juice",
    value: "juice",
    icon: Grape,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Bakery",
    value: "bakery",
    icon: Croissant,
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
  },
];

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [applyPrice, setApplyPrice] = useState(null);

  console.log("Selected category:", selectedCategory);

  // queries
  const { data: paginatedData = {}, isLoading: isPaginatedLoading } =
    useGetPaginatedProductsQuery(currentPage, {
      skip: selectedCategory || applyPrice,
    });

  const { data: categoryData = [], isLoading: isCategoryLoading } =
    useGetProductsByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  const { data: priceData = [], isLoading: isPriceLoading } =
    useGetProductsByPriceRangeQuery(
      { min: applyPrice?.min, max: applyPrice?.max },
      { skip: !applyPrice }
    );

  let productsToDisplay = [];
  if (selectedCategory) {
    productsToDisplay = categoryData;
  } else if (applyPrice) {
    productsToDisplay = priceData;
  } else {
    productsToDisplay = paginatedData?.products || [];
  }

  const totalPages = paginatedData?.totalPages || 1;
  const showPagination = !selectedCategory && !applyPrice;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Our Premium Shop
          </h2>
          <p className="text-gray-600 text-lg">
            Choose your favorite category or filter by your budget
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setApplyPrice(null);
                }}
                className={`cursor-pointer p-4 flex items-center gap-3 transition-transform hover:scale-105 border-2 ${
                  selectedCategory === cat.value
                    ? `border-transparent bg-gradient-to-r ${cat.color} text-white`
                    : `${cat.bgColor} border-gray-200`
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-medium">{cat.name}</span>
              </Card>
            );
          })}
          {(selectedCategory || applyPrice) && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory(null);
                setApplyPrice(null);
                setPriceRange({ min: "", max: "" });
              }}
            >
              Reset Filters
            </Button>
          )}
        </div>

        {/* Price Range */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Input
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="max-w-[150px]"
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="max-w-[150px]"
          />
          <Button
            onClick={() => {
              setApplyPrice({
                min: priceRange.min || 0,
                max: priceRange.max || 1000000,
              });
              setSelectedCategory(null);
            }}
          >
            Apply Price Filter
          </Button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {isPaginatedLoading || isCategoryLoading || isPriceLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="p-4">
                <div className="w-full bg-gray-300 rounded-lg h-40"></div>
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="flex justify-center items-center pb-10 gap-3">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </Button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
