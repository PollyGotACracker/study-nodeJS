// /student 페이지에서 검색 및 데이터 추가

import express from "express";
// cf) routes 폴더 내 js 파일에서는 MySQL 모듈이 아닌 사용할 DataBase 를 import 하는 것이다!
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

// cf) 같은 경로의 메서드 중복은 안된다!
// /student 페이지에서 검색
router.get("/", (req, res) => {
  let st_name = req.query.st_name;
  let sql = "SELECT * FROM tbl_student ORDER BY st_num";
  if (st_name) {
    sql = ` SELECT * FROM tbl_student 
      WHERE st_name LIKE CONCAT('%', ?, '%') 
      ORDER BY st_num `;
  } else {
    st_name = "";
  }

  mysql.execute(sql, [st_name], (err, students, field) => {
    // res.json(students);
    // res.render("student", { students : students })

    // 내부에서(Mysql select 된 데이터) 만들어진 데이터를
    // students 라는 이름의 변수에 저장하여 render 에게 보낸다
    res.render("student/st_main", { body: "list", students });
  });
});

/* cf) res.render() 에서...
 * 1번째 인수는 app.set으로 지정한 ejs의 경로/파일명 문자열이다.
 * 2번째 인수의 ... : "..." 는 ejs 파일에서 조건문으로 지정한 값과 동일하다.
 */

//
router.get("/insert", (req, res) => {
  res.render("student/st_main", { body: "write" });
});

router.post("/insert", (req, res) => {
  const student = req.body;
  console.log(student);
  const sql = `INSERT INTO tbl_student(
    st_num, st_name, st_dept, st_grade, st_tel, st_addr
  ) VALUES (
    ?, ?, ?, ?, ?, ?
  )`;

  // cf) Object.values()를 사용하여 student 객체(사용자가 입력한 데이터)의 속성값을 배열로 반환
  mysql.execute(sql, Object.values(student), (err, result, field) => {
    if (err) {
      console.error(err);
    }
    // cf) 입력한 데이터 중 st_name 값을 path로 지정하여 리디렉션
    res.redirect(`/student?st_name=${student.st_name}`);
  });
});

export default router;
