import NAVER from "../config/naver_config.js";

const getBooks = async (search) => {
  const naverFetchOption = {
    method: "GET",
    headers: {
      [NAVER.CLIENT_ID.KEY]: NAVER.CLIENT_ID.VALUE,
      [NAVER.CLIENT_SECRET.KEY]: NAVER.CLIENT_SECRET.VALUE,
    },
  };
  const queryString = `${NAVER.BOOK_URL_JSON}?query=${search}`;

  let response = null;
  try {
    response = await fetch(queryString, naverFetchOption);
  } catch (err) {
    console.log("fetch error", err);
    /**
     * 예외 처리...
     * 여기에 코드가 다다르면 expection(예외) 발생 상황이다.
     * 문제 해결을 여기에서 수행하지 않고
     * getBooks() 함수를 호출한 곳으로 해결 수행을 되돌리기(던지기;throw)
     * 오류 처리를 다른 곳으로 일임하기
     */
    throw new Error(response.json());
  }

  let result = null;
  try {
    result = await response.json();
  } catch (err) {
    console.log("JSON 변환 오류", err);
    throw new Error("JSON 변환 오류");
  }

  const book_list = result.items.map((item) => {
    return { ...item, author: item.author.replaceAll("^", ", ") };
  });

  return book_list;
};

export { getBooks };
