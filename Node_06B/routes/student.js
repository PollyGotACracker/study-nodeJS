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
  // /insert 페이지와 /st_num/update 페이지가 같은 폼을 공유하기 때문에(body:"write")
  // 학생 정보 추가 버튼을 클릭했을 때 오류를 방지하기 위해 student:{}(객체이므로 중괄호)
  res.render("student/st_main", { body: "write", student: {} });
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

    /**
     * POST /student/insert
     * 코드가 여기까지 실행되면 추가된 학생정보가
     * 잘 추가되었는지 확인하기 위하여
     * 다시 학생정보List 를 보여줘야 한다.
     *
     * 이미 학생정보List 를 보여주는 router 를 만들어두었다.
     * 다시 여기에서 List 를 SELECT 하여 보여주는 코드를 작성하는 대신
     * server 의 router 에서 web browser 에게 요청을 한다.
     * 이미 List 를 보여주는 router(RequestMapping) 가 있으니
     * 다시 한번 요청을 해달라
     */
    // cf) 입력한 데이터 중 st_name 값을 path 로 지정하여 리디렉션. input 이름 검색 결과
    res.redirect(`/student?st_name=${student.st_name}`);
  });
});

router.get("/:st_num/detail", (req, res) => {
  const st_num = req.params.st_num;
  const sql = "SELECT * FROM tbl_student WHERE st_num = ?";

  /**
   * DB SQL을 코딩할 때 주의할 사항!
   * 아래와 같이 문자열을 직접 코딩하여
   * WHERE 절을 만들 경우
   *  // const sql = `SELECT * FROM tbl_student WHERE st_num = ${st_num}`;
   *
   * 예를 들어 S OR 1 = 1 과 같은 문자열을 st_num 변수에
   * 담아서 전달을 하면 WHERE 의 조건이 무력화되는
   * 명령이 실행된다.
   *
   * 만약 DELETE 나 UPDATE 명령을 수행할 때 이러한 코드를 작성하면
   * 해커에 의해 DB 가 바로 손상될 수 있다(1 = 1 은 TRUE 이므로, WHERE문 무력화).
   * 이러한 해킹 공격을 DB Injection 공격이라고 한다(고전적).
   * 매우 주의해야 한다.
   * (최근 DBMS 에서는 이러한 쿼리문이 동작하지 않음)
   */

  mysql.execute(sql, [st_num], (err, student, field) => {
    // res.json(student);
    res.render("student/st_main", { body: "detail", student: student[0] });
  });
});

/**
 * /student/학번/update 로 Request가 되면
 * Db 에서 학생정보를 SELECT 하고
 * st_write 로 보내서 input box 에 정보를 표시하기
 */

router.get("/:st_num/update", (req, res) => {
  const st_num = req.params.st_num;
  const sql = "SELECT * FROM tbl_student WHERE st_num = ?";
  mysql.execute(sql, [st_num], (err, student, field) => {
    // 객체 속성 중 받아올 데이터에서
    // key 는 ejs 파일에서 사용할 변수명,
    // value 는 execute 메서드의 callback 에서 2번째 매개변수의 인수를 사용
    res.render("student/st_main", { body: "write", student: student[0] });
  });
});

router.post("/:st_num/update", (req, res) => {
  // cf) 객체의 destructuring 은 선언할 변수의 이름을 해당 객체의 key 로 해야 한다.
  // 객체의 value 는 선언한 각각의 변수에 그대로 전달된다.
  const { st_num, st_name, st_dept, st_grade, st_tel, st_addr } = req.body;

  // cf) SQL문에 변수를 + 로 연결하지 말 것
  const sql =
    "UPDATE tbl_student SET st_name = ?, st_dept = ?, st_grade = ?, st_tel = ?, st_addr = ? WHERE st_num = ?";
  mysql.execute(
    sql,
    [st_name, st_dept, st_grade, st_tel, st_addr, st_num],
    (err, result, field) => {
      if (err) {
        console.error(err);
      }
      // 변경되었으면 변경된 학생의 정보를 보여주기
      // res.redirect(`/student?st_name=${st_name}`);  input 이름 검색 결과
      res.redirect(`/student/${st_num}/detail`);
    }
  );
});

/*
router.post("/:st_num/update", (req, res) => {
  const st_num = req.body.st_num;
  const student = Object.values(req.body);
  const num = student.shift();
  student.push(num);
  // cf) SQL문에 변수를 + 로 연결하지 말 것
  const sql =
    "UPDATE tbl_student SET st_name = ?, st_dept = ?, st_grade = ?, st_tel = ?, st_addr = ? WHERE st_num = ?";
  // cf) 이미 만들어진 배열 변수를 전달할 때 대괄호로 감싸지 말 것
  mysql.execute(sql, student, (err, result, field) => {
    if (err) {
      console.error(err);
    }
    // 변경되었으면 변경된 학생의 정보를 보여주기
    res.redirect(`/student/${st_num}/detail`);
  });
});
*/

router.get("/:st_num/delete", (req, res) => {
  const st_num = req.params.st_num;
  const sql = "DELETE FROM tbl_student WHERE st_num = ?";

  mysql.execute(sql, [st_num], (error, students, fields) => {
    res.redirect(`/student`);
  });
});
export default router;
