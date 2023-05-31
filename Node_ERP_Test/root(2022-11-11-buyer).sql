CREATE DATABASE buyerDB;
USE buyerDB;

CREATE TABLE tbl_buyer(
b_num	VARCHAR(4)	NOT NULL	PRIMARY KEY,
b_name	VARCHAR(10)	NOT NULL,
b_tel	VARCHAR(12),
b_mname	VARCHAR(10),	
b_mtel	VARCHAR(13),	
b_addr	VARCHAR(125)	
);

INSERT INTO tbl_buyer(b_num, b_name, b_tel, b_mname, b_mtel, b_addr) VALUES ("B001","롯데상사","02-222-9999","홍길동","010-9999-8766","서울특별시 영등포구 여의도동 1번지");
INSERT INTO tbl_buyer(b_num, b_name, b_tel, b_mname, b_mtel, b_addr) VALUES ("B002","삼부상사","062-526-9988","이몽룡","010-9876-6781","");


SELECT * FROM tbl_buyer;