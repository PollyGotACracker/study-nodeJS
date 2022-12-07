# Nodejs, Express, MySQL 을 사용한 이미지 갤러리

- 이미지 및 파일 업로드 기능을 포함한 게시판 프로젝트

## Dependencies

- 파일 업로드를 하기 위한 보조 도구 설치

```
npm install -save multer
npm install -save uuid
```

### multer

- 파일 업로드를 매우 쉽게 구현할 수 있도록 도와주는 보조 도구
- middleware 형태로 사용한다.

### uuid (universally unique identifier)

- 범용 고유 식별자를 생성하는 보조 도구
- 128비트, 16^32 로 표현. 총 36개 문자(32개 문자와 4개의 하이픈)로 된 8-4-4-4-12 자리의 패턴
- UUID version
- v1: 타임스탬프(시간) 기준
- v3: MD5 해시 기준
- v4: 랜덤값 기반. 가장 많이 사용됨
- v5: SHA-1 해시 기준
