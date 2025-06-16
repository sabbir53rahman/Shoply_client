"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"

const ProductCard = ({ product }) => {
  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />,
      )
    }
    return stars
  }

  return (
    <div className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Product Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <Badge
              className={`${
                product.badge === "Sale"
                  ? "bg-red-500 hover:bg-red-600"
                  : product.badge === "Sold out"
                    ? "bg-gray-500"
                    : "bg-emerald-600 hover:bg-emerald-700"
              } text-white text-xs px-3 py-1.5 font-semibold shadow-lg`}
            >
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Quick Add to Cart - Shows on Hover */}
        <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          {product.available !== false ? (
            <Button className="w-full bg-gray-900/90 backdrop-blur-sm hover:bg-gray-900 text-white rounded-xl py-2.5 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          ) : (
            <Button
              disabled
              className="w-full bg-gray-400/90 backdrop-blur-sm text-white rounded-xl py-2.5 text-sm font-medium cursor-not-allowed"
            >
              Out of Stock
            </Button>
          )}
        </div>

        {/* Product Image */}
        <div className="absolute inset-0 p-8">
          <Image
            src={product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-base mb-3 line-clamp-2 leading-tight min-h-[3rem] group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">{renderStars()}</div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-xl font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          {product.discount && (
            <div className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Action Button */}
        {product.available !== false ? (
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
            Choose Options
          </Button>
        ) : (
          <Button
            disabled
            className="w-full bg-gray-200 text-gray-500 rounded-xl py-3 text-sm font-semibold cursor-not-allowed"
          >
            Sold Out
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
