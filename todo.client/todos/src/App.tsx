import { TodoItem } from "todoItem/TodoItem";

import { Suspense, useState } from "react";
import { useAddTodoMutation, useGetTodosQuery } from "./features/todos/todosSlice.ts";

function App() {
  const [description, setDescription] = useState<string | null>(null);

  const { data, refetch } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();

  function handleAddTodo(e) {
    e.preventDefault();

    if (description !== "" || description !== null) {
      addTodo({ description });
      setDescription(null);
      refetch();
    }
  }

  return (
    <div className="bg-gray-100 shadow-2xl p-6 h-screen flex items-stretch">
      <div className="flex flex-col basis-1/3 mx-auto gap-6 p-6 bg-white">
        <p className="text-3xl font-bold text-center">Todos</p>
        <form
          className="flex gap-4"
          onSubmit={handleAddTodo}
        >
          <input
            type="text"
            className="flex flex-1 border border-gray-300 rounded-md px-4 h-[3rem]"
            placeholder="Add a new todo..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="border bg-rose-400 text-white font-bold text-sm rounded-md px-4 h-[3rem] transition-colors 
                       hover:bg-rose-500"
          >
            + Add
          </button>
        </form>
        <hr/>
        <div className="flex flex-col justify-start gap-4">
          <Suspense fallback={<p className="text-center text-xl">Loading</p>}>
            {data?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
