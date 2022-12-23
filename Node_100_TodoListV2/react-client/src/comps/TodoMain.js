import { TodoContexProvider } from "../context/TodoContext";
import "../css/Todo.css";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoMain = () => {
  return (
    <div className="Todo">
      <TodoContexProvider>
        <TodoInput />
        <TodoList />
      </TodoContexProvider>
    </div>
  );
};

export default TodoMain;
