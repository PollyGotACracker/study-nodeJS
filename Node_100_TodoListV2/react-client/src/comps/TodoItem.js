import { useTodoContext } from "../context/TodoContext";
import { useCallback } from "react";

const TodoItem = ({ item }) => {
  const { todoDelete, todoComplete, todoEditor } = useTodoContext();

  const deleteHandler = useCallback(
    (e) => {
      const target = e.target;
      const parent = target.closest("DIV.item");
      const uid = parent.dataset.id;
      const childDiv = parent.childNodes;
      const content = childDiv[2].textContent;
      if (window.confirm(`삭제확인? "${content}"\n할일 아이템을 삭제합니다.`)) {
        // TodoMain 에게 uid 를 보내서 삭제(Main->List->Item drilling)
        todoDelete(uid);
      }
    },
    [todoDelete]
  );

  const completeHandler = (e) => {
    const target = e.target;
    const uid = target.closest("DIV.item").dataset.id;
    todoComplete(uid);
  };

  const editorHandler = (e) => {
    const target = e.target;
    const parent = target.closest("DIV.item");
    const uid = parent.dataset.id;
    console.log(uid);
    todoEditor(uid);
  };

  return (
    <div className="item" data-id={item.id}>
      <div className="delete" onClick={deleteHandler}>
        &times;
      </div>
      <div className="sdate">
        <div>{item.s_date}</div>
        <div>{item.s_time}</div>
      </div>
      <div
        className={item.e_date ? "content line" : "content"}
        onClick={editorHandler}
      >
        {item.t_content}
      </div>
      <div className="complete" onClick={completeHandler}>
        &#x2713;
      </div>
    </div>
  );
};

export default TodoItem;
