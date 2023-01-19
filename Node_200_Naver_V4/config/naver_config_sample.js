/**
 * Naver 개발자 센터에서 발급받은 애플리케이션 Id Secret 을
 * 다음 VALUE 항목에 추가한 후 이 파일을 naver_config.js 로 이름변경하여
 * 프로젝트를 시작
 */
export const CLIENT_ID = { KEY: "X-Naver-Client-Id", VALUE: "YOUR CLIENT ID" };
export const CLIENT_SECRET = {
  KEY: "X-Naver-Client-Secret",
  VALUE: "YOUR CLIENT SECRET",
};
export const BOOK_URL_JSON = "https://openapi.naver.com/v1/search/book.json";

export { CLIENT_ID, CLIENT_SECRET, BOOK_URL_JSON };
