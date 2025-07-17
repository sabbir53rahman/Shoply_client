"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import categoryBnr from '../../assets/categorybnr.jpg'
import Navbar from '@/components/Navbar/Navbar';
import CategorySection from '@/components/Landing/CategorySection';
import ProductCard from '@/components/Product/ProductTem';
import { Skeleton } from 'antd';
import { useGetPaginatedProductsQuery } from '@/redux/features/productSlice/productSlice';
import Footer from '@/components/Footer/Footer';

const Page = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
        const { data: products = [], isLoading, isError } = useGetPaginatedProductsQuery(currentPage);
        const { totalPages } = products;
    
        const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
          setCurrentPage(pageNumber);
        }
      };
    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="w-full bg-gradient-to-br from-emerald-100 via-white to-teal-100 flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 py-10">
                {/* Left Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl lg:px-10 font-bold text-green-800 leading-tight mb-6">
                    Explore Amazing All Products Across the Website
                    </h1>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <Image
                    src={categoryBnr}
                    alt="Product Banner"
                    width={400}
                    height={300}
                    className="object-cover w-[90%] sm:w-[80%] md:w-[90%] lg:w-[80%] rounded-xl"
                    />
                </div>
            </div>

            <CategorySection/>

            <div className="grid container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="p-4 rounded-lg shadow bg-white">
                        <div className="w-full bg-gray-300 rounded-lg h-20 md:h-32 xl:h-44"></div>
                        <Skeleton active paragraph={{ rows: 4 }} />
                        </div>
                    ))
                    : products?.products?.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                ))}
            </div>

            <div className="flex justify-center items-center pb-10 gap-2 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded ${
                        currentPage === page ? 'bg-emerald-600 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {page}
                    </button>
                    );
                })}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <Footer/>
        </div>
    );
};

export default Page;