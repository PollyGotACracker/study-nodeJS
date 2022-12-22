import express from "express";
import DB from "../models/index.js";
import moment from "moment";
const TODO = DB.models.tbl_todolist;
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // const result = await TODO.findAll();
    // return res.json(result);
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "SELECT 오류" });
  }
});
// router.get("/insert", (req, res) => {
//   return res.render("write");
// });
/**
 * form 으로부터 전달된 데이터를 DB table 에 추가하고
 * DB table 전체 리스트를 JSON 으로 응답하는 코드
 */
router.post("/insert", async (req, res, next) => {
  // form 에서 수신된 입력데이터를 data 변수에 담고
  const data = req.body;
  try {
    // table 에 insert 수행
    await TODO.create(data);
    // 전체 데이터를 select 하여
    // const list = await TODO.findAll();
    // json type 보내주기
    // return res.json(list);
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "서버 오류" });
  }
});
router.put("/update", async (req, res, next) => {
  const data = req.body;
  try {
    await TODO.update(data, { where: { id: data.id } });
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "서버 오류" });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    // 변수명과 칼럼명이 id로 같으므로 속성으로 만들 필요 없음
    await TODO.destroy({ where: { id } });
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "DELETE 오류" });
  }
});

router.put("/complete/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await TODO.findByPk(id);
    const date = moment().format("YYYY[-]MM[-]DD");
    const time = moment().format("HH:mm:ss");
    await TODO.update(
      {
        ...todo,
        e_date: todo.e_date ? "" : date,
        e_time: todo.e_time ? "" : time,
      },
      { where: { id } }
    );
    return next();
  } catch (error) {
    console.error(error);
    return res.json({ error: "업데이트 오류" });
  }
});

/**
 * 각 router next() 함수가 실행되면
 * 요청을 또 한 번 처리할 router
 * url "/**" ANT parrent
 * 모든 router 의 마지막에 위치(next)
 * "/*" 로 처리하면 "/aa", "/bb", "/cc"
 * "/**" 로 처리하면 "/aa", "/aa/bb", "/aa/cc/dd" 등 모두 처리
 */
router.all("/**", async (req, res) => {
  try {
    const list = await TODO.findAll();
    return res.json(list);
  } catch (error) {
    return res.json({ error: "SELECT 오류" });
  }
});

/**
 * GET /todo/aaa 요청이 들어왔을 때
 * 위의 router 들이 처리할 수 있는 URL 에 필터링이 되지 않으면
 * 다음의 router 가 요청을 수신, 처리한다.
 * 경로에 파라미터만 존재하므로 가장 마지막에 처리하도록 한다(에러 처리).
 */
router.get("/:id", (req, res) => {
  //  return res.send("단일 데이터");
  return res.send("404 Not Found");
});

export default router;
