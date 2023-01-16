import DB from "../models/index.js";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;
const USERS = DB.models.tbl_users;

export const bookInput = async (book, user) => {
  const my_book = {
    my_username: user.username,
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
      // insert 가 실패하면 update 를 다시 한번 시도하기
      await BOOKS.update(book, { where: { isbn: book.isbn } });
    } catch (e) {
      console.log("BOOK UPDATE", e);

      // return res.send("도서정보 저장 오류 발생");
      // exception 이 발생하면 직접 처리하지 않고 상위 모듈로 전가(전달)하기
      throw new Error("도서정보 저장 오류");
    }
  }

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
      throw new Error("내 도서(MyBook) 정보 추가 오류");
    }
  }
};

export default { bookInput };
