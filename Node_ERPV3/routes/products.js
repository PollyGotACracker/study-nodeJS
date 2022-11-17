import express from "express";
import upload from "../modules/file_upload.js";
import DB from "../models/index.js";
const Products = DB.models.tbl_products;
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Products.findAll();
  return res.render("products/list", { products });
});

router.get("/insert", (req, res) => {
  res.render("products/write");
});

/**
 * router 에 middleware 끼워넣기
 * router 의 함수 "(req,res) =>{}" 는 text 데이터를 수신하는 용도이다.
 * 지금 form 에서 multipart/form-data 로 이미지가 포함된 데이터가 전송되어서 왔다.
 * 이 데이터를 중간에 upload.singe() 함수에게 전달하여
 *    이미지 관련 처리를 먼저 수행하도록 하는 것
 */
router.post("/insert", upload.single("p_image_file"), (req, res) => {
  console.log(req.body);
  // res.json(req.file);
  const fileName = req?.file?.filename;
  // cf) checkbox 가 체크(1) 가 아니면 값이 없으므로...
  req.body.p_vat = req.body?.p_vat || 0;
  const body = req.body;
  res.json({
    fileName,
    body,
  });
  // res.render("products/detail", { fileName });
});

/////////////////////////////////////////////////////////////////////////////////////

router.get("/detail/:pcode", async (req, res) => {
  const user = req.session?.user;
  if (!user) {
    return res.redirect("/users/login?error=ROLE");
  }

  const pcode = req.params.pcode;
  console.log(pcode);
  try {
    const product = await Products.findOne({ where: { p_code: pcode } });
    res.render("products/detail", { product });
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
    const product = await Products.findOne({ where: { p_code: pcode } });
    res.render("products/write", { product: product });
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
    await Products.update(req.body, { where: { p_code: pcode } });
    res.redirect(`/products/detail/${pcode}`);
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
    await Products.destroy({ where: { p_code: pcode } });
    res.redirect("/products");
  } catch (error) {
    console.error(error);
    res.send("SQL DELETE ERROR");
  }
});

export default router;
