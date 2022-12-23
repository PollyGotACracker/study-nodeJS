import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { InitData } from "../data/InitData";
import moment from "moment";

// TodoContext : store
const TodoContext = createContext();

// useTodoContext(): 공급자
const useTodoContext = () => {
  return useContext(TodoContext);
};

// store 관리자
const TodoContexProvider = ({ children }) => {
  const [todoContentList, setTodoContentList] = useState([]);
  const [todoContent, setTodoContent] = useState(InitData());

  /**
   * 프로젝트가 처음 구현될 때
   * 서버로부터 데이터를 가져와서 최초 렌더링 하기
   */
  /**
   * useEffect()
   * 일종의 사용자 정의 event 만들기
   * state 변수들이 변동되었을 때 자동으로 실행되기를 바라는 코드
   * todoContent state 변수가 어디선가 값이 변경되면
   * 자동으로 감지하고 실행되는 코드
   */
  // useEffect(() => console.log("시작하기"), [todoContent]);

  /**
   * useEffect()를 빈(Blank) 매개변수([])인 상태로
   * 코드를 작성하면
   * 최초 화면이 렌더링 될 때 자동으로 한번만 실행
   * didMount 생명주기에 실행되는 event 라고 한다.
   */
  // useEffect(() => console.log("또 시작하기"), []);

  /**
   * 서버로부터 데이터를 가져오는 CallBack 함수
   * 원래는 useEffect() 에서 서버데이터를 fetch 하면 되는데
   * 내부 엔진적인 문제로 인하여 정상적으로 작동되지 않거나
   * 무한 반복 실행한다.
   * fetch 하는 Callback 함수를 별도로 만들고
   * 이 Callback 함수를 useEffect() 에서 다시 호출하여 실행해주어야 한다.
   */
  const fetchAll = useCallback(async () => {
    try {
      const res = await fetch("/todo");
      const result = await res.json();
      console.log(result);
      if (result.error) {
        alert(result.error);
        // cf) 오류가 발생할 경우 데이터가 사라지지 않도록 처리
        setTodoContentList([]);
      }
      setTodoContentList([...result]);
    } catch (error) {
      alert("서버 접속 오류");
      setTodoContentList([]);
    }
  }, [setTodoContentList]);

  useEffect(() => {
    (async () => {
      await fetchAll();
    })();
  }, [fetchAll]);

  const todoInsert = useCallback(
    async (t_content) => {
      try {
        let data = { ...InitData(), t_content };
        let url = "/todo/insert";
        let method = "POST";
        alert(todoContent.id);

        if (Number(todoContent.id) !== 0) {
          data = todoContent;
          url = "/todo/update";
          method = "PUT";
        }
        console.log(data, url, method);

        const fetchOption = {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
        // cf) CORS 오류: NodeJS 와 React 의 port 가 다르기 때문
        // React 의 package.json 에서 proxy 설정(NodeJS 의 port)
        // "proxy": "http://localhost:3000"

        const res = await fetch(url, fetchOption);
        const result = await res.json();
        if (result.error) {
          alert(result.error);
          return false;
        } // return false 방법 / else 를 사용하는 방법
        else {
          setTodoContentList([...result]);
        }
        setTodoContent({ ...InitData() });
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
    },
    [setTodoContent, setTodoContentList, todoContentList, todoContent]
  );

  const todoDelete = useCallback(
    async (uid) => {
      // cf) DELETE method 는 fetchOption 없이 가능
      // cf) POST, PUT method 를 제외한 method 에 body 를 이용해 데이터를 전송하는 것은 비효율적이다.
      try {
        const res = await fetch(`/todo/delete/${uid}`, { method: "DELETE" });
        const result = await res.json();
        // 클라이언트 오류
        if (result.error) {
          alert(result.error);
        } else {
          setTodoContentList([...result]);
        }
        setTodoContent({ ...InitData() });
        // 서버 오류
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
    },
    [setTodoContent, setTodoContentList]
  );

  const todoComplete = useCallback(
    async (uid) => {
      try {
        const res = await fetch(`/todo/complete/${uid}`, { method: "PUT" });
        const result = await res.json();
        console.log(result);
        if (result.error) {
          return alert(result.error);
        } else {
          setTodoContentList([...result]);
        }
        setTodoContent({ ...InitData() });
      } catch (error) {
        console.log(error);
        alert("서버 오류");
      }
    },
    [setTodoContentList]
  );

  const todoEditor = (uid) => {
    const editorList = todoContentList.filter((item) => {
      return Number(item.id) === Number(uid);
    });
    setTodoContent({ ...editorList[0] });
  };

  const props = {
    todoContent,
    setTodoContent,
    todoContentList,
    setTodoContentList,
    todoInsert,
    todoDelete,
    todoComplete,
    todoEditor,
  };

  return <TodoContext.Provider value={props}>{children}</TodoContext.Provider>;
};

export { TodoContexProvider, useTodoContext };
