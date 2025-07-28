"use client";
import { useCallback, useEffect, useState } from "react";
import { Skeleton, Select, Slider, Switch } from "antd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const { Option } = Select;
import { debounce } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Filter, X, ShoppingCart, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import ProductCard from "./ProductTem";
import Footer from "../Footer/Footer";
import {
  useGetAllCategorysQuery,
  useGetFilteredProductsQuery,
} from "@/redux/features/productSlice/productSlice";

const AllFilteredProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = debounce((value) => {
    updateQueryParams({ key: "search", value });
  }, 500); // 500ms debounce

  const clearSearch = () => {
    setSearchValue("");
    updateQueryParams({ key: "search", value: "" });
  };

  // Get params from URL
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minRating = searchParams.get("minRating");
  const stock = searchParams.get("stock");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const updateQueryParams = ({ key, value }) => {
    const params = new URLSearchParams(searchParams);

    if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([paramKey, paramValue]) => {
        if (paramValue !== null && paramValue !== undefined) {
          params.set(paramKey, paramValue);
        } else {
          params.delete(paramKey);
        }
      });
    } else if (value) {
      params.set(key, value);
      setShowFilters(false);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const debouncedChange = useCallback(
    debounce(([min, max]) => {
      updateQueryParams({
        key: "price",
        value: { minPrice: min, maxPrice: max },
      });
    }, 500), // 500ms delay
    [] // Empty dependency array so it's created once
  );

  const filters = {
    category,
    minPrice,
    maxPrice,
    minRating,
    stock,
    sortBy,
    sortOrder,
    search,
    page,
    limit,
  };
  const { data: filteredProducts, isLoading: isFilterLoading } =
    useGetFilteredProductsQuery(filters);
  const { data: allCategory, isLoading: isCategoryLoading } =
    useGetAllCategorysQuery();

  const totalPages = filteredProducts?.totalPages || 1;
  const currentPage = filteredProducts?.page || 1;

  useEffect(() => {
    handleSearch(searchValue);
    return () => {
      handleSearch.cancel();
    };
  }, [searchValue, handleSearch]);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 pb-12 pt-10 sm:px-6 lg:px-8">
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
        <div className="flex flex-wrap flex-col  items-center justify-between gap-5 mb-10">
          <div className="flex justify-between items-center w-full md:w-[85%]">
            <Swiper
              spaceBetween={12}
              slidesPerView="auto"
              className="mx-auto w-max"
            >
              <SwiperSlide className="mx-auto !w-auto">
                <Card
                  onClick={() => router.push("/products")}
                  className={`cursor-pointer  p-4 ${
                    searchParams.size === 0
                      ? `text-[#ffffff] bg-emerald-600/60`
                      : `text-[#453f3f] bg-emerald-600/40`
                  }  flex items-center gap-3 transition-transform  hover:scale-105 border-2 `}
                >
                  <ShoppingCart className="w-8 h-8 object-contain text-[#454343]" />
                  <span className="font-medium">All Products</span>
                </Card>
              </SwiperSlide>
              {allCategory?.map((cat) => (
                <SwiperSlide key={cat._id} className="mx-auto !w-auto">
                  <Card
                    onClick={() =>
                      updateQueryParams({
                        key: "category",
                        value: cat?.category.toLowerCase(),
                      })
                    }
                    style={{
                      backgroundColor:
                        cat?.category === category
                          ? `${cat?.color}90`
                          : `${cat?.color}23`,
                    }}
                    className={`cursor-pointer  p-4 lg:px-5 ${
                      cat.category === category
                        ? `text-[#ffffff] `
                        : `text-[#453f3f]`
                    }  flex items-center gap-3 transition-transform  hover:scale-105 border-2 `}
                  >
                    <Image
                      src={cat?.image}
                      height={120}
                      width={120}
                      alt={cat?.category}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-medium">{cat?.category}</span>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex w-full lg:w-[85%] items-center justify-between gap-4">
            <div className="flex w-full h-max max-w-lg border bg-[#3e849931] border-gray-300 rounded-lg overflow-hidden items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-grow px-4 py-2 focus:outline-none"
              />

              {searchValue && (
                <button
                  onClick={clearSearch}
                  className="px-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="bg-emerald-600 flex items-center justify-center px-3 py-2.5">
                <Search className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="w-ful">
              <p className="text-sm font-semibold">Price range.</p>
              <Slider
                // onChange={([min, max]) => {
                //   updateQueryParams({
                //     key: "price",
                //     value: { minPrice: min, maxPrice: max },
                //   });
                // }}
                onChange={debouncedChange}
                className="min-w-32 md:min-w-48 max-w-60"
                range
                max={1000}
                defaultValue={[20, 1000]}
              />
            </div>
            <div className="flex gap-3 mx-4 md:gap-8 items-center">
              <div className="mb- relative">
                <Button
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="flex items-center hover:scale-105 transition-transform gap-2 bg-emerald-600 text-white font-medium"
                >
                  <Filter size={18} />
                  <span className="hidden sm:flex">Filter</span>
                </Button>

                {showFilters && (
                  <div className="mt-4 p-2.5 border absolute z-30 top-10 right-10 rounded-lg shadow bg-emerald-200/80 backdrop-blur-sm flex flex-col gap-3 w-full sm:w-[200px]">
                    <X
                      className=""
                      onClick={() => setShowFilters((prev) => !prev)}
                    />

                    {/* Min Rating */}
                    <Select
                      placeholder="Minimum Rating"
                      onChange={(value) =>
                        updateQueryParams({ key: "minRating", value: value })
                      }
                      style={{ width: "100%" }}
                      allowClear
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Option key={rating} value={rating}>
                          {rating}+
                        </Option>
                      ))}
                    </Select>

                    {/* Availability */}
                    <Select
                      placeholder="Availability"
                      onChange={(value) =>
                        updateQueryParams({ key: "stock", value: value })
                      }
                      style={{ width: "100%" }}
                      allowClear
                    >
                      <Option value="inStock">In Stock</Option>
                      <Option value="outStock">Out of Stock</Option>
                    </Select>

                    {/* Sort By */}
                    <Select
                      placeholder="Sort By"
                      onChange={(value) =>
                        updateQueryParams({ key: "sortBy", value: value })
                      }
                      style={{ width: "100%" }}
                      allowClear
                    >
                      <Option value="priceHighToLow">Price hight to low</Option>
                      <Option value="priceLowToHigh">Price low to high</Option>
                      <Option value="newest">Newest</Option>
                      <Option value="popularity">Popularity</Option>
                      <Option value="featured">Featured Item</Option>
                    </Select>

                    {/* Sort Order */}
                    <Select
                      placeholder="Sort Order"
                      onChange={(value) =>
                        updateQueryParams({ key: "sortOrder", value: value })
                      }
                      style={{ width: "100%" }}
                      allowClear
                    >
                      <Option value="asc">Ascending</Option>
                      <Option value="desc">Descending</Option>
                    </Select>

                    {/* Reset Filters */}
                    <Button
                      onClick={() => router.push("/products")}
                      className="bg-emerald-400 text-white !mt-4 font-medium"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {isCategoryLoading || isFilterLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="p-4">
                <div className="w-full bg-gray-300 rounded-lg h-40"></div>
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : filteredProducts?.products.length > 0 ? (
            filteredProducts?.products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center pb-10 gap-3">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() =>
              updateQueryParams({ key: "page", value: currentPage - 1 })
            }
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => updateQueryParams({ key: "page", value: page })}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() =>
              updateQueryParams({ key: "page", value: currentPage + 1 })
            }
          >
            Next
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllFilteredProducts;
