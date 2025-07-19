"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useGetProductQuery } from "@/redux/features/productSlice/productSlice";
import { useAddOrderMutation } from "@/redux/features/orderSlice/orderSlice";
import Navbar from "@/components/Navbar/Navbar";
import Swal from "sweetalert2";
import {
  useAddReviewMutation,
  useGetProductReviewsQuery,
  useDeleteReviewMutation,
} from "@/redux/features/reviewSlice/reviewSlice";
import { useAddCartDetailsMutation } from "@/redux/features/cartSlice/cartSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ProductDetailsSkeleton from "@/components/Product/ProductDetailsSkeleton";

export default function ProductDetailsPage() {
  const user = useSelector((state) => state.user?.user);
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const userId = user?._id;
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [addressData, setAddressData] = useState({
    name : "",
    phone : "",
    street : "",
    thana : "",
    district : "",
    houseNumber : "",
  })

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addOrder] = useAddOrderMutation();
  const [addCartDetails] = useAddCartDetailsMutation()

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    refetch,
  } = useGetProductReviewsQuery(id);
  const [addReview] = useAddReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const handleQuantityChange = (change) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + change, product?.stock || 1))
    );
  };

  const handleInputChange = (field, value) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddOrder = async () => {
    if (!userId) {
      Swal.fire(
        "Login Required",
        "Please log in to place an order.",
        "warning"
      );
      return;
    }
    // if(user?.role === "admin"){
    //   return Swal.fire({
    //     position: "top-end",
    //     title: "Admin can't order!",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }
    if(!addressData.name){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Fill all the address feild.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const newOrder = {
      userId: user._id,
      products : [{ productId: product?._id, quantity ,price :product?.price }],
      address: addressData,
      paymentMethod,
      totalPrice: product?.price * quantity,
    };
    console.log(newOrder)

    if (paymentMethod === "cash") {
      try {
        await addOrder(newOrder).unwrap();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order placed successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.error("❌ Failed to create order:", err);
      }
    } else if (paymentMethod === "sslcommerz") {

        const res = await fetch("/api/ssl-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });

        const data = await res.json();
        if (data?.GatewayPageURL) {
          window.location.replace(data.GatewayPageURL);
        } else {
          console.error("❌ SSLCommerz initiation failed");
        }
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewComment.trim()) {
      Swal.fire("Empty review", "Please enter a comment.", "warning");
      return;
    }

    try {
      setIsSubmittingReview(true);
      await addReview({
        productId: product._id,
        userId,
        rating: reviewRating,
        comment: reviewComment,
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Thank you for your review!",
        timer: 1500,
        showConfirmButton: false,
      });
      setReviewComment("");
      setReviewRating(5);
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to submit review.", "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    console.log("Deleting reviewId:", reviewId); 
    const confirm = await Swal.fire({
      title: "Delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });
    if (!confirm.isConfirmed) return;

    try {
      await deleteReview({
        id: reviewId,
        userId: user._id,
        role: user.role,
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Review deleted.",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      console.log("Failed delete:", err);
      Swal.fire("Error", "Failed to delete review.", "error");
    }
  };
  
  const handleAddToCart =async () => {
    if(user?.role === "admin"){
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
      <ProductDetailsSkeleton/>
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
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
          <div>
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-white">
                <Image
                  src={product?.image}
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

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-4">
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
            </div>

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

            <Separator />

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

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
                  

                  {/* checkout  */}
                  <Card> 
                    <CardContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1  text-lg primary_button h-12 font-semibold"
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Order Now - ${(product.price * quantity).toFixed(2)}
                          </Button>
                        </DialogTrigger>
                        <DialogContent forceMount className="bg-white">
                          <Card className="shadow-sm">
                                        <Card className="shadow-sm">
                                          <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
                                            <CardTitle className="text-xl font-semibold">Payment Method</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-4 mt-2">
                                            <div className="space-y-2">
                                              <div className="flex items-center gap-3">
                                                <input
                                                  type="radio"
                                                  id="cash"
                                                  name="payment"
                                                  value="cash"
                                                  checked={paymentMethod === "cash"}
                                                  onChange={() => setPaymentMethod("cash")}
                                                />
                                                <label htmlFor="cash">Cash on Delivery</label>
                                              </div>
                                              <div className="flex items-center gap-3">
                                                <input
                                                  type="radio"
                                                  id="sslcommerz"
                                                  name="payment"
                                                  value="sslcommerz"
                                                  checked={paymentMethod === "sslcommerz"}
                                                  onChange={() => setPaymentMethod("sslcommerz")}
                                                />
                                                <label htmlFor="sslcommerz">Prepaid (SSLCommerz)</label>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                        <CardHeader className="pb-4">
                                          <div className="flex items-center gap-4">
                                            <CardTitle className="text-2xl font-semibold">Shipping address</CardTitle>
                                          </div>
                                          <p className="text-sm text-gray-600 mt-2">
                                            Address lookup powered by Google
                                          </p>
                                        </CardHeader>
                          
                                        <CardContent className="space-y-6">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                              <div htmlFor="name" className="text-sm font-medium text-gray-700">
                                                NAME *
                                              </div>
                                              <Input
                                                id="name"
                                                value={addressData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="mt-1"
                                              />
                                            </div>
                                            <div>
                                              <div htmlFor="phone" className="text-sm font-medium text-gray-700">
                                                Phone *
                                              </div>
                                              <Input 
                                                id="phone"
                                                value={addressData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                className="mt-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                              <div htmlFor="street" className="text-sm font-medium text-gray-700">
                                                ADDRESS - STREET*
                                              </div>
                                              <Input
                                                id="street"
                                                value={addressData.street}
                                                onChange={(e) => handleInputChange("street", e.target.value)}
                                                className="mt-1"
                                              />
                                            </div>
                            
                                            <div>
                                              <div htmlFor="thana" className="text-sm font-medium text-gray-700">
                                                Thana *
                                              </div>
                                              <Input
                                                id="thana"
                                                placeholder=""
                                                value={addressData.thana}
                                                onChange={(e) => handleInputChange("thana", e.target.value)}
                                                className="mt-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                              <div htmlFor="district" className="text-sm font-medium text-gray-700">
                                                District *
                                              </div>
                                              <Input
                                                id="district"
                                                value={addressData.district}
                                                onChange={(e) => handleInputChange("district", e.target.value)}
                                                className="mt-1"
                                              />
                                            </div>
                                            <div>
                                              <div htmlFor="houseNumber" className="text-sm font-medium text-gray-700">
                                                House Number *
                                              </div>
                                              <Input
                                                id="houseNumber"
                                                value={addressData.houseNumber}
                                                onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                                                className="mt-1"
                                              />
                                            </div>
                                          </div>
                          
                                          <Button 
                                            onClick={handleAddOrder}
                                            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 mt-2"
                                          >
                                            {paymentMethod === "sslcommerz" ? "Pay Now (SSLCommerz)" : "Place Order (Cash on Delivery)"}
                                          </Button>
                                        </CardContent>
                                      </Card>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

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

            {/* Review Form */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-sm space-y-4">
              <h3 className="text-xl font-semibold">Leave a Review</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`w-4 h-4 cursor-pointer transition ${
                      star <= reviewRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {reviewRating} star{reviewRating > 1 ? "s" : ""}
                </span>
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your comment..."
              />
              <Button
                onClick={handleReviewSubmit}
                disabled={isSubmittingReview}
                className="primary_button h-12 px-6 text-lg font-semibold"
              >
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              {isReviewsLoading ? (
                <p>Loading reviews...</p>
              ) : reviews?.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review._id} className="p-4 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      {renderStars(review.rating)}
                      <span className="text-xs text-gray-500 ml-auto">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-sm text-gray-800">
                        {review.userId?.name}
                      </p>
                      {(user?._id === review.userId?._id ||
                        user?.role === "admin") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteReview(review._id)}
                          className="flex items-center gap-1"
                        >
                          <Trash className="w-4 h-4" /> Delete
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                  </Card>
                ))
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}