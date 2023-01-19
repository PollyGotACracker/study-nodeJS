// router 에서 호출하면 전달받은 데이터를 처리한 후 결과 반환
// bookInput, getMyBooks

import DB from "../models/index.js";
import { BOOK_RES } from "../config/api_res_code.js";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;

export const bookInput = async (book, username) => {
  // 만약 사용자 정보(username) 값이 없으면 더 이상 진행하지 않는다.
  // 호출한 쪽에서 if(!bookInput()) ... 이러한 코드는
  // return null, return false 가 동일한 효과를 낸다.

  if (!username) return null;

  const my_book = {
    my_username: username, // 로그인 정보가 없으면 null 값
    my_isbn: book.isbn,
    my_odate: book.odate,
    my_oprice: book.discount,
  };

  // 도서정보 저장하기
  try {
    await BOOKS.create(book);
  } catch (err) {
    console.log("BOOK CREATE", err);
    try {
      await BOOKS.update(book, { where: { isbn: book.isbn } });
    } catch (e) {
      console.log("BOOK UPDATE", e);
      // return res.send("도서정보 저장 오류 발생");
      // exception 이 발생하면 직접 처리하지 않고 상위 모듈로 전가(전달)하기

      /**
       * 2023-01-17 변경사항
       * Error exception 이 발생할 때 단순 문자열을 전달하지 않고
       * JSON 객체 type 의 데이터 전달하기
       * 이때 JSON 객체 type 은 Stringify(변환)하여 전달한다.
       * Error() 클래스는 문자열만 전달할 수 있기 때문이다.
       */
      throw new Error(JSON.stringify(BOOK_RES.BOOK_NOT_CREATE));
    }
  }

  console.log(my_book);
  // 내(user) 도서정보 저장하기
  try {
    await MY_BOOKS.create(my_book);
  } catch (err) {
    console.log("MYBOOK CREATE", err);
    try {
      await MY_BOOKS.update(my_book, {
        // Op.and 속성 대신 where {조건1, 조건2, ...} 을
        // 부여하면 조건1 and 조건2 and... 이 성립된다(and가 기본값).
        where: {
          my_isbn: my_book.my_isbn,
          my_username: my_book.my_username,
        },
      });
    } catch (e) {
      console.log("MYBOOK UPDATE", e);
      throw new Error(JSON.stringify(BOOK_RES.MY_BOOK_NOT_CREATE));
    }
  }
};

export const getMyBooks = async (user) => {
  const username = user.username;
  let myBooks = null;
  try {
    myBooks = await MY_BOOKS.findAll({
      where: { my_username: username },
      include: "my_isbn_tbl_book",
    });
  } catch (err) {
    console.log(err);
    throw new Error(JSON.stringify(BOOK_RES.MY_BOOK_NOT_FOUND));
  }

  const myBooksInfo = myBooks.map((book) => {
    return book.my_isbn_tbl_book;
  });
  return myBooksInfo;
};

export default { bookInput, getMyBooks };
