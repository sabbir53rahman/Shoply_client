"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productSlice/productSlice";
import { useAddOrderMutation } from "@/redux/features/orderSlice/orderSlice";
import { useGetCurrentUserQuery } from "@/redux/features/manageUserSlice/manageUserSlice";
import Navbar from "@/components/Navbar/Navbar";
import Swal from "sweetalert2";
import { useAddCartDetailsMutation } from "@/redux/features/cartSlice/cartSlice";

export default function ProductDetailsPage() {
//   const { data: currentUser } = useGetCurrentUserQuery(user?.email);
//   console.log(data)
  const user = useSelector((state) => state.user?.user);
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const userId = user?._id;

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addOrder] = useAddOrderMutation();
  const [addCartDetails] = useAddCartDetailsMutation()

  const handleQuantityChange = (change) => {
    setQuantity((prev) => {
      const newQty = prev + change;
      return Math.max(1, Math.min(newQty, product?.stock || 1));
    });
  };

  const handleAddOrder = async () => {
    if (!userId) {
      console.error("You must be logged in to place an order.");
      return;
    }
    try {
      const newOrder = {
        userId : user?._id,
        products : {
          productId : product?._id,
          quantity 
        }
      }
      await addOrder(newOrder).unwrap();
      Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Order successfull.",
              showConfirmButton: false,
              timer: 1500,
            });
      console.log("✅ Order created successfull!");
    } catch (err) {
      console.error("❌ Failed to create order:", err);
    }
  };

    const handleAddToCart =async () => {
      try {
        const cartDetails = {
          productId : product?._id,
          userId : user?._id
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

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
            ? "fill-yellow-400/50 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-white">
                <Image
                  src={product.image || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isFeatured && (
                  <Badge className="absolute top-4 left-4 bg-orange-500">
                    Featured
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.numReviews} reviews)
                  </span>
                </div>
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-600">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500">per kg</span>
              </div>
              {product.sold > 0 && (
                <p className="text-sm text-gray-600">
                  {product.sold} units sold
                </p>
              )}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={`font-medium ${
                    product.inStock ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {product.inStock
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Quantity + Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddOrder}
                    className="flex-1 h-12 text-lg primary_button font-semibold"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Order Now - ${(product.price * quantity).toFixed(2)}
                  </Button>
                  
                  <button
                    onClick={()=>handleAddToCart()}
                    variant="outline"
                    size="lg"
                    className="h-12 border border-gray-200 text-white bg-cyan-950 hover:bg-emerald-700 px-4 flex gap-2 items-center justify-center rounded-lg"
                  >Add To Cart
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="h-12 px-4"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  
                </div>
              </div>
            )}

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Fresh Guarantee</p>
                  <p className="text-xs text-gray-600">100% fresh products</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">7-day return policy</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <Card className="p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Product Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-mono">{product._id.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Added:</span>
                  <span>{formatDate(product.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span>{formatDate(product.updatedAt)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
