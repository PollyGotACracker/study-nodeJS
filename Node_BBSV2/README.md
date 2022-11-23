# NodeJS MongoDB 프로젝트

- NodeJS Express 와 MongoDB 를 연동하여 게시판 CRUD 구현하기
- NodeJS 에서 MongoDB 와 연동을 할 때는 대부분의 프로젝트에서 mongoose 를 사용하여 ORM 방식으로 접근한다.
- mongoDB dependency 를 사용하여 Legacy 방식으로 연결하는 프로젝트
- mongoose 를 사용한 ORM 방식으로 mongoDB 프로젝트 구현

## Dependency

`npm install -save mongoDB`
`npm install -save mongoose`

## 보안 주의사항

- MongoDB Atlas Cluster 를 사용하는 관계로 Atlas 접속 URL 이 노출될 수 있다. Atlas URL 이 담겨있는 config/mongoDB.js 파일을 github 에 업로드 되지 않도록 하기 위하여 .gitignore 에 설정해야 한다.
