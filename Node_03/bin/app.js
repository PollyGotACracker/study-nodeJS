/**
 * express framework 와 관련된 코드를
 * 별도 module 로 분리하기
 */

import express from "express";

// router modules import
import rootRouter from "../routes/root.js";
import userRouter from "../routes/user.js";
import cityRouter from "../routes/city.js";
import countryRouter from "../routes/country.js";

// app 모듈 생성
const app = express();

app.use("/", (req, res, next) => {
  console.log("Express Request Start");
  next();
});

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/city", cityRouter);
app.use("/country", countryRouter);

export default app;
