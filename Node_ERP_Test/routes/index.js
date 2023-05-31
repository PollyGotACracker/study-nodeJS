import express from "express";
import db from "../models/index.js";
const Buyer = db.models.tbl_buyer;

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index");
});

export default router;
