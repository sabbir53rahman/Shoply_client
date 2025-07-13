"use client"

import { useState } from "react"
import { Cross, LucideCross, Minus, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/Navbar/Navbar"
import { useDeleteCartMutation, useGetUserCartQuery } from "@/redux/features/cartSlice/cartSlice"
import { useSelector } from "react-redux"
import { useAddOrderMutation } from "@/redux/features/orderSlice/orderSlice"
import Link from "next/link"
import Image from "next/image"

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Basic T-shirt",
      size: "M",
      color: "Grey",
      price: 20.0,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Basic T-shirt",
      size: "M",
      color: "Grey",
      price: 20.0,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Basic T-shirt",
      size: "M",
      color: "Grey",
      price: 20.0,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Basic T-shirt",
      size: "M",
      color: "Grey",
      price: 20.0,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])
  const [quantity, setQuantity] = useState(1);
  const currentUser = useSelector(state =>  state?.user?.user)
  const [addOrder] = useAddOrderMutation()
  const [deleteCart] = useDeleteCartMutation()
  const {data} = useGetUserCartQuery(currentUser?._id)
  console.log('add to cart',data)

  const handleUpdateOrder = async()=>{
    try {
        
    } catch (error) {
        Swal.fire({
      position: "top-end",
      icon : 'error',
      title: "Can't order",
      showConfirmButton: false,
      timer: 1500,
    });
    }
  }

  const removeItem =async (id) => {
    try {
        await deleteCart(id)
    } catch (error) {
        Swal.fire({
      position: "top-end",
      title: "Can't delete",
      showConfirmButton: false,
      timer: 1500,
    });
    }
  }

  return (
    <div className="">
        <Navbar/>
      <div className="max-w-5xl mx-auto min-h-screen  p-4 md:p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your cart products
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Discover our handpicked premium products
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {
            data === undefined || data.length  < 1 && <p className="text-center py-10">You have no cart products. <Link className="text-sky-400" href='/products'>See products</Link></p>
        }

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
            {data?.map((item) => (
                <div key={item?.productId?._id} className="bg-white rounded-lg shadow-md p-3 md:p-6 flex flex-co sm:flex-row items-center gap-3 md:gap-6">
                {/* Product Image */}
                <div className="size-12 md:size-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item?.productId?.image || "/placeholder.svg"} height={100} width={150} alt={item?.productId?.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    <h3 className="md:text-lg font-medium text-gray-800 mb-1">{item?.productId?.name}</h3>
                    <div className="text-gray-500 flex lg:gap-10 flex-col md:flex-row gap-1  text-sm">
                    <p className=""> Category : <span className="font-medium"> { item?.productId?.category}</span></p>
                    <p className=""> Stock : {" "} <span className="font-medium"> {item?.productId?.stock}</span></p>
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center gap-2 md:gap-6">
                    <div className="lg:text-xl font-medium text-gray-600 lg:min-w-[80px] text-right">${item?.productId?.price.toFixed(2)}</div>
                    <button onClick={() => removeItem(item?._id)}
                        className="size-6 lg:size-10 flex items-center justify-center text-fuchsia-700 hover:bg-red-50 rounded-full"
                    >
                        <X className="size-6 lg:size-10 rounded-full" />
                    </button>
                </div>
            </div>
          ))}
        </div>

        {
            data === undefined || data.length < 1 ?
                <button disabled className="w-[80%] bg-gray-400 hover:bg-gray-400 text-white text-lg my-6 rounded-lg font-medium">
                    Proceed to Pay
                </button> :
                <div className="w-full py-6">
                    <Link href={`/checkout`} className="w-[80%] mx-auto  block text-center px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-2 rounded-lg font-medium">
                        Proceed to Pay
                    </Link>
                </div>
                   
        }
      </div>
    </div>
  )
}
