"use client"
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import ProductCard from '@/components/Product/ProductTem';
import { useGetPaginatedProductsQuery } from '@/redux/features/productSlice/productSlice';
import { Skeleton } from 'antd';
import  { useState } from 'react';

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
        <div>
            <Navbar/>
            <div className="container mx-auto px-4 pt-10 sm:px-6 lg:px-8">
                {/*Featured Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Featured Collection
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                        Discover our handpicked premium products
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 w-[96%] xl:w-[90%] mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
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