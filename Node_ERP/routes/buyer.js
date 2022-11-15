import express from "express";
import DB from "../models/index.js";
const Buyer = DB.models.tbl_buyer;
const router = express.Router();

router.get("/", async (req, res) => {
  const buyers = await Buyer.findAll();
  res.render("buyer/list", { buyers });
});

router.get("/insert", (req, res) => {
  res.render("buyer/write", { buyer: {} });
});

router.post("/insert", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await Buyer.create(data);
    res.redirect("/buyer");
  } catch (error) {
    console.error(error);
    res.send("SQL 오류");
  }
});

router.get("/detail/:bcode", async (req, res) => {
  const bcode = req.params.bcode;
  try {
    /**
     * find() 함수는 1개의 데이터이더라도 결과값이 무조건 배열이다.
     * findOne() 함수는 1개의 결과만 찾고
     *    결과가 여러개이더라도 최초의 한개만 추출한다.
     *    결과는 무조건 단일 객체이다.
     */
    const buyer = await Buyer.findOne({ where: { b_code: bcode } });
    res.render("buyer/detail", { buyer });
  } catch (error) {
    res.send("SQL 오류: 데이터를 찾을 수 없음");
  }
});

router.get("/update/:bcode", async (req, res) => {
  const bcode = req.params.bcode;
  try {
    const buyer = await Buyer.findOne({ where: { b_code: bcode } });
    res.render("buyer/write", { buyer: buyer });
  } catch (error) {
    console.error(error);
    res.send("SQL 오류: 데이터를 찾을 수 없음");
  }
});

router.post("/update/:bcode", async (req, res) => {
  try {
    await Buyer.update(req.body, { where: { b_code: req.body.b_code } });
    res.redirect(`/buyer/detail/${req.body.b_code}`);
  } catch (error) {
    res.send("SQL 오류");
  }
});

router.get("/delete/:bcode", async (req, res) => {
  const bcode = req.params.bcode;
  try {
    await Buyer.destroy({ where: { b_code: bcode } });
    res.redirect("/buyer");
  } catch (error) {
    res.send("SQL 오류");
  }
});

/**
 * web 에서 거래처 코드 자동생성을 요청할 때
 * DB 에서 b_code 가장 큰 값 + 1을 연산하여
 * web Response 하는 router
 *
 * 가장 큰 거래처 코드가 B0001 < B0002 < B0111 이렇게 등록되어 있을 때
 * B0112 코드를 자동 생성하여 response 하기
 */
router.get("/get/bcode", async (req, res) => {
  /**
   * sequelize 에서는 기본적인 CRUD 를 함수로 제공한다.
   * 하지만 기본적으로 제공하는 기능이 아닌 특별한 SQL 을 사용하는 방법
   * 이 때 기본 이외의 별도 SQL 을 작성하는 것을 Raw SQL Query 라고 한다.
   */
  const rawSQL = `SELECT * FROM tbl_buyer ORDER BY b_code DESC LIMIT 1`;
  try {
    const [buyer, field] = await DB.sequelize.query(rawSQL, { model: Buyer });
    let bcode = "B0000"; // 거래처코드 Domain(코드 규칙) 이라고 하자.

    /**
     * 거래처 table 에서 조회한 데이터가 있으면
     * 조회한 데이터의 거래처코드를 bcode 에 담고
     * 그렇지 않으면 B0000 을 담아라
     */
    bcode = buyer?.b_code || bcode;

    // bcode 값을 0번째 앞부터 1번째 앞까지 자르기: B 문자열 한 개 추출
    const prefix = bcode.substring(0, 1);
    // bcode 값을 1번째 앞부터 나머지 전부: 0000 부분 문자열 추출
    const suffix = bcode.substring(1);
    // suffix 문자열형 숫자를 실제 숫자로 변경하고 1 증가
    const codeSeq = Number(suffix) + 1;
    // 만약 codeSeq 값이 3 이라면 00003 형식의 문자열을 만들어라
    bcode = `0000${codeSeq}`; // 00003
    bcode = bcode.substring(bcode.length - 4); // 0003
    bcode = prefix + bcode; // B0003
    res.send(bcode);
  } catch (error) {
    res.send("SQL 오류 발생");
  }
});

/**
 * cf)
 * bcode = `0000${codeSeq}`; 에서 자릿수 4개 추가
 * bcode = bcode.substring(bcode.length - 4); 에서
 * string.length - 4는 문자열 길이 + 0000 4개에서 0을 필요한 만큼만 남기고 제거
 * 0/0002(5 - 4 = 1) ==> 0002, 00/0022(6 - 4 = 2) ==> 0022,
 * 000/0222(7 - 4 = 3) ==> 0222, 0000/2222(8 - 4 = 4) ==> 2222
 */

router.get("/check/:bcode", async (req, res) => {
  const bcode = req.params.bcode;
  try {
    const buyer = await Buyer.findByPk(bcode);
    console.log(buyer);
    if (buyer) {
      return res.send({ status: "YES", message: "등록된 거래처 코드" });
    } else {
      return res.send({ status: null, message: "사용할 수 있는 코드" });
    }
  } catch (error) {
    res.send("SQL 오류 발생");
  }
});

/**
 * cf)
 * findByPk() 메서드는 지정된 기본키를 이용하여
 * 테이블에서 해당 튜플 하나를 리턴한다.
 */

export default router;
