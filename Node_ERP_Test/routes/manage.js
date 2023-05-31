import express from "express";
import db from "../models/index.js";
const Buyer = db.models.tbl_buyer;

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const buyers = await Buyer.findAll();
    return res.render("list", { buyers });
  } catch (error) {
    res.send("SELECT ERROR");
    console.error(error);
  }
});

router.get("/detail/:b_num", async (req, res, next) => {
  try {
    let buyers = await Buyer.findAll({ where: { b_num: req.params.b_num } });
    buyers = buyers[0].dataValues;
    return res.render("detail", { buyers });
  } catch (error) {
    res.send("SELECT ERROR");
    console.error(error);
  }
});

router.get("/edit/:b_num?", async (req, res, next) => {
  try {
    let buyers = await Buyer.findAll({ where: { b_num: req.params.b_num } });
    buyers = buyers[0].dataValues;
    return res.render("edit", { buyers });
  } catch (error) {
    let buyers = "";
    return res.render("edit", { buyers });
  }
});

router.post("/edit/:b_num?", async (req, res, next) => {
  const num = req.body.b_num;
  try {
    await Buyer.create(req.body);
  } catch (error) {
    await Buyer.update(req.body, { where: { b_num: req.body.b_num } });
  }
  res.redirect(`/manage/detail/${num}`);
});

router.get("/delete/:b_num", async (req, res, next) => {
  try {
    await Buyer.destroy({ where: { b_num: req.params.b_num } });
    return res.redirect(`/manage`);
  } catch (error) {
    res.send("DELETE ERROR");
    console.error(error);
  }
});

export default router;
