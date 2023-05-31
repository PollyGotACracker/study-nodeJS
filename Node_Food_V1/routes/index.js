import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  const sql = "SELECT * FROM tbl_today ORDER BY date";
  mysql.execute(sql, (error, lists, fields) => {
    console.log(lists);
    res.render("index", { lists });
  });
});

router.post("/", (req, res, next) => {
  /* cf)
   * 배열을 그대로 전달하거나, 테이블의 컬럼명을 명시하지 않을 경우
   * 요소를 저장하는 순서가 뒤바뀔 수 있으므로 destructuring, 컬럼명 명시를 하는 것이 좋다.
   * 또한 HTML Injection 공격을 유의할 것
   */
  const { date, food, intake, cal } = req.body;
  const sql = "INSERT INTO tbl_today(date, food, intake, cal) VALUES (?,?,?,?)";
  mysql.execute(sql, [date, food, intake, cal], (error, result, fields) => {
    if (error) {
      console.error(error);
    }
    res.redirect("/");
  });
});

router.get("/:date/:food/delete", (req, res, next) => {
  const { date, food } = req.params;
  const sql = "DELETE FROM tbl_today WHERE date = ? AND food = ?";
  mysql.execute(sql, [date, food], (error, insert, fields) => {
    if (error) {
      console.error(error);
    }
    res.redirect("/");
  });
});

export default router;
