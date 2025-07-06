"use client"
import { useAddProductMutation, useGetAllCategorysQuery } from "@/redux/features/productSlice/productSlice";
import axios, { all } from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Select } from 'antd';
import { Camera } from "lucide-react/dist/cjs/lucide-react";
import AdminRoute from "@/components/AdminRoute";


const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Page = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [addProduct] = useAddProductMutation()
    const {data : allCategory} = useGetAllCategorysQuery()
    const filteredOptions = allCategory?.filter((item) => !selectedItems.includes(item._id));

    const [disable, setdisable] = useState(false)
    const disableButton = "bg-gray-400 hover:bg-gray-400 cursor-pointer text-white w-[80%] font-semibold px-8 py-2.5 rounded-lg shadow-lg transition"
    const normalButton = "bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white w-[80%] font-semibold px-8 py-2.5 rounded-lg shadow-lg transition"

    const handleAddProduct = async (e) =>{
        setdisable(true)
        e.preventDefault()
        try {
            const imageFile ={image : e.target.photo.files[0]}
            const res =await  axios.post(image_hosting_api, imageFile,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            } )

            if(res.data.success  === true){ 
                const productInfo ={
                    name: e.target.name.value,
                    category :selectedItems,
                    image: res?.data?.data?.display_url,
                    description:e.target.description.value,
                    price: parseInt(e.target.price.value),
                    stock: parseInt(e.target.stock.value)
                }
                console.log(productInfo)
            
                const resp = await addProduct(productInfo);
                e.target.reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `product added successfully `,
                    showConfirmButton: false,
                    timer: 1500
                });
                setdisable(false)
            }
        } catch (err) {
            console.log('error from add product', err)
        }
    }


    return (
        <AdminRoute role={"admin"}>
            <section className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-700 text-center">Add a new product.</h1>
                <form onSubmit={handleAddProduct} className="space-y- outline-none">
                {/* name */}
                <div className="flex flex-col lg:flex-row gap-4 my-4">
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
                        <input type="text"  placeholder="Enter product name..." name="name" required
                        className="w-full border border-gray-300  text-gray-500 rounded-lg px-4 py-2 outline-none"/>
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2">Product Price</label>
                        <input type="number"  placeholder="Product price..." name="price" required
                        className="w-full border border-gray-300  text-gray-500 rounded-lg px-4 py-2 outline-none"/>
                    </div>
                </div>
                {/* Description */}
                <div className="my-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea name="description" required placeholder="Write a short description about your product..."
                    rows="4" 
                    className="w-full border border-gray-300  text-gray-500 rounded-lg px-4 py-2 outline-none"></textarea>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 my-4">
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
                            <div className="relative">
                            <input
                            name="photo"
                            type="file"
                            required
                            className="w-full px-4 py-1.5 border-2 border-dashed border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors group-hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700"
                            />
                            <Camera className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="w-full">
                            <label className="block text-gray-700 font-semibold mb-2">Select Category</label>
                            {/* <select placeholder="chose an option" name="category" required
                                className="w-full border text-gray-800 border-gray-300 rounded-lg px-4 py-2 outline-none"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business">Business</option>
                            </select> */}
                            <Select
                                mode=""
                                placeholder="Select category"
                                value={selectedItems}
                                onChange={setSelectedItems}
                                style={{ width: '100%', height : '46px' }}
                                options={filteredOptions?.map(item => ({
                                    value: item.category,
                                    label: item.category,
                                }))}
                            />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 my-4">
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2">Status</label>
                        <input type="text"  placeholder="Write status... (optional)" name="status" 
                        className="w-full border border-gray-300  text-gray-500 rounded-lg px-4 py-2 outline-none"/>
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-700 font-semibold mb-2">Stock Quantity</label>
                        <input type="number"  placeholder="stock quantity..." name="stock" required
                        className="w-full border border-gray-300  text-gray-500 rounded-lg px-4 py-2 outline-none"/>
                    </div>
                </div>
                
                <div className="text-center my-10">
                    <input type="submit" disabled={disable} className={`${disable ? disableButton : normalButton}  `}  value="Add Product" />
                </div>
                </form>
            </div>
            </section>
        </AdminRoute>
    );
  }

export default Page;