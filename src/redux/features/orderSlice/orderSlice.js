import { apiSlice } from "../apiSlice/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order
    addOrder: builder.mutation({
      query: ({ productId, quantity, userId, price }) => ({
        url: "/orders",
        method: "POST",
        body: { productId, quantity, userId, price },
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),

    // Get all orders
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),

    // Get a single user's order by userId
    getUserOrder: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        credentials: "include",
      }),
      providesTags: (result, error, userId) => [{ type: "Order", id: userId }],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrderQuery,
} = orderApi;
