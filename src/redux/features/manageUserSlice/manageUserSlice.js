import { apiSlice } from "../apiSlice/apiSlice";

export const manageUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (info) => {
        return {
          url: `/users/${info?.id}`,
          method: "PATCH",
          body: info?.updatedData,
        };
      },
      invalidatesTags: ["User"],
    }),
    makeAdmin: builder.mutation({
      query: (info) => {
        return {
          url: `/users/makeAdmin/${info}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (info) => {
        return {
          url: `/users/${info}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/users`,
        };
      },
      providesTags: ["User"],
    }),
    getCurrentUser: builder.query({
      query: (query) => {
        return {
          url: `/users/login/${query}`,
        };
      },
      providesTags: ["User"],
    }),
    getPaginatedUsers: builder.query({
      query: ({ page, search }) => {
        return {
          url: `/users/allUsers/paginated?page=${page}&search=${encodeURIComponent(
            search || ""
          )}`,
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useMakeAdminMutation,
  useGetCurrentUserQuery,
  useGetPaginatedUsersQuery,
} = manageUserSlice;
