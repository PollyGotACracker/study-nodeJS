import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  req.session.user = {
    username: "polly",
    real_name: "홍길동",
    user_role: 1,
  };
  req.session.save(() => {
    res.json(req.session.user);
  });
});

export default router;
