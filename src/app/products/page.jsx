"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProductCard from "@/components/Product/ProductTem";
import {
  useGetAllCategorysQuery,
  useGetFilteredProductsQuery,
  useGetPaginatedProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByPriceRangeQuery,
} from "@/redux/features/productSlice/productSlice";
import { useEffect, useState } from "react";
import { Skeleton, Select, Slider, Switch } from "antd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const { Option } = Select;
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

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = debounce((value) => {
    updateQueryParams({ key: "search", value });
  }, 500); // 500ms debounce

  useEffect(() => {
    handleSearch(searchValue);
    return () => {
      handleSearch.cancel();
    };
  }, [searchValue]);

  const clearSearch = () => {
    setSearchValue("");
    updateQueryParams({ key: "search", value: "" });
  };

  // Get params from URL
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minRating = searchParams.get("minRating");
  const availability = searchParams.get("availability");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const updateQueryParams = ({ key, value }) => {
    console.log("key:", key, "value:", value);
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
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const filters = {
    category,
    minPrice,
    maxPrice,
    minRating,
    availability,
    sortBy,
    sortOrder,
    search,
    page,
    limit,
  };
  const { data: filteredProducts } = useGetFilteredProductsQuery(filters);
  console.log(filteredProducts);

  const { data: allCategory } = useGetAllCategorysQuery();

  const { data: categoryData = [], isLoading: isCategoryLoading } =
    useGetProductsByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  const totalPages = filteredProducts?.totalPages || 1;
  const currentPage = filteredProducts?.page || 1;

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
        <div className="flex flex-wrap flex-col  items-center justify- gap-4 mb-10">
          <div className="flex justify-between items-center w-full md:w-[80%]">
            <Swiper
              spaceBetween={12}
              slidesPerView="auto"
              className="justify-start w-full"
            >
              {categories?.map((cat) => (
                <SwiperSlide key={cat.name} className=" !w-auto">
                  <Card
                    onClick={() =>
                      updateQueryParams({
                        key: "category",
                        value: cat?.name.toLowerCase(),
                      })
                    }
                    className={`cursor-pointer p-4 flex items-center gap-3 transition-transform hover:scale-105 border-2 ${
                      selectedCategory === cat.value
                        ? `border-transparent bg-gradient-to-r ${cat?.color} text-white`
                        : `${cat.bgColor} border-gray-200`
                    }`}
                  >
                    <Image
                      src={cat?.image}
                      height={40}
                      width={50}
                      alt={cat?.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-medium">{cat?.name}</span>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex gap-3 md:gap-8 items-center">
              <div className="mb- relative">
                <Button
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="flex items-center gap-2 bg-emerald-600 text-white font-medium"
                >
                  <Filter size={18} />
                  <span className="hidden sm:flex">Filter</span>
                </Button>

                {showFilters && (
                  <div className="mt-4 p-4 border absolute z-30 top-10 right-10 rounded-lg shadow bg-white/80 backdrop-blur-sm flex flex-col gap-4 w-full sm:w-[300px]">
                    <X
                      className=""
                      onClick={() => setShowFilters((prev) => !prev)}
                    />
                    {/* Category */}
                    <Select
                      placeholder="Select Category"
                      onChange={(value) =>
                        updateQueryParams({ key: "category", value: value })
                      }
                      style={{ width: "100%" }}
                      allowClear
                    >
                      {allCategory?.map((cat) => (
                        <Option key={cat._id} value={cat.category}>
                          {cat.category}
                        </Option>
                      ))}
                    </Select>

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
                        updateQueryParams({ key: "availability", value: value })
                      }
                      style={{ width: "100%" }}
                      allowClear
                    >
                      <Option value="inStock">In Stock</Option>
                      <Option value="outOfStock">Out of Stock</Option>
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
                      <Option value="price">Price</Option>
                      <Option value="newest">Newest</Option>
                      <Option value="popularity">Popularity</Option>
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
                      className="bg-emerald-400 text-white !mt-9 font-medium"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-[80%] items-center justify-between gap-4">
            <div className="flex w-full h-max  max-w-xl  border border-gray-300 rounded-lg overflow-hidden items-center">
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
                onChange={([min, max]) => {
                  updateQueryParams({
                    key: "price",
                    value: { minPrice: min, maxPrice: max },
                  });
                }}
                className="min-w-32 md:min-w-48 max-w-60"
                range
                max={1000}
                defaultValue={[20, 1000]}
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {isCategoryLoading ? (
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
            <div className="col-span-full text-center text-gray-500">
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

export default Page;
