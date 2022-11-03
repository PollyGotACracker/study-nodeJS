import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

/**
 * http://localhost:3000/country/100/500
 * 각 국가의 GNP 가 100 이상 500 이하인 국가 리스트 SELECT
 *
 * http://localhost:3000/country/100
 * 각 국가의 GNP가 0이상 100 이하인 국가 리스트 SELECT
 *
 * 이 두 개의 요청을 한 개의 router.get() 에서 처리
 */
// http://localhost:3000/city/country 의 요청 처리

router.get("/", (req, res) => {
  // res.send("나는 국가 정보 입니다");
  const countrySelect = "SELECT * FROM country Limit 0, 10";
  mysql.query(countrySelect, (error, result, fields) => {
    res.json(result);
  });
});

router.get("/:gt_pop?/:lt_pop", (req, res) => {
  let gt_pop = req.params.gt_pop;
  let lt_pop = req.params.lt_pop;
  const queryParams = [];
  queryParams.push(lt_pop);
  let queryString = "SELECT * FROM country WHERE GNP <= ?";

  if (gt_pop) {
    queryString += " AND GNP >= ?";
    queryParams.push(gt_pop);
  }
  mysql.execute(queryString, queryParams, (error, result, fields) => {
    res.json(result);
  });
});

export default router;
