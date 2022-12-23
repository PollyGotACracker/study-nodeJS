import { useTodoContext } from "../context/TodoContext";

const TodoInput = () => {
  // ContextProvider 로부터 state 관련 변수, 함수 받기
  const { todoInsert, todoContent, setTodoContent } = useTodoContext();

  const onClickHandler = () => {
    todoInsert(todoContent.t_content);
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setTodoContent({ ...todoContent, t_content: value });
  };

  // cf) {} 내의 조건을 만족하면 disabled 속성을 true로 변경
  return (
    <div className="input">
      <input
        placeholder="TODO"
        onChange={onChangeHandler}
        value={todoContent.t_content}
      />
      <button
        onClick={onClickHandler}
        disabled={todoContent.t_content.length < 2}
      >
        Enter
      </button>
    </div>
  );
};

export default TodoInput;
