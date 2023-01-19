import express from "express";
import { userJoin, userLogin } from "../../modules/users_module.js";

const router = express.Router();

router.get("/join", async (req, res, next) => {
  const user = { username: "", password: "", repassword: "" };
  return res.render("users/join", { ERROR: { CODE: 0 }, USER: user });
});

router.post("/join", async (req, res) => {
  try {
    await userJoin(req.body);
    return res.redirect("/");
    // catch 문은 userJoin 의 error 결과를 반환한다.
  } catch (err) {
    return res.render("users/join", {
      ERROR: JSON.parse(err.message),
      USER: req.body,
    });
  }
});

router.get("/login", (req, res) => {
  // ?error=LOGIN 요청을 하면
  // LOGIN_MSG = {"LOGIN" : "LOGIN"}
  // query 에 error 값이 있으면 LOGIN_MSG 에 setting
  const LOGIN_MSG = { [req.query.error]: req.query.error };
  const user = { username: "", password: "", repassword: "" };
  return res.render("users/login", {
    ERROR: { CODE: 0 },
    USER: user,
    LOGIN_MSG,
  });
});

router.post("/login", async (req, res) => {
  let resultUser = {};
  try {
    resultUser = await userLogin(req.body);
    /**
     * session 에 데이터를 저장할 때
     * 비밀번호와 같은 민감한 정보는 삭제하는 것이 좋다.
     */
    resultUser.password = null;
    req.session.user = resultUser;
    // return res.json(resultUser);
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("users/login", {
      ERROR: JSON.parse(err.message),
      USER: req.body,
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  const sendStr = `
  <script>
    alert("로그아웃 되었습니다.")
    document.location.href="/"
  </script>
  `;
  return res.send(sendStr);
});

export default router;
