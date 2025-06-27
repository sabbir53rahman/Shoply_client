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

    // order of last 30 days
    getLast30DaysOrdersCount: builder.query({
      query: () => ({
        url: "/orders/last30Days/orders",
        credentials: "include",
      }),
    }),

    //earnings of last 30 days
    getLast30DaysEarnings: builder.query({
      query: () => ({
        url: "/orders/last30Days/earnings",
        credentials: "include",
      }),
    }),

    // last 5 months (orders + earnings)
    getLast5MonthsStats: builder.query({
      query: () => ({
        url: "/orders/stats/last5Months",
        credentials: "include",
      }),
    }),

    // 3 recent orders
    getRecentOrders: builder.query({
      query: () => ({
        url: "/orders/recentOrders",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrderQuery,
  useGetLast30DaysOrdersCountQuery,
  useGetLast30DaysEarningsQuery,
  useGetLast5MonthsStatsQuery,
  useGetRecentOrdersQuery,
} = orderApi;
