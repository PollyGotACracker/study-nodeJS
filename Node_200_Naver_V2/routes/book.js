import express from "express";
import { getBooks } from "../modules/naver_module.js";
import Books from "../modules/books_module.js";
import DB from "../models/index.js";
// import { Op } from "sequelize";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;
const USERS = DB.models.tbl_users;

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.search;
  if (!search) {
    return res.render("book/list", { BOOKS: [] });
  }
  /**
   * getBooks() 함수 throw new Error() 가 실행되면
   * getBooks() 함수를 호출하는 아래의 코드에서 Exception 이 발생한다.
   * 발생한 Exception 을 여기에서 처리(try, catch)한다.
   */
  try {
    const book_list = await getBooks(search);
    return res.render("book/list", { BOOKS: book_list });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.get("/detail/:isbn", async (req, res) => {
  try {
    const result = await getBooks(req.params.isbn);
    const book = result[0];
    book.price = Number(book.discount) / 0.9;

    return res.render("book/detail", { BOOK: book });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.post("/insert", async (req, res) => {
  const user = {
    username: "polly",
    password: "1234",
    u_level: 0,
    u_name: "홍길동",
  };

  const book = req.body;

  // 도서정보를 books_module.js 의 bookInput()에게 이전
  try {
    await Books.bookInput(book, user);
  } catch (err) {
    console.log(err);
    return res.json({ msg: "오류 발생", error: err });
  }
  const mybooks = await MY_BOOKS.findAll();
  const books = await BOOKS.findAll();

  res.redirect("/book");
});

export default router;
