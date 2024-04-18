import { TodoItem } from "./components/TodoItem.tsx";

function App() {
  const todo = { id: 1, description: "Task #1", isComplete: false };
  return <TodoItem todo={todo}/>;
}

export default App;
