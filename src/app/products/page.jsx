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
