import express from "express";
// path: path.join 을 사용하기 위한 middleware
import path from "path";
// morgan: console 에 logger 표시
import logger from "morgan";

// routes
import calcRouter from "../routes/calc.js";
import coutryRouter from "../routes/country.js";

const app = express();

// app.use
// express 에 포함된 미들웨어(Middleware, 중간자 도구) 설정
app.use(logger("dev"));

// form 에서 input 데이터를 담아 post 전송할 때
// 데이터를 수신하고 req.body 객체로 변환
app.use(express.urlencoded({ extended: false }));

// public 폴더를 router에서 연산을 거치지 않아도 되는 Static File 로 설정
app.use(express.static(path.join("public")));

// app.set
// PROJECT/views 폴더를 views 이름으로, view engine은 ejs 로 세팅
app.set("views", path.join("views"));
app.set("view engine", "ejs");

// RequestMapping 과 router 를 연결하기
app.use("/calc", calcRouter);
app.use("/country", coutryRouter);

export default app;
