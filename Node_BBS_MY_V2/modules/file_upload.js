// multer: file Upload 를 쉽게 할 수 있도록 도와주는 middleware
// multer는 multipart (multipart/form-data)인 폼에서만 동작
import multer from "multer";

// cf) fs: NodeJS 의 File System 모듈. 파일 처리 관련 작업 수행
// existsSync, mkdirSync 메서드 사용
import fs from "fs";
import path from "path";

// cf) uuid: 범용 고유 식별자(UUID)를 생성하는 라이브러리
// v4: 랜덤값 기반 UUID 생성
import { v4 } from "uuid";

// 파일을 저장할 폴더 지정
// 이 폴더는 public static 방식으로 접근할 수 있어야 한다.
const upload_dir = path.join("public/uploads");

// storageOption 객체: 파일 업로드 설정
// filename: 파일을 저장하기 전에 전처리(preprocessor) 하는 함수 선언
//      원래 파일이름을 해킹 방지하기 위하여 다른 이름으로 변형하기
// destination: 최종 파일을 저장할 때 사용하는 함수 선언
// cf) callback 의 첫번째 parameter(null) 는 error 처리용(error-first callbacks)

const storageOption = {
  filename: (req, file, cb) => {
    const uuidPrefix = v4(); // UUID 문자열 생성

    /**
     * cf) Buffer
     * NodeJS 클래스(모듈)로 전역 scope 에서 참조하기 때문에 import 없이 사용 가능
     * raw binary data 처리
     */

    // 파일명을 UUID-원본파일이름 으로 만들어 저장
    // 한글 문자열 인코딩 처리
    /**
     * cf)
     * form 의 enctype 속성값 multipart/form-data 한글명 깨지는 현상
     * 따라서 Buffer.from() 의 인코딩 형식 latin1 지정(기본값 utf8) 후
     *    toString()을 사용하여 utf8 로 변환
     */

    const newFileName = Buffer.from(
      `${uuidPrefix}-${file.originalname}`,
      "latin1"
    ).toString("utf8");
    console.log("Conv");
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const uploadFileName = newFileName.substring(newFileName.length - 255);

    // 새로 변경된 파일 이름을 multer 에게 전달
    cb(null, uploadFileName);
  },
  destination: (req, file, cb) => {
    // public/uploads 폴더가 없으면
    if (!fs.existsSync(upload_dir)) {
      /**
       * 만약 public/uploads/image 라는 폴더를 생성하려고 할 때
       * public/uploads 폴더가 있으면 아무런 문제 없이 images 폴더가 잘 생성이 될 것이다.
       * 그런데 public 폴더만 있고 uploads 폴더가 없거나
       * 또는 public 폴더마저 없을 경우는 폴더 생성에서 오류가 발생한다.
       *
       * 이 때 recursive 속성을 true 로 설정하면 모든 경로에 대하여
       * 검사한 후 폴더가 없으면 순차적으로 모두 생성한다.
       * NodeJS 10.x 이상에서 사용한다.
       */
      fs.mkdirSync(upload_dir, { recursive: true });
    }
    // 파일을 저장할 경로 전달
    cb(null, upload_dir);
  },
};
// diskStorage(): 파일 저장 옵션을 객체 형태로 받아 storage 생성
const storage = multer.diskStorage(storageOption);
// export default multer({ storage : storage });

export default multer({ storage });
