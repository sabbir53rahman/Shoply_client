import { apiSlice } from "../apiSlice/apiSlice";

export const cartSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCartDetails : builder.mutation({
            query: ({ productId, userId }) => ({
                url: "/carts",
                method: "POST",
                body: { productId, userId },
                credentials: "include",
            }),
            invalidatesTags: ["Cart"],
        }),
        getUserCart : builder.query({
            query: (userId) => ({
                url: `/carts/userCart/${userId}`,
                credentials: "include",
            }),
            providesTags: ["Cart","Order"],
        }),
        getAllCart : builder.query({
            query: () => ({
                url: `/carts`,
                credentials: "include",
            }),
            providesTags: ["Cart"],
        }),
        deleteCart : builder.mutation({
            query : (info)=>{
                return {
                    url : `/carts/${info}`,
                    method : "DELETE",
                };
            },
            invalidatesTags : ['Cart']
        }),
    }),
});

export const {
    useAddCartDetailsMutation,
    useGetUserCartQuery,
    useGetAllCartQuery,
    useDeleteCartMutation
} = cartSlice;
