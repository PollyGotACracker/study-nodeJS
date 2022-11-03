// http Service 용 서버를 만드는 도구
import http from "http";
// Web Application Server 를 구축하는 도구
// framework 라고 한다
import express from "express";
import { read } from "fs";

const host = "127.0.0.1";
const port = 3000;

// client 로부터 요청이 들어왔을 때 실행하는 함수
const createCallback = () => {
  console.log("Server Create");
};

// express framework 를 사용하기 위한 도구
const app = express();
// NodeJS 의 http 서비스와 express framework 를 연동하기
const server = http.createServer(app);
server.listen(port, host, () => {
  console.log("Start Server");
});

/**
 * form 에서 POST method 로 전송된 데이터를
 * req.body 속성으로 접근하기 위한 설정(body 데이터를 해석)
 * extended: false 옵션은 NodeJS에 기본으로 내장된 querystring 모듈 사용
 */
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.end("Hello Root");
});

app.get("/user", (req, res) => {
  res.end("Hello User");
});

// cf) /:name은 속성명이다. name 속성의 값을 req.params.name 으로 가져온다
app.get("/user/:name", (req, res) => {
  // cf) Header 의 Content-Type 속성에 UTF-8 적용, 영어 이외 글자도 사용 가능
  res.setHeader("Content-Type", "text/html;charset=UTF-8");
  res.end(`Hello ${req.params.name} !!!`);
});
app.get("/korea", (req, res) => {
  res.end("Welcome to Korea");
});

/**
 * form 에서 입력된 데이터를 GET method 로 받기
 * GET method 로 데이터가 전달되면
 * 주소표시줄에 데이터가 노출되어 보안에 매우 취약하다
 * 또한 전체 문자열의 길이가 255자를 넘으면 데이터가 잘린다
 * 암호화 등을 전혀 수행할 수 없다
 *
 * 그래서 GET 은 주로 데이터를 서버에 요청할 때 사용한다
 */
app.get("/input", (req, res) => {
  const query = req.query;
  // query의 속성명은 html input tag의 name 값과 동일하다
  const data = {
    이름: query.name,
    전화번호: query.tel,
  };
  res.json(data);
});

/**
 * cf)
 * GET: 값이 데이터 주소의 query string에
 * POST: 값이 데이터 body에(payload)
 * HTTPS를 사용하면 보안 연결
 */

/**
 * form 에서 입력한 데이터를 POST method 로 받기
 * form 에서 입력한 데이터를 POST 로 보내면
 *    form package 의 body 영역에 데이터가 포장되어서
 *    전송된다
 * 이 데이터는 일단 주소표시줄에 노출되지 않고 감춰져서
 * 보안에 유리하다
 * 또한 body 영역에 포장된 데이터는 암호화가 비교적 쉽다
 * 따라서 암호화 도구(https)를 사용하면 데이터를 중간에
 *    탈취하기가 어려워진다
 * body 영역에 포장된 데이터는 데이터 용량에 제한이 없다
 *    파일 업로드 등을 할 때는 반드시 POST 로 전송해야 한다
 */
app.post("/input", (req, res) => {
  const body = req.body;
  const data = {
    이름: body.name,
    전화번호: body.tel,
    어디로: "우체국, POST",
  };
  res.json(data);
});



/**
 * cf)
 * https://stackoverflow.com/questions/15601703/difference-between-app-use-and-app-get-in-express-js
 * 
 * app.use() is intended for binding middleware to your application. 
 *    The path is a "mount" or "prefix" path and limits the middleware 
 *    to only apply to any paths requested that begin with it. 
 *    It can even be used to embed another application.
 * 
 * app.get(), on the other hand, is part of Express' application routing 
 *    and is intended for matching and handling a specific route 
 *    when requested with the GET HTTP verb.
 */

/**
 * cf)
 * 응답 메소드
 * res.download()	파일이 다운로드되도록 프롬프트
 * res.end()	응답 프로세스를 종료
 * res.json()	JSON 응답을 전송
 * res.jsonp()	JSONP 지원을 통해 JSON 응답을 전송
 * res.redirect()	요청의 경로를 재지정
 * res.render()	보기 템플리트를 렌더링
 * res.send()	다양한 유형의 응답을 전송(단 한번 수행)
 * res.sendFile()	파일을 옥텟 스트림의 형태로 전송
 * res.sendStatus()	응답 상태 코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송
 * */
