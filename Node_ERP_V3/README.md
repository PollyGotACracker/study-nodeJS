# 나라상사 ERP 프로젝트

- since 2022-11-12

## 거래처관리 프로젝트

- ERP 프로젝트를 수행하기 위한 거래처정보를 등록, 수정, 삭제하는 기능 구현
- Table 명세 설계 : ERD(Entity RelationShip Diagram) 작성
- erpDBV2 database 생성, tbl_buyer table 생성
- 프로젝트에서 사용할 model 파일을 생성하기

```
관리자권한으로 cmd 창을 열고
npm install -g sequelize-auto
npm install -g mysql2
```

```
npm install
sequelize-auto -d erpDBV2 -h localhost -u root -x !Biz8080
```

- shell 에서 문자열을 묶을 때 작은따옴표를 사용해야 문자열을 그대로 출력한다.  
  큰따옴표를 사용하게 될 경우 변수로 인식하여 값으로 치환된다.

## gradient

https://cssgradient.io/
