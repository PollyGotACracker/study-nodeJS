-- 나의 독서록
CREATE DATABASE myBooks;
USE myBooks;

-- 리스트 
CREATE TABLE tbl_books (
	title	VARCHAR(125),
	link	VARCHAR(225),		
	image	VARCHAR(255),		
	author	VARCHAR(125),		
	discount	INT,
	publisher	VARCHAR(125),
	isbn	VARCHAR(13)		PRIMARY KEY,
	description	TEXT,
	pubdate	VARCHAR(20),		
	price	INT
);

CREATE TABLE tbl_mybooks (
	my_username	VARCHAR(15)	NOT NULL,	
	my_isbn	VARCHAR(13)	NOT NULL,	
	my_odate	VARCHAR(15),	
	my_oprice	INT,
		PRIMARY KEY(my_username, my_isbn)			
);

ALTER TABLE tbl_mybooks DROP f_users;
-- ALTER TABLE tbl_mybooks DROP CONSTRAINT f_users;
DROP TABLE tbl_users;

CREATE TABLE tbl_users(
	username	VARCHAR(15)	NOT NULL	PRIMARY KEY,
	password	VARCHAR(255)	NOT NULL,
	u_name	VARCHAR(125)	NOT NULL,	
	u_tel	VARCHAR(15),
	u_addr	VARCHAR(255),		
	u_nickname	VARCHAR(125),
	u_level	INT
);

/*
tbl_books: tbl_mybooks = 1:N
	사용자 3명 A,B,C 가 001 이라는 도서를 구입했으면
    mybooks
		A 001
        B 001
        C 001
tbl_users: tbl_mybooks = 1:N

FOREIGN KEY 설정은 항상 N 테이블에 설정한다.
*/

ALTER TABLE tbl_mybooks  -- N 의 테이블
ADD CONSTRAINT f_books  -- FK 이름(임의지정)
FOREIGN KEY (my_isbn)  -- N 테이블의 연결 칼럼
REFERENCES tbl_books(isbn); -- 1 테이블 정보

ALTER TABLE tbl_mybooks  -- N 의 테이블
ADD CONSTRAINT f_users  -- FK 이름(임의지정)
FOREIGN KEY (my_username)  -- N 테이블의 연결 칼럼
REFERENCES tbl_users(username);  -- 1 테이블 정보
