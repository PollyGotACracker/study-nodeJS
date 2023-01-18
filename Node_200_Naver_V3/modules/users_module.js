// router 에서 호출하면 전달받은 데이터를 처리한 후 결과 반환
// userJoin, userLogin

import DB from "../models/index.js";
import { system_error, join_error, login_error } from "../config/error_code.js";
import crypto from "crypto";

const USER = DB.models.tbl_users;

export const userJoin = async (user) => {
  const { username, password, repassword } = user;

  // 유저이름을 입력하지 않았을 때
  if (!username) throw new Error(JSON.stringify(join_error.REQ_USERNAME));

  // USERNAME 중복검사
  let resultUser;
  try {
    resultUser = await USER.findByPk(username);
  } catch (e) {
    throw new Error(JSON.stringify(system_error.SQL_ERROR));
  }
  if (resultUser) {
    throw new Error(JSON.stringify(join_error.OVERLAP_USERNAME));
  }

  // 비밀번호를 입력하지 않았을 때
  if (!password) throw new Error(JSON.stringify(join_error.REQ_PASSWORD));

  // 비밀번호 확인을 입력하지 않았을 때
  if (!repassword) throw new Error(JSON.stringify(join_error.REQ_RE_PASSWORD));

  if (password !== repassword)
    throw new Error(JSON.stringify(join_error.MATCH_PASSWORD));

  /**
   * 비밀번호 암호화
   */
  const encPassword = crypto
    .createHash("sha512") // 암호화 알고리즘
    .update(user.password) // 평문 암호(입력된 암호)
    .digest("base64"); // 인코딩(DB 저장에 문제가 되는 문자열 때문에 인코딩 필요)

  user.password = encPassword;

  /**
   * user table 의 u_level 칼럼 활용
   * 최초로 회원가입을 하면 그 사용자는 ADMIN 이다.
   *    그리고 level 은 0이다.
   * 두번째 사용자부터는 GUEST 또는 일반 사용자 이다.
   *    여기에서는 level 을 9 로 설정한다.
   */

  try {
    const userCount = await USER.count(); // 데이터의 개수 select
    if (userCount) {
      user.u_level = 9;
    } else {
      user.u_level = 0;
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(JSON.stringify(system_error.SQL_ERROR));
  }
  try {
    await USER.create(user);
    console.log(user);
  } catch (err) {
    console.log("User CREATE", err.message);
    throw new Error(JSON.stringify(system_error.SQL_ERROR));
  }
}; // userJoin End

export const userLogin = async (user) => {
  const { username, password } = user;
  let findUser = {}; // 로그인에 성공한 사용자 정보를 return 할 준비

  if (!username) throw new Error(JSON.stringify(login_error.REQ_USERNAME));

  try {
    findUser = await USER.findByPk(username);
  } catch (err) {
    console.log("Find Username", err);
    throw new Error(JSON.stringify(system_error.SQL_ERROR));
  }
  if (!findUser) throw new Error(JSON.stringify(login_error.MATCH_USERNAME));

  if (!password) throw new Error(JSON.stringify(login_error.REQ_PASSWORD));

  const encPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");
  if (encPassword !== findUser.password) {
    throw new Error(JSON.stringify(login_error.MATCH_PASSWORD));
  }

  return findUser;
};
