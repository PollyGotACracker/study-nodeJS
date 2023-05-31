import express from "express";
import moment from "moment";
import DB from "../models/index.js";
const Today = DB.models.tbl_today;

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const todays = await Today.findAll();
  const dateTime = {
    t_date: moment().format("YYYY-MM-DD"),
    t_time: moment().format("hh:mm:ss"),
  };
  res.render("index", { todays, dateTime });
});

/**
 * select 를 할 때
 * PK 를 기준으로 조건조회 (WHERE SELECT) 를 하면
 * 데이터는 1개 이하만 나타난다.
 * 다른 칼럼을 기준으로 조건 조회를 하면
 * 데이터는 0개 이상이 나타나는데
 * 만약 1개만 나타나더라도 이 데이터는 LIST(배열, 여러 개로 인식)이다.
 *
 * PK 를 기준으로 조건 조회를 할 때는
 * Today.findOne({where: {t_seq: req.params.t_seq}}) 을 사용한다.
 * 이 때는 데이터가 LIST 가 아닐 수 있다.
 *
 * PK 일 때 권장하는 함수
 * Today.findByPk(req.params.t_seq) 을 사용한다.
 */
router.get("/get/:t_seq", async (req, res, next) => {
  const todays = await Today.findAll({ where: { t_seq: req.params.t_seq } });
  // res.json(todays);
  res.render("index", { todays });
});

router.post("/", async (req, res) => {
  // const { t_seq, t_date, t_time, t_conetent, t_qty, t_cal } = res.body;
  // console.log("Data", req.body);
  /**
   * Today.save(req.body)
   * 현재 버전에서 작동 안되는 함수
   * Insert Or Update 를 실행하는 함수
   */
  try {
    await Today.create(req.body);
  } catch (error) {
    await Today.update(req.body, { where: { t_seq: req.body.t_seq } });
    //console.error(error);
  }
  res.redirect("/");
});

router.get("/delete/:t_seq", async (req, res) => {
  await Today.destroy({ where: { t_seq: req.params.t_seq } });
  res.redirect("/");
});

/**
 * sequelize CRUD method
 *
 * CREATE : create({ where: { _a: req.params.a } })
 * READ : findAll()
 * UPDATE : update(req.body, { where: { _a: req.body.a } })
 * DELETE : destroy({ where: { _a: req.params/body.a } })
 */

export default router;
