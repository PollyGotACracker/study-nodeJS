import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("list", {});
});
export default router;
