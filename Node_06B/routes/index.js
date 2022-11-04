// root 페이지에서 학생 리스트 20개 까지 표시

import express from "express";
// cf) routes 폴더 내 js 파일에서는 MySQL 모듈이 아닌 사용할 DataBase 를 import 하는 것이다!
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `SELECT * 
  FROM tbl_student 
  ORDER BY st_num
  LIMIT 0, 20`;
  mysql.execute(sql, (err, students, field) => {
    res.render("index", { students });
  });
});

export default router;
