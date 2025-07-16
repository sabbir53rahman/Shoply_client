"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAddCartDetailsMutation } from "@/redux/features/cartSlice/cartSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const [addCartDetails] = useAddCartDetailsMutation()
  const currentUser = useSelector(state => state?.user?.user)

  const renderStars = () => {
    const stars = [];
    const rating = product.rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 transition-colors duration-200 ${
            i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const handleWishlistToggle =  (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd =async (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    if(!currentUser){
      return Swal.fire({
        position: "top-end",
        title: "Please login first!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if(currentUser?.role === "admin"){
      return Swal.fire({
        position: "top-end",
        title: "Admin can't order!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    try {
      const cartDetails = {
        productId : product?._id,
        userId : currentUser?._id
      }
        
      await addCartDetails(cartDetails).unwrap()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added to the cart!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        title: "Already added!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Link href={`/products/${product._id}`} className="block group">
      <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
        {/* Gradient Overlay for Premium Feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        {/* Product Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
          {/* Premium Badge */}
          {(product.isFeatured || product.badge) && (
            <div className="absolute top-5 left-5 z-20">
              <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-xs px-4 py-2 font-bold shadow-xl border-0 rounded-full">
                {product.isFeatured ? "Featured" : product.badge}
              </Badge>
            </div>
          )}

          {/* Stock Status Badge */}
          {!product.inStock && (
            <div className="absolute top-5 right-5 z-20">
              <Badge className="bg-red-500 text-white text-xs px-3 py-1.5 font-semibold shadow-lg rounded-full">
                Sold Out
              </Badge>
            </div>
          )}

          {/* Quick Actions - Shows on Hover */}
          <div className="absolute bottom-5 left-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
            <div className="flex gap-3">
              {product.inStock ? (
                <>
                  <Button
                    onClick={handleQuickAdd}
                    className="flex-1 bg-gray-900/95 backdrop-blur-md hover:bg-gray-900 text-white rounded-2xl py-3 text-sm font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add To Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 bg-white/95 backdrop-blur-md hover:bg-white border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-400/90 backdrop-blur-md text-white rounded-2xl py-3 text-sm font-semibold cursor-not-allowed border-0"
                >
                  Out of Stock
                </Button>
              )}
            </div>
          </div>

          {/* Product Image with Loading State */}
          <div className="absolute inset-0 py-5 px-4">
            {!imageLoaded && (
              <div className="absolute inset-8 bg-gray-200 animate-pulse rounded-2xl" />
            )}
            <Image
              src={product?.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className={`object-cover group-hover:scale-110 transition-all duration-700 rounded-2xl ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              priority
            />
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>

        {/* Product Info */}
        <div className="p-4 pb-0">
          {/* Category */}
          {product.category && (
            <div className="mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="font-bold text-gray-900 text-lg line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-gray-700 transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        {/* Product Info */}
        <div className="p-3 pb-4 pt-0">
          <div className="flex py-2 justify-between flex-row-reverse items-center">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {renderStars(product?.rating)}
              </div>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.salePrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price?.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discount && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>
            

          {/* Stock Indicator */}
          {product.inStock && product.stock && (
            <div className="mb-5">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700 font-medium">
                  {product.stock > 10
                    ? "In Stock"
                    : `Only ${product.stock} left`}
                </span>
              </div>
            </div>
          )}

          {/* Action Button */}
          {product.stock >0 ? (
            <Link href={`/products/${product._id}`} className="block group">
              <Button className="w-full primary_button text-white rounded-2xl py-4 text-sm font-bold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group/btn border-0">
                <span className="flex items-center justify-center gap-2">
                  Choose Options
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="w-full bg-gray-200 text-gray-500 rounded-2xl py-4 text-sm font-bold cursor-not-allowed border-0"
            >
              Sold Out
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
