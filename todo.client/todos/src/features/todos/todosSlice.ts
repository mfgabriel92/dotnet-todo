import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  description: string;
  isCompleted: boolean;
}

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5238",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
    }),
    addTodo: builder.mutation({
      query: ({ description }) => ({
        url: "/todos",
        method: "POST",
        body: { description, isCompleted: false },
      }),
    }),
  }),
});

export default apiSlice;
export const { useGetTodosQuery, useAddTodoMutation } = apiSlice;
