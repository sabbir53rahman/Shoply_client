import { apiSlice } from "../apiSlice/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a comment
    addComment: builder.mutation({
      query: ({ lessonId, content }) => ({
        url: `/comments/${lessonId}`,
        method: "POST",
        body: { content },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { lessonId }) => [
        { type: "Comment", id: lessonId },
      ],
    }),

    // Get all comments for a lesson
    getLessonComments: builder.query({
      query: (lessonId) => ({
        url: `/comments/${lessonId}`,
        credentials: "include",
      }),
      providesTags: (result, error, lessonId) => [
        { type: "Comment", id: lessonId },
      ],
    }),
  }),
});

export const { useAddCommentMutation, useGetLessonCommentsQuery } = commentApi;
