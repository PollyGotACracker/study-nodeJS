import express from "express";
import DB from "../models/index.js";
const BBS = DB.models.tbl_bbs;
const router = express.Router();

/**
 * 전체 데이터 개수 : DB table 의 데이터 개수, listTotalCount
 * 한 화면에 보여질 데이터 개수 : 10개, pageLimit
 * 한 화면에 보여질 페이지 Nav 버튼 개수 : 10개, pageNavCount
 * 현재 선택된 페이지 번호(Nav 버튼 번호), pageNum
 */

// 모듈 전체에 대해서 선행 실행되는 모듈
const pagination = {};
router.all("*", async (req, res, next) => {
  const { pageNum, listLimit, pageNavCount } = req.query;

  try {
    pagination.listTotalCount = await BBS.count();
  } catch (e) {
    console.log(e);
    return {
      CODE: 500,
      CODE_NAME: "BBS_COUNT_ERROR",
      MESSAGE: "BBS 데이터 개수 SQL 오류",
    };
  }

  pagination.listLimit = Number(listLimit) || 10;
  pagination.pageNavCount = Number(pageNavCount) || 10;

  // 전체 데이터를 표현하는 데 몇 페이지(Nav 버튼 총 개수)가 필요한가를 계산하기
  pagination.pageTotalCount = Math.ceil(
    pagination.listTotalCount / pagination.listLimit
  );

  pagination.pageNum = Number(pageNum) || 1;
  // 현재 페이지의 첫 번째 데이터 index 계산(offset)
  // (현재 페이지 번호 - 1) * 한 페이지에서 보여질 데이터 개수
  // 1번 째 페이지: (1 - 1) * 10 = 0
  // 2번 째 페이지: (2 - 1) * 10 = 10
  pagination.offset = (pagination.pageNum - 1) * pagination.listLimit;

  // 화면 하단 pageNav 를 표현할 개수 중 시작NavNum 을 계산하기
  // 현재 선택된 NavNum 을 Nav 중앙에 표시
  pagination.startNavNum =
    pagination.pageNum - Math.floor(pagination.pageNavCount / 2);
  pagination.startNavNum =
    pagination.startNavNum < 1 ? 1 : pagination.startNavNum;
  next();
});

router.get("/", async (req, res, next) => {
  const result = await BBS.findAll({
    limit: pagination.listLimit,
    offset: pagination.offset,
  });
  return res.json({ pagination, bbsList: result });
});

export default router;
