import express from "express";
import { MongoClient } from "mongodb";
import { atlasURL } from "../config/mongoDB.js";

// atlas 접속하기
// new 키워드를 사용하여 MongoClient 클래스를 통하여
// client 객체를 생성하기
// mongoDB 에 연결하기 위한 준비도구
const client = new MongoClient(atlasURL);
// BBS(bbs 라는 이름으로) Collection 시작
const BBS = client.db().collection("bbs");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const bbs = {
    b_date: "2022-11-22",
    b_time: "10:36:00",
    b_writer: "polly",
    b_title: "게시판 시작",
    b_content: "게시판을 작성합시다.",
  };
  try {
    // bbs 데이터 전체 SELECT
    const result = await bbs.save();

    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
  // res.render("index", { title: "callor.com Express" });
});

export default router;
