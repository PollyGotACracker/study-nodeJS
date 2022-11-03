import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  mysql.query(sql, (error, students, fields) => {
    res.render("list", { students });
  });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const sql =
    "SELECT * FROM tbl_student WHERE st_name LIKE CONCAT('%', ?, '%')";
  mysql.execute(sql, [name], (error, students, fields) => {
    res.render("list", { students });
  });
});

export default router;
