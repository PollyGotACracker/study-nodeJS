import express from "express";
import DB from "../models/index.js";
const Product = DB.models.tbl_product;
const router = express.Router();

router.get("/", async (req, res) => {
  //  if (req.session.user) {
  const products = await Product.findAll();
  return res.render("product/list", { products });
  //  }
  //  res.redirect("/users/login?error=LOGIN");
});

router.get("/insert", (req, res) => {
  return res.render("product/write");
});

router.post("/insert", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await Product.create(data);
    return res.redirect("/product");
  } catch (error) {
    console.error(error);
    res.send("SQL INSERT ERROR");
  }
});

router.get("/detail/:pcode", async (res, req) => {
  const product = req.params.pcode;
  console.log(product);
  try {
    return res.render("product/detail", { product });
  } catch (error) {
    console.error(error);
    res.send("정보를 불러올 수 없습니다.");
  }
});

export default router;
