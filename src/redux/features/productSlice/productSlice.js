import { apiSlice } from "../apiSlice/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints : (builder) =>({
        addProduct : builder.mutation({
            query: (info) => {
                return {
                    url: "/products",
                    method: "POST",
                    body: info,
                };
            },
            invalidatesTags : ["Product"]
        }),
        getPaginatedProducts : builder.query({
            query : (query)=>{
                return {
                    url : `/products/paginated?page=${query}`
                };
            },
            providesTags : ['Product']
        }),
        getAllProducts : builder.query({
            query : ()=>{
                return {
                    url : `/products`
                };
            },
            providesTags : ['Product']
        }),
        getProduct : builder.query({
            query : (query)=>{
                return {
                    url : `/products/${query}`
                };
            },
            providesTags : ['Product']
        }),
        updateProduct : builder.mutation({
            query : (info)=>{
                return {
                    url : `/products/${info?.id}`,
                    method : "PATCH",
                    body : info?.updatedData
                };
            },
            invalidatesTags : ['Product']
        }),
        deleteProduct : builder.mutation({
            query : (info)=>{
                return {
                    url : `/products/${info}`,
                    method : "DELETE",
                };
            },
            invalidatesTags : ['Product']
        }),
        addCategory : builder.mutation({
            query: (info) => {
                return {
                    url: "/categorys",
                    method: "POST",
                    body: info,
                };
            },
            invalidatesTags : ["Category"]
        }),
        getAllCategorys : builder.query({
            query : ()=>{
                return {
                    url : `/categorys`
                };
            },
            providesTags : ['Product']
        }),
    })
})

export const {
    useAddProductMutation,
    useGetPaginatedProductsQuery,
    useGetAllProductsQuery,
    useGetProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAddCategoryMutation,
    useGetAllCategorysQuery
} = productApi