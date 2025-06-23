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
            invalidatesTags : ["product"]
        }),
        getPaginatedProducts : builder.query({
            query : (query)=>{
                return {
                    url : `/products/paginated?page=${query}`
                };
            },
            providesTags : ['product']
        }),
        getAllProducts : builder.query({
            query : ()=>{
                return {
                    url : `/products`
                };
            },
            providesTags : ['product']
        }),
        getProduct : builder.query({
            query : (query)=>{
                return {
                    url : `/products/${query}`
                };
            },
            providesTags : ['product']
        }),
        updateProduct : builder.mutation({
            query : (info)=>{
                return {
                    url : `/products/${info?.id}`,
                    method : "PATCH",
                    body : info?.updatedData
                };
            },
            providesTags : ['product']
        }),
        deleteProduct : builder.mutation({
            query : (info)=>{
                return {
                    url : `/products/${info}`,
                    method : "DELETE",
                };
            },
            providesTags : ['product']
        }),
    })
})

export const {
    useAddProductMutation,
    useGetPaginatedProductsQuery,
    useGetAllProductsQuery,
    useGetProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi