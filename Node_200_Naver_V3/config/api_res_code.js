// client 에게 보내서 내부적으로 처리하기 위한 데이터
// user_res_code : 로그인 결과 반환

export const user_res_code = {
  OK: { CODE: 200, MSG: {} },
  MATCH_NOT_USERNAME: {
    CODE: 401,
    SUB_CODE: "USERNAME",
    MSG: "USERNAME 이 없음",
  },
  MATCH_NOT_PASSWORD: {
    CODE: 401,
    SUB_CODE: "PASSWORD",
    MSG: "PASSWORD 가 맞지 않음",
  },
  USER_NOT_SESSION: { CODE: 403, MSG: "로그인 정보 없음" },
  SYSTEM_SQL_ERROR: { CODE: 500, MSG: "SQL 오류 발생" },
};
