import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5238"
  }),
  endpoints: (builder) => ({
    completeTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: { ...todo, isComplete: true }
      })
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE"
      })
    })
  })
});

export default apiSlice;
export const {
  useCompleteTodoMutation,
  useDeleteTodoMutation
} = apiSlice;
