import express from "express";
import path from "path";
import logger from "morgan";

// router import
import indexRouter from "../routes/index.js";
import studentRouter from "../routes/student.js";

const app = express();

// app(express) 서버에 middleware 설정하기
// middleware : express 서버가 작동되는 데 필요한 중간 도구들

app.use(logger("dev"));
// form 에서 input 데이터를 담아 post 전송할 때
// 데이터를 수신하고 req.body 객체로 변환하는 도구
// extended:false : NodeJS 자체에서 기본으로 제공하는 도구 사용
// extended:true : express 내부에서 qs 라는 외부 도구를 사용
app.use(express.urlencoded({ extended: false }));

/**
 * path.join() 이 바라보는 폴더
 * 현재 프로젝트는 node ./bin/www.js 를 실행한 상태이다
 * 이때 이 명령을 실행한 곳이 project 폴더(Node_06A)이다
 *
 * path.join("views") 라는 표현은
 * Node_06A/views 폴더를 찾아라 라는 표현이다
 *
 * cf) path.join 경로 설정은 root 폴더인 Node_06A를 기준으로 한다
 */
app.set("views", path.join("views"));
app.set("view engine", "ejs");

// Node_06A/public 폴더 지정
app.use(express.static(path.join("public")));

/**
 * router 를 설정한 후에는 res 코드를 주석처리하여
 * 실행되지 않도록 한다
 *
 * app.use() 함수의 callback 에서는 res(응답객체)와 관련된
 * 코드를 사용하지 않는다
 * res 객체와 관련된 코드를 사용하면
 * 이후의 모든 router 관련 코드가 실행되지 않는다
 * app.use() 함수의 callback 에서 메시지 출력이 필요할 경우는
 * console 를 통하여 출력하고
 * 코드 끝부분에 반드시 next() 함수를 실행해 주어야 한다
 *
 * 이렇게 코드를 변경해야
 * router 관련 코드가 정상 작동된다
 */
app.use("/", (req, res, next) => {
  // res.send("Welcome Express Server");
  console.log("express Start!!");
  next();
});
app.use("/", indexRouter);
app.use("/student", studentRouter);

export default app;
