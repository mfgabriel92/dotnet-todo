import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { useCompleteTodoMutation, useDeleteTodoMutation } from "../features/todos/todosSlice.ts";
import cx from "classnames";

interface Todo {
  todo: {
    id: number;
    description: string;
    isComplete: boolean;
  };
}

function TodoItem({ todo }: Todo) {
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <div className={cx("flex flex-1 flex-col gap-4 bg-gray-300 py-6 px-4 relative group", {
      "bg-gray-50 text-gray-300": todo.isComplete
    })}>
      <p className="text-xl">{todo.description}</p>
      <div
        className={cx("flex basis-2/12 h-full absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100", {
          "flex": !todo.isComplete
        })}>
        <button className="flex items-center px-6 bg-purple-800 text-white text-xl font-bold h-full
                           transition-colors hover:bg-purple-900" onClick={() => deleteTodo(todo.id)}>
          <AiFillDelete/>
        </button>
        <button className="flex items-center px-6 bg-purple-800 text-white text-xl font-bold h-full
                           transition-colors hover:bg-purple-900" onClick={() => completeTodo(todo)}>
          <AiFillCheckCircle/>
        </button>
      </div>
    </div>
  );
}

export { TodoItem };