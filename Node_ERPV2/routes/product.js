import express from "express";
import DB from "../models/index.js";
const Product = DB.models.tbl_product;
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.user) {
    const products = await Product.findAll();
    return res.render("product/list", { products });
  }
  res.redirect("/users/login?error=LOGIN");
});

router.get("/insert", (req, res) => {
  if (req.session.user && req.session.user.user_role < 5) {
    return res.render("product/write", { product: {} });
  }
  res.redirect("/users/login?error=ROLE");
});

router.post("/insert", async (req, res) => {
  const user = req.session?.user;
  if (!user || !user?.user_role || user.user_role >= 5) {
    return res.redirect("/users/login?error=ROLE");
  }

  const data = req.body;
  console.log(data);
  try {
    await Product.create(data);
    res.redirect("/product");
  } catch (error) {
    console.error(error);
    res.send("SQL INSERT ERROR");
  }
});

router.get("/detail/:pcode", async (req, res) => {
  const user = req.session?.user;
  if (!user) {
    return res.redirect("/users/login?error=ROLE");
  }

  const pcode = req.params.pcode;
  console.log(pcode);
  try {
    const product = await Product.findOne({ where: { p_code: pcode } });
    res.render("product/detail", { product });
  } catch (error) {
    console.error(error);
    res.send("정보를 불러올 수 없습니다.");
  }
});

router.get("/update/:pcode", async (req, res) => {
  const user = req.session?.user;
  if (!user || !user?.user_role || user.user_role >= 5) {
    return res.redirect("/users/login?error=ROLE");
  }

  const pcode = req.params.pcode;
  try {
    const product = await Product.findOne({ where: { p_code: pcode } });
    res.render("product/write", { product: product });
  } catch (error) {
    console.error(error);
    res.send("정보를 불러올 수 없습니다.");
  }
});

router.post("/update/:pcode", async (req, res) => {
  const user = req.session?.user;
  if (!user || !user?.user_role || user.user_role >= 5) {
    return res.redirect("/users/login?error=ROLE");
  }

  const pcode = req.params.pcode;
  console.log(req.body);
  try {
    await Product.update(req.body, { where: { p_code: pcode } });
    res.redirect(`/product/detail/${pcode}`);
  } catch (error) {
    res.send("SQL UPDATE ERROR");
  }
});

router.get("/delete/:pcode", async (req, res) => {
  const user = req?.session.user;
  if (!user || !user?.user_role || user.user_role >= 5) {
    return res.redirect("/users/login?error=ROLE");
  }

  const pcode = req.params.pcode;
  try {
    await Product.destroy({ where: { p_code: pcode } });
    res.redirect("/product");
  } catch (error) {
    console.error(error);
    res.send("SQL DELETE ERROR");
  }
});

export default router;
