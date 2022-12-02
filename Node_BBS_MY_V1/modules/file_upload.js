// file Upload 를 쉽게 할 수 있도록 도와주는 middleware 선언
import multer from "multer";
import fs from "fs";
import path from "path";

// uuid 의 최신 버전을 사용하기 위한 import
import { v4 } from "uuid";
import { fileURLToPath } from "url";

// 파일을 저장할 폴더 지정
// 이 폴더는 public static 방식으로 접근할 수 있어야 한다.
const upload_dir = path.join("public/uploads");

// 파일 업로드 설정하기
// filename: 파일을 저장하기 전에 전처리(preprocessor) 하는 함수 선언
//      원래 파일이름을 해킹 방지하기 위하여 다른 이름으로 변형하기
// destination: 최종 파일을 저장할 때 사용하는 함수 선언
const storageOption = {
  filename: (req, file, cb) => {
    const uuidPrefix = v4(); //UUID 문자열 생성하기
    // UUID-원래파일이름 으로 만들기
    // cf) Buffer: 한글 문자열 인코딩
    const newFileName = Buffer.from(
      `${uuidPrefix}-${file.originalname}`,
      "latin1"
    ).toString("utf8");

    const uploadFileName = newFileName.substring(newFileName.length - 255);

    // 새로 변경된 파일 이름을 multer 에게 전달하기
    cb(null, uploadFileName);
  },
  destination: (req, file, cb) => {
    // 폴더가 없으면
    if (!fs.existsSync(upload_dir)) {
      /**
       * 만약 public/uploads/image 라는 폴더를 생성하려고 할 때
       * public/uploads 폴더가 있으면 아무런 문제 없이 images 폴더가 잘 생성이 될 것이다.
       * 그런데 public 폴더만 있고 uploads 폴더가 없거나
       * 또는 public 폴더마저 없을 경우는 폴더 생성에서 오류가 발생한다.
       *
       * 이 때 recursive 속성을 true 로 설정하면 모든 경로에 대하여
       * 검사한 후 폴더가 없으면 순차적으로 모두 생성한다.
       * nodeJS 10.x 이상에서 사용한다.
       */

      fs.mkdirSync(upload_dir, { recursive: true });
    }
    cb(null, upload_dir);
  },
};

const storage = multer.diskStorage(storageOption);
// export default multer({ storage : storage });
export default multer({ storage });
