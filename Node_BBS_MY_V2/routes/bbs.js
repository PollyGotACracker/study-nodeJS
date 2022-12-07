import express from "express";
// file_upload.js: multer storage export
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
import fs from "fs";
import path from "path";

// DB CRUD 핸들을 수행할 Model 객체
const BBS = DB.models.tbl_bbs;
const FILES = DB.models.tbl_files;

const router = express.Router();

/**
 * router 의 Response 원칙
 * 한 개의 router 에서는 반드시 Response 를 한번만 해야 한다.
 *
 * router 에서 if 조건문을 사용하거나, try 처리를 하는 과정에서
 * res.send(), res.write(), res.end(), res.redirect(), res.render()
 * 이러한 코드가 중복돼서 발견될 경우 NodeJS Express 에서 경고성 오류가 발생한다.
 * 경고성 오류는 그냥 무시되기도 하지만, 간혹 프로젝트를 멈추는 경우가 있다.
 * 중복된 Response 오류가 있을 경우 예기치 못하게 중복된 Response 코드가 모두 실행되는 경우가 있기 때문이다.
 * 그래서 Express 의 router 에서 res... 관련된 코드가 실행되면 router 가 끝나는 것이 원칙이다.
 * 그러나, 그렇지 않고 경고성 오류가 나타나는 경우가 있다.
 *
 * 이러한 경우를 방지하기 위하여 Express 에서는
 * res... 코드를 반드시 return 문과 함께 사용하도록 한다.
 */

router.get("/", async (req, res) => {
  try {
    const result = await BBS.findAll({ include: "m_files" });
    return res.render("bbs/list", { bbsList: result });
  } catch (err) {
    console.error(err);
    return res.send("file SQL Error");
  }

  // 다음과 같은 코드는 Response 오류가 난다.
  //    if(a === 3) res.send("A 는 3이다")
  //    else res.send("A 는 3이 아니다")
  //    res.render("bbs/list");
  // ==> res.send 가 실행된 후 res.render 가 실행되기 때문
});

router.get("/insert", (req, res) => {
  res.render("bbs/write");
});

/**
 * import fileUp from "../modules/file_upload.js";
 * fileUp middleware 사용하여 파일 받기
 *
 * fileUp.single("input 태그의 name")
 * 한 개씩 파일을 받을 때
 * 이 때는 req.file 속성에 파일에 대한 정보가 담긴다.
 *
 * fileUp.array("input 태그의 name")
 * 여러 개의 파일을 첨부하여 받을 때
 * 이 때는 req.files 속성에 파일에 대한 정보를 배열로 받는다.
 *
 * fileUp.fields([{name: "태그1"}, {name: "태그2"}])
 * input type ='file' 속성을 갖는 tag 들이 form 에 여러 개 있을 때 한번에 받기
 * 이 때도 req.files 속성에 파일에 대한 정보가 배열로 담긴다.
 */

// 한 개의 file 혹은 여러 개의 files 객체(배열)를
// request 객체에 추가(req.file 또는 req.files)
router.post("/insert", fileUp.array("b_upfile"), async (req, res) => {
  // fileUp Middleware 가 정상적으로 파일을 업로드 하고 나면
  // req 에 file 또는 files 속성을 생성하고 업로드한 파일 정보를 담는다.
  // router 코드에서 file 정보를 사용할 수 있다.
  const file = req.file; // single 로 받을 때, 단 array 로 받으면 undefined
  const files = req.files; // array 로 받을 때
  const bbs = req.body; // type 값이 text 인 input 들의 value
  console.log("파일들", files, "파일", file);

  const upLoadFile = (bbs, file) => {
    const upLoadFileInfo = {
      f_bseq: bbs.b_seq,
      f_original_name: file.originalname,
      f_save_name: file.filename,
      f_ext: "image",
    };
    return upLoadFileInfo;
  };

  try {
    // 게시글 저장
    /**
     * 여기에 코드가 도달하면 req.files 로부터
     * 업로드된 파일 정보가 files 변수에 저장된 상태이다.
     *
     * 1. 게시글을 insert 한다.
     * 2. insert 된 게시글의 seq(b_seq)를 추출하여
     * 3. tbl_files 테이블에 insert 할 때 사용한다.
     */
    // insert text values(bbs 테이블 게시글 저장)
    const bbsResult = await BBS.create(bbs);

    // 각 file 마다 upLoadFileInfo 객체를 생성하여
    // 하나의 배열로 반환 (files 테이블에 저장할 내용)
    const filesInfo = files.map((file) => {
      return upLoadFile(bbsResult, file);
    });
    console.log(filesInfo);
    // cf) bulkCreate(): sequelize 메서드. 다수의 데이터를 한번에 insert
    const fileResult = await FILES.bulkCreate(filesInfo);
    return res.redirect(`/bbs/detail/${bbsResult.b_seq}`);
    // return res.render("bbs/detail", { bbsResult, fileResult, upLoadFileInfo });
  } catch (err) {
    console.log(err);
    return res.send("SQL ERROR");
  }
});

router.get("/detail/:seq", async (req, res) => {
  const seq = req.params.seq;

  try {
    // cf) "m_files" 는 init-models.js 에서 설정한 테이블 별명이다.
    const bbsResult = await BBS.findByPk(seq, { include: "m_files" });
    // return res.json(bbsResult);

    // const fileResult = await FILES.findAll({ where: { f_bseq: seq } });

    return res.render("bbs/detail", {
      bbs: bbsResult,
      files: bbsResult.m_files,
      length: bbsResult.m_files.length,
    });
  } catch (err) {
    console.error(err);
    return res.send("SQL Error");
  }
});

/**
 * 파일이 첨부된 게시글 삭제하기
 * 1. 첨부파일 정보를 SELECT 하고
 *    SELECT 된 정보에서 파일 이름을 추출하여
 *    업로드 된 파일을 먼저 삭제해야 한다.
 * 2. 첨부파일 정보를 삭제
 * 3. 게시글 삭제
 */

router.get("/delete/:seq", async (req, res) => {
  const seq = req.params.seq;
  const upLoadDir = path.join("public/uploads");
  // try 문 밖에서 사용하기 위한 global 변수 선언
  let files;

  try {
    files = await FILES.findAll({ where: { f_bseq: seq } });
  } catch (err) {
    return res.send("FileList SELECT Error");
  }

  await files.forEach(async (file) => {
    try {
      const delFile = path.join(upLoadDir, file.f_save_name);
      // fs.statSync(): file 이 어떤 상태인가를 검사
      // 파일의 세부 정보를 포함한 Stats 객체 반환
      // 만약 delFile 이 없으면 exception 이 발생
      fs.statSync(delFile);
      // fs.unlinkSync(): 해당 파일 제거
      fs.unlinkSync(delFile);
    } catch (err) {
      console.log(file.f_save_name, "없음");
    }
  });

  // 게시글이 삭제되면 ON DELETE CASCADE 설정으로 인해 파일도 함께 삭제
  try {
    await BBS.destroy({ where: { b_seq: seq } });
    return res.redirect("/bbs");
  } catch (err) {
    console.error(err);
    return res.send("BBS DELETE Error");
  }

  // try {
  //   // 삭제하고자 하는 게시글의 첨부파일 리스트 SELECT
  //   const files = await FILES.findAll({ where: { f_bseq: seq } });
  //   const upLoadDir = path.join("public/uploads");

  //   // 첨부파일 리스트 정보에 해당하는 실제 파일 삭제
  //   await files.forEach(async (file) => {
  //     const delFile = path.join(upLoadDir, file.f_save_name);
  //     // 실제 파일이 있는지 확인 후 삭제하기
  //     fs.stat(delFile, (err, stats) => {
  //       // ENOENT: 파일 또는 디렉토리가 없을 경우 나오는 에러
  //       if (err.code !== "ENOENT") fs.unlinkSync(delFile);
  //     });
  //     // 실제 파일 삭제하기
  //   });
  //   await BBS.destroy({ where: { b_seq: seq } });
  //   return res.redirect("/bbs");
  // } catch (err) {
  //   console.log(err);
  //   return res.send("DELETE Error");
  // }
});

export default router;
