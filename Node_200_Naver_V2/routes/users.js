import express from "express";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
const router = express.Router();

router.get("/join", async (req, res, next) => {
  const user = { username: "", password: "", repassword: "" };
  return res.render("user/join", { ERROR: { CODE: 0 }, USER: user });
});

router.post("/join", (req, res) => {
  const { username, password, repassword } = req.body;
  const resultError = { CODE: 0, MESSAGE: "" };
  if (!username) {
    resultError.CODE = 1;
    resultError.MESSAGE = "* 유저이름은 필수 항목입니다.";
  }
  if (!password) {
    resultError.CODE = 2;
    resultError.MESSAGE = "* 비밀번호는 필수 항목입니다.";
  }
  if (!repassword) {
    resultError.CODE = 3;
    resultError.MESSAGE = "* 비밀번호 확인을 입력해주세요.";
  }
  if (password !== repassword) {
    resultError.CODE = 4;
    resultError.MESSAGE = "* 비밀번호가 일치하지 않습니다.";
  }
  return res.render("user/join", { ERROR: resultError, USER: req.body });
});

export default router;
