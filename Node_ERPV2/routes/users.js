import express from "express";
import DB from "../models/index.js";
const Users = DB.models.tbl_users;
const router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  const error = req.query.error;
  res.render("users/login", { error });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // DB 로부터 username 데이터 조회하기
  const user = await Users.findByPk(username);
  // user 정보가 조회되면
  if (user) {
    // select 된 데이터의 비밀번호 값과 input 에서 전달된 비밀번호가 맞는지 검사
    if (user.password !== password) {
      // 비밀번호가 틀리면 다시 로그인으로 되돌려보내기
      // 이 때 error 변수에 메시지 전달하기
      return res.redirect("/users/login?error=PASSWORD");
    }
  } else {
    // user 정보가 조회되지 않으면
    // 다시 로그인으로 되돌려보내기
    // 이 때 error 변수에 메시지 전달하기
    return res.redirect("/users/login?error=USERNAME");
  }

  // 여기에 코드가 도착하면 user 정보가 있고, 비번도 맞고
  req.session.user = user; // DB 의 user 정보를 세팅
  // cf) session 을 저장하라고 request 를 보내는 것이므로 req 사용!!!!
  req.session.save(() => {
    res.redirect("/");
  });

  /*
  if (username === "polly" && password === "12345") {
    req.session.user = {
      username: username,
      real_name: "홍길동",
      nick_name: "성춘향",
      user_role: 1,
    };
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    const loginFail = {
      status: "USERNAME",
    };
    res.redirect("/users/login");
  }
  */
});

router.get("/logout", (req, res) => {
  delete req.session.user;
  req.session.save(() => {
    res.redirect("/");
  });
});

export default router;
