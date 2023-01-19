// client 에 보내 사용자에게 표시하기 위한 데이터
// system_error, book_error, join_error, login_error
// sql query 처리 / mybook 추가 / 회원가입 / 로그인

export const system_error = {
  SQL_ERROR: {
    CODE: "SQL_SYSTEM",
    MESSAGE: "* SQL 오류: 관리자에게 문의해주세요.",
  },
};

export const book_error = {
  BOOK_INSERT_ERROR: {
    CODE: "BOOK_INSERT_ERROR",
    MESSAGE: "도서정보 저장 오류",
  },
  MY_BOOK_INSERT_ERROR: {
    CODE: "MY_BOOK_INSERT_ERROR",
    MESSAGE: "내 도서(MyBook) 정보 추가 오류",
  },
};

// 회원가입을 할 때 강제로 발생시킬 exception 정보
// 회원가입을 할 때 유효성 검사를 하기 위한 정보
export const join_error = {
  REQ_USERNAME: {
    CODE: "REQ_USERNAME",
    MESSAGE: "* 유저이름은 반드시 입력해야 합니다.",
  },
  OVERLAP_USERNAME: {
    CODE: "OVERLAP_USERNAME",
    MESSAGE: "* 이미 가입된 유저입니다.",
  },
  REQ_PASSWORD: {
    CODE: "REQ_PASSWORD",
    MESSAGE: "* 비밀번호는 반드시 입력해야 합니다.",
  },
  REQ_RE_PASSWORD: {
    CODE: "REQ_RE_PASSWORD",
    MESSAGE: "* 비밀번호 확인을 입력해주세요.",
  },
  MATCH_PASSWORD: {
    CODE: "MATCH_PASSWORD",
    MESSAGE: "* 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
  },
};

export const login_error = {
  REQ_USERNAME: {
    CODE: "REQ_USERNAME",
    MESSAGE: "* 유저이름은 반드시 입력해야 합니다.",
  },
  MATCH_USERNAME: {
    CODE: "MATCH_USERNAME",
    MESSAGE: "* 가입되지 않은 유저입니다.",
  },
  REQ_PASSWORD: {
    CODE: "REQ_PASSWORD",
    MESSAGE: "* 비밀번호는 반드시 입력해야 합니다.",
  },
  MATCH_PASSWORD: {
    CODE: "MATCH_PASSWORD",
    MESSAGE: "* 비밀번호가 일치하지 않습니다. 다시 확인해주세요.",
  },
};
