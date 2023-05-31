import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const Today = DB.models.tbl_today;

/* GET home page. */
router.get("/", async (req, res, next) => {
  const todays = await Today.findAll();
  res.render("index", { todays });
});

router.post("/", async (req, res) => {
  res.redirect("/");
});

// router.get("/:seq/delete", async (req, res) => {
//   const seq = req.params.seq;
//   console.log(seq);
//   try {
//     await mysqlConn.promise().execute(TD_DELETE, [seq]);
//   } catch (error) {
//     console.log(error);
//     return res.end("delete SQL 문제 발생");
//   }
//   res.redirect("/");
// });

export default router;
