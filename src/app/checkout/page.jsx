"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Info, ArrowRight, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useAddOrderMutation } from "@/redux/features/orderSlice/orderSlice";
import Swal from "sweetalert2";
import { useGetUserCartQuery } from "@/redux/features/cartSlice/cartSlice";
import { useSelector } from "react-redux";
import PrivateRoute from "@/components/PrivateRoute";
import { useRouter } from "next/navigation";
import { warning, success, errorMessage } from "@/components/ui/message";
import { set } from "lodash";
import AdminRoute from "@/components/AdminRoute";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [disabled, setDisabled] = useState(false);
  const currentUser = useSelector((state) => state?.user?.user);
  const { data: userCartItem = [], isLoading } = useGetUserCartQuery(
    currentUser?._id
  );
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const [addOrder] = useAddOrderMutation();
  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    street: "",
    thana: "",
    district: "",
    houseNumber: "",
  });

  const handleInputChange = (field, value) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (userCartItem && userCartItem.length > 0) {
      const cartWithQuantity = userCartItem.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(cartWithQuantity);
    }
  }, [userCartItem]);

  const handleAddOrder = async () => {
    setDisabled(true);
    if (!currentUser?._id) {
      errorMessage("You must be logged in to place an order.");
      return router.push("/auth/login");
    }

    if (
      !addressData.name ||
      !addressData.phone ||
      !addressData.street ||
      !addressData.thana ||
      !addressData.district ||
      !addressData.houseNumber
    ) {
      setDisabled(false);
      return warning("Please fill in all required fields.");
    }

    const products = cartItems.map((item) => ({
      productId: item?.productId?._id,
      quantity: item.quantity,
      price: item?.productId?.price,
    }));

    const newOrder = {
      userId: currentUser._id,
      products,
      address: addressData,
      paymentMethod,
      totalPrice: subtotal,
    };

    if (paymentMethod === "cash") {
      try {
        await addOrder(newOrder).unwrap();
        success("Order placed successfully!");
        setCartItems([]);
        setDisabled(false);
        router.push("/dashboard");
      } catch (err) {
        console.log("Error placing order:", err);
        setDisabled(false);
        errorMessage(err?.data?.message || "Failed to place order.");
      }
    } else if (paymentMethod === "sslcommerz") {
      const res = await fetch("/api/ssl-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      const data = await res.json();
      setDisabled(false);
      if (data?.GatewayPageURL) {
        window.location.replace(data.GatewayPageURL);
      } else {
        console.error("❌ SSLCommerz initiation failed");
        errorMessage("Failed to initiate payment. Please try again.");
        setDisabled(false);
      }
    }
  };

  const handleQuantityChange = (productId, change, stocks) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(item.quantity + change, item.productId?.stock || 99)
              ),
            }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <AdminRoute role={"admin,user"}>
      <div className="">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 min-h-screen py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}

              {/* Shipping Address Section */}
              <Card className="shadow-sm">
                <Card className="shadow-sm">
                  <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl font-semibold">
                      Payment Method
                    </CardTitle>
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
                    <CardTitle className="text-2xl font-semibold">
                      Shipping address
                    </CardTitle>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Address lookup powered by Google, view{" "}
                    <button className="underline">Privacy policy</button> To
                    optout change{" "}
                    <button className="underline">cookie preferences</button>.
                  </p>
                  <p className="text-sm text-gray-600">
                    *Indicates required field
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        NAME *
                      </div>
                      <Input
                        id="name"
                        value={addressData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <div
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone *
                      </div>
                      <Input
                        id="phone"
                        value={addressData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      htmlFor="street"
                      className="text-sm font-medium text-gray-700"
                    >
                      ADDRESS - STREET*
                    </div>
                    <Input
                      id="street"
                      value={addressData.street}
                      onChange={(e) =>
                        handleInputChange("street", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <div
                      htmlFor="thana"
                      className="text-sm font-medium text-gray-700"
                    >
                      Thana *
                    </div>
                    <Input
                      id="thana"
                      placeholder="Leave blank if P.O. Box in Address 1"
                      value={addressData.thana}
                      onChange={(e) =>
                        handleInputChange("thana", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div
                        htmlFor="district"
                        className="text-sm font-medium text-gray-700"
                      >
                        District *
                      </div>
                      <Input
                        id="district"
                        value={addressData.district}
                        onChange={(e) =>
                          handleInputChange("district", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <div
                        htmlFor="houseNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        House Number *
                      </div>
                      <Input
                        id="houseNumber"
                        value={addressData.houseNumber}
                        onChange={(e) =>
                          handleInputChange("houseNumber", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    {/* <div>
                      <div htmlFor="state" className="text-sm font-medium text-gray-700">
                        STATE *
                      </div>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                  </div>

                  <Button
                    disabled={disabled || isLoading || !cartItems}
                    onClick={handleAddOrder}
                    className={`w-full ${
                      disabled || isLoading || !cartItems
                        ? "bg-gray-500"
                        : "bg-emerald-700 hover:bg-emerald-800"
                    } text-white py-3 mt-2`}
                  >
                    {paymentMethod === "sslcommerz"
                      ? "Pay Now (SSLCommerz)"
                      : "Place Order (Cash on Delivery)"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary */}
              <Card className="shadow-sm bg-emerald-600 text-white">
                <CardHeader className=" bg-emerald-600 text-white mb-2 rounded-t-lg">
                  <CardTitle className="text-xl font-semibold">
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ${subtotal?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span>Estimated tax</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <span>--</span>
                    </div>
                  </div>
                  <Separator className="bg-gray-300" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${parseInt(subtotal?.toFixed(2))}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Cart */}
              <Card className="shadow-sm ">
                <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart (2 Items)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 my-3 px-3">
                  {cartItems?.map((item) => (
                    <div
                      key={item?._id}
                      className="flex shadow-md border p-1 py-2 items-center gap-4"
                    >
                      <div className="text- ">
                        <Image
                          src={item?.productId?.image || "/placeholder.svg"}
                          alt={item?.productId?.name}
                          height={150}
                          width={160}
                          className="w-20 h-20 object-cover rounded-md bg-gray-100"
                        />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <h3 className="font-semibold">
                          {item?.productId?.name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                          <p className="font-semibold text-sm my-3 ">
                            price : ${item?.productId?.price?.toFixed(2)}
                          </p>
                          <p className="font-semibold text-sm my-3 ">
                            stock : {item?.productId?.stock}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm gap-4">
                          <span className="">Quantity : </span>
                          <div className="flex items-center border justify-center w- rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  -1,
                                  item?.productId?.stock
                                )
                              }
                              disabled={item?.quantity <= 1}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item?.productId?.stock === 0
                                ? 0
                                : item?.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  1,
                                  item?.productId?.stock
                                )
                              }
                              disabled={item?.quantity >= item.productId?.stock}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}
