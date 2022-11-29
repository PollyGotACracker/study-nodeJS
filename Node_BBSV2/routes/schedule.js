import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("schedule", {});
});
export default router;
