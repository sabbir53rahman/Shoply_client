import { apiSlice } from "../apiSlice/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add a review
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Review", id: productId },
      ],
    }),

    // Get reviews by product ID
    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/reviews/${productId}`,
        credentials: "include",
      }),
      providesTags: (result, error, productId) => [
        { type: "Review", id: productId },
      ],
    }),

    // Get all reviews by user
    getUsersAllReviews: builder.query({
      query: (userId) => ({
        url: `/reviews/usersAll/${userId}`,
        credentials: "include",
      }),
      providesTags: (result, error, productId) => [
        { type: "Review", id: productId },
      ],
    }),

    // Get all reviews
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        credentials: "include",
      }),
      providesTags: ["Review"],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: ({ id, userId, role }) => ({
        url: `/reviews/${id}?userId=${userId}&role=${role}`,
        method: "DELETE",
        body: { userId, role },
        credentials: "include",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetProductReviewsQuery,
  useGetAllReviewsQuery,
  useGetUsersAllReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;
