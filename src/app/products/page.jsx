"use client";

export const dynamic = "force-dynamic";

import AllFilteredProducts from "@/components/Product/AllFilteredProducts";
// import Footer from "@/components/Footer/Footer";
// import Navbar from "@/components/Navbar/Navbar";
// import ProductCard from "@/components/Product/ProductTem";
// import {
//   useGetAllCategorysQuery,
//   useGetFilteredProductsQuery,
//   useGetPaginatedProductsQuery,
//   useGetProductsByCategoryQuery,
//   useGetProductsByPriceRangeQuery,
// } from "@/redux/features/productSlice/productSlice";
import { Suspense, useEffect, useState } from "react";
<<<<<<< HEAD
import { Skeleton, Select, Slider, Switch } from "antd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import {
  Leaf,
  Filter,
  Apple,
  Search,
  Beef,
  Milk,
  Grape,
  Croissant,
  X,
  ShoppingCart,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

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
const { Option } = Select;
=======
// import { Skeleton, Select, Slider, Switch } from "antd";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// const { Option } = Select;
// import { debounce } from "lodash";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// import {
//   Filter,
//   X,
//   ShoppingCart,
//   Search,
// } from "lucide-react";
// import {  useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
>>>>>>> tasin

const Page = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const [searchValue, setSearchValue] = useState("");
  // const [showFilters, setShowFilters] = useState(false);

  // const handleSearch = debounce((value) => {
  //   updateQueryParams({ key: "search", value });
  // }, 500); // 500ms debounce

  // useEffect(() => {
  //   handleSearch(searchValue);
  //   return () => {
  //     handleSearch.cancel();
  //   };
  // }, [searchValue, handleSearch]);

  // const clearSearch = () => {
  //   setSearchValue("");
  //   updateQueryParams({ key: "search", value: "" });
  // };

  // // Get params from URL
  // const category = searchParams.get("category");
  // const minPrice = searchParams.get("minPrice");
  // const maxPrice = searchParams.get("maxPrice");
  // const minRating = searchParams.get("minRating");
  // const stock = searchParams.get("stock");
  // const sortBy = searchParams.get("sortBy");
  // const sortOrder = searchParams.get("sortOrder");
  // const search = searchParams.get("search");
  // const page = searchParams.get("page") || 1;
  // const limit = searchParams.get("limit") || 10;

  // const updateQueryParams = ({ key, value }) => {
  //   const params = new URLSearchParams(searchParams);

  //   if (typeof value === "object" && value !== null) {
  //     Object.entries(value).forEach(([paramKey, paramValue]) => {
  //       if (paramValue !== null && paramValue !== undefined) {
  //         params.set(paramKey, paramValue);
  //       } else {
  //         params.delete(paramKey);
  //       }
  //     });
  //   } else if (value) {
  //     params.set(key, value);
  //     setShowFilters(false);
  //   } else {
  //     params.delete(key);
  //   }

  //   router.push(`?${params.toString()}`);
  // };

  // const filters = {
  //   category,
  //   minPrice,
  //   maxPrice,
  //   minRating,
  //   stock,
  //   sortBy,
  //   sortOrder,
  //   search,
  //   page,
  //   limit,
  // };
  // const { data: filteredProducts } = useGetFilteredProductsQuery(filters);
  // const { data: allCategory } = useGetAllCategorysQuery();

  // const totalPages = filteredProducts?.totalPages || 1;
  // const currentPage = filteredProducts?.page || 1;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <AllFilteredProducts />
    </Suspense>
  );
};

export default Page;
