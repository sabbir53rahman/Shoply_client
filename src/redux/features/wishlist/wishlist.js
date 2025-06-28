import { apiSlice } from "../apiSlice/apiSlice";

export const wishlistApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addWishlist : builder.mutation({
            query: (info) => {
                return {
                    url: "/wishlists",
                    method: "POST",
                    body: info,
                };
            },
            invalidatesTags : ["Wishlist"]
        }),
        deleteWishlist : builder.mutation({
            query : (info)=>{
                return {
                    url : `/wishlists/${info}`,
                    method : "DELETE",
                };
            },
            invalidatesTags : ['Wishlist']
        }),
        getAllwishlist : builder.query({
            query : ()=>{
                return {
                    url : `/wishlists`
                };
            },
            providesTags : ['Wishlist']
        }),
        getUserWishlist : builder.query({
            query : (query)=>{
                return {
                    url : `/wishlists/${query}`
                };
            },
            providesTags : ['Wishlist']
        }),
    }),
});

export const {
    useAddWishlistMutation,
    useGetAllwishlistQuery,
    useGetUserWishlistQuery,
    useDeleteWishlistMutation
} = wishlistApi;