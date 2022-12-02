import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("posts", {});
});
export default router;
