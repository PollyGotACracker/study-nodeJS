import express from "express";
import listRouter from "../routes/schooldb.js";
import path from "path";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

app.set("views", path.join("./views"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.send("홈 화면입니다~");
  next();
});

app.use("/list", listRouter);

export default app;
