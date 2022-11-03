/**
 * express import 하고
 * express.Router() 함수를 사용하여 router 객체 선언
 * router 객체를 export 하여 모듈 선언 완성
 *
 * http://localhost:3000/city 로 요청할 경우
 * "안녕하세요 도시 정보입니다~~" 라고 화면에 나타나도록
 * app.js 에 설정
 */

import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

// cf) app.js 의 app.use 에서 "/city" 경로 설정
// routes 파일에서 사용하는 경로는 "/" 이 "../city/" 와 같음

// http://localhost:3000/city/ 의 요청 처리
router.get("/", (req, res) => {
  const citySelect = "SELECT * FROM city Limit 0, 10"; // 0번 위치부터 10개의 튜플만 반환

  /**
   * mysql 객체(퀵배달)를 통하여 MySQL Server 에게
   * SQL(SELECT)를 보내고, 결과가 되돌아오는 동안
   * 다른 일(코드, 기능)을 수행하라
   * 만약 MySQL Server 에서 데이터가 완료되어 되돌아오거든
   * (error, result, fields)=>{  } 이 함수를 실행하라
   * 이 함수를 비동기(Async) Callback 함수 라고 한다.
   */
  mysql.query(citySelect, (error, result, fields) => {
    res.json(result);
  });
  // res.send("안녕하세요 도시 정보입니다~~");
});

// localhost:3000/city/도시이름 이라고 요청을 하면
router.get("/:name", (req, res) => {
  const ct_name = req.params.name; // req 매개변수의 params 속성으로 name의 값을 ct_name에 저장한다.
  const citySelectWhere = "SELECT * FROM city WHERE name = ?"; // Name 속성에서 ? 와 일치하는 튜플 전체를 조회한다. ? 의 값은 [ct_name]이다.
  mysql.execute(citySelectWhere, [ct_name], (error, result, fields) => {
    res.json(result);
  });
});

/**
 * localhost:3000/city/pop/10000/50000 이라고 요청을 하면
 * 인구 1만 이상 5만 이하의 도시를 웹으로 Response 하시오
 */

// RequestQuery 방식으로 데이터 전달하기
// http://localhost:3000/pop?lt_pop=10000&gt_pop=50000
// queryString : 주소표시줄에 ?변수명=값 형식으로 데이터 전달하기
// 주소표시줄에 변수명이 노출되므로 보안에 취약하다
// 쿼리의 순서와 개수 일치하지 않아도 됨
router.get("/pop", (req, res) => {
  const lt_pop = req.query.lt_pop;
  const gt_pop = req.query.gt_pop;
  const citySelectWhere = "SELECT * FROM city WHERE population BETWEEN ? AND ?";
  // 배열 요소인 변수의 값들이 순서대로 SQL문의 ?에 들어감
  mysql.execute(citySelectWhere, [lt_pop, gt_pop], (error, result, fields) => {
    res.json(result);
  });
});

// RequestParams 방식으로 데이터 전달하기
// http://localhost:3000/pop/10000/50000
// 마치 주소가 이미 만들어진 것처럼 보내서 변수를 노출하지 않는다
// 최근에 많이 사용되는 방법. 쿼리의 순서와 개수 일치해야 함
router.get("/pop/:lt_pop/:gt_pop", (req, res) => {
  const lt_pop = req.params.lt_pop;
  const gt_pop = req.params.gt_pop;
  const citySelectWhere = "SELECT * FROM city WHERE population BETWEEN ? AND ?";
  // 배열 요소인 변수의 값들이 순서대로 SQL문의 ?에 들어감
  mysql.execute(citySelectWhere, [lt_pop, gt_pop], (error, result, fields) => {
    res.json(result);
  });
});

export default router;
