import express from "express";
import { getBooks } from "../../modules/naver_module.js";
import { bookInput, getMyBooks } from "../../modules/books_module.js";
import { OK_RES, BOOK_RES, NAVER_RES } from "../../config/api_res_code.js";
import moment from "moment";

const router = express.Router();

router.get("/search", async (req, res) => {
  const search = req.query?.search;
  if (!search) {
    return res.json(NAVER_RES.NOT_SEARCH);
  }
  let resultBooks;
  try {
    resultBooks = await getBooks(search);
  } catch (err) {
    return res.json(JSON.parse(err.message));
  }
  return res.json(resultBooks);
});

router.get("/my/:username", async (req, res) => {
  const username = req.params.username;
  const myBooks = await getMyBooks({ username });
  return res.json(myBooks);
});

router.post("/insert", async (req, res) => {
  // isbn 으로 다시 서버에 fetch 하여 도서정보를 받아오고
  // 그 정보를 tbl_books 에 insert

  // book 정보를 통째로 client 에서 받는다면
  // 그 정보를 그대로 tbl_books 에 insert
  const { book, username } = req.body;
  try {
    await bookInput(book, username);
  } catch (err) {
    /**
     * catch 문의 err 에는
     * 예외 발생 시 throw 문의 Error 객체가 담긴다.
     * Error 객체는 문자열만 담을 수 있다.
     * 따라서 객체 리터럴을 담기 위해서는
     * 객체 생성 시 JSON.stringify 를 사용하여
     * 해당 데이터를 변환해야 한다.
     *
     * 아래의 err.message 는 Error.prototype.message 이다.
     * message 는 Error 객체에 담았던 전체 데이터이다.
     */
    console.log(err?.message);
    return res.json(JSON.parse(err?.message));
  }
  /**
   * catch 문 밖에서 client 에 결과 전달
   * Error 객체를 받은 것이 아니므로 JSON.parse 를 사용하지 않는다.
   */
  return res.json({ ...OK_RES, MESSAGE: "성공적으로 저장되었습니다." });
});

router.get("/detail/:isbn", async (req, res) => {
  try {
    const result = await getBooks(req.params.isbn);
    let book = result[0];
    book.price = Number(book.discount) / 0.9;
    book = { ...book, odate: moment().format("YYYY[-]MM[-]DD") };
    return res.json(book);
  } catch (err) {
    return res.json(BOOK_RES.BOOK_NOT_FOUND);
  }
});

router.get("/user/:username", async (req, res) => {});

export default router;
