-- bbsDB, root 로그인
CREATE DATABASE bbsDB;
USE bbsDB;

/*
AUTO_INCREMENT 속성
INSERT 를 수행할 때 특별히 값이 없을 때 또는 0 일 때
	기존의 칼럼 값을 비교하여 1 만큼 자동 증가된 값으로 지정한다.
DEFAULT 속성
INSERT 를 수행할 때 특별히 값이 없을 때 채워넣을 값 지정

** db_config.js 에서 timezone: "+09:00" 설정 필요
(DATE_FORMAT(NOW(), '%Y-%m-%d')
현재 DB 가 설치된 서버(컴퓨터)의 현재 시각을 가져와서
YYYY-MM-DD 형식의 문자열로 변환하라

%Y	Year as a numeric, 4-digit value
%y	Year as a numeric, 2-digit value
%M	Month name in full (January to December)
%m	Month name as a numeric value (00 to 12)
%D	Day of the month as a numeric value, followed by suffix (1st, 2nd, 3rd, ...)
%d	Day of the month as a numeric value (01 to 31)

%H	Hour (00 to 23)
%h	Hour (00 to 12)
%I	Hour (00 to 12)
%i	Minutes (00 to 59)
%S	Seconds (00 to 59)
%s	Seconds (00 to 59)

NOT NULL
DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP
최초 INSERT 가 될 때 자동으로 현재 TIMESTAMP(시간 일련번호)를
날짜시각 형태로 변경하여 저장하고
UPDATE 가 될 때 자동으로 현재 TIMESTAMP 값으로 변경하라
*/


CREATE TABLE tbl_bbs (
	b_seq	BIGINT	AUTO_INCREMENT	PRIMARY KEY,
	b_date	VARCHAR(10)	NOT NULL DEFAULT
    (DATE_FORMAT(NOW(), '%Y-%m-%d')),	
	b_time	VARCHAR(10)	NOT NULL DEFAULT
    (DATE_FORMAT(NOW(), '%H:%i:%S')),	
	b_writer	VARCHAR(125)	NOT NULL,	
	b_subject	VARCHAR(125)	NOT NULL,	
	b_content	TEXT	NOT NULL,	
	b_count	INT,		
	b_update	datetime 	
    NOT NULL
	DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

DESC tbl_bbs;


/*
참조무결성 설정(포린키, FOREIGN KEY)
CONSTRAINT f_bbs
FOREIGN KEY(f_bseq) REFERENCES tbl_bbs(b_seq)
tbl_bbs 테이블의 b_seq 칼럼과 현재 table 의 f_bseq 칼럼을 
서로 연결하여 참조 관계를 공고히 하는 설정
tbl_bbs(b_seq)			tbl_files(f_bseq)
============================================
있다				=>	있을 수 있다
없다				=>	절대 없다
반드시 있어야 한다	<=	있다
============================================

tbl_bbs 와 tbl_files 간에 연결관계를 철저히 유지하여
게시글이 없는데 첨부파일정보가 존재하는 것을 방지하는 목적이 있다.
tbl_bbs 에 키 값이 없고, 그 키에 해당하는 연결 정보가 tbl_files 에 있는 경우
해당하는 데이터는 삭제, 키 값의 Update 는 기본적으로 금지된다.

ON DELETE CASCADE
tbl_bbs 의 어떤 데이터를 삭제 시도하는 경우
그 키 값에 해당하는 데이터가 tbl_files 에 있으면 같이 모두 삭제
ON UPDATE CASCADE
키 값을 변경하면 자동으로 같이 변경

UPDATE tbl_bbs
SET b_seq = 100
WHERE b_seq = 10; 이 명령을 시도하면
UPDATE tbl_files
SET f_bseq = 100
WHERE f_bseq = 10; 이 명령이 같이 실행된다.

참조무결성(FOREIGN KEY) 설정은
1:N 관계 table 에서 N 의 table 에 설정한다.
1의 table 은 PK 이어야 한다.
*/

CREATE TABLE tbl_files(
	f_seq	BIGINT	AUTO_INCREMENT,	
	f_bseq	BIGINT	NOT NULL,	
	f_date	VARCHAR(10)	NOT NULL	DEFAULT (DATE_FORMAT(NOW(), '%Y-%m-%d')),
	f_time	VARCHAR(10)	NOT NULL	DEFAULT (DATE_FORMAT(NOW(), '%H:%i:%S')),
	f_original_name	VARCHAR(225)	NOT NULL,	-- 첨부할 당시 파일명
	f_save_name	VARCHAR(225)	NOT NULL,	-- 저장되었을 때 파일명
	f_ext	VARCHAR(10)	NOT NULL,	-- 파일의 확장자(파일 형식) 저장
	PRIMARY KEY(f_seq),
	CONSTRAINT f_bbs
	FOREIGN KEY(f_bseq) REFERENCES tbl_bbs(b_seq)
    ON DELETE CASCADE
    -- ON UPDATE CASCADE
);

-- 이미 생성된 table 간에 참조무결성 설정
-- 단 이 때는 두 table 간에 EQ JOIN 이 성립되어야 한다.
ALTER TABLE tbl_files ADD CONSTRAINT f_bbs
FOREIGN KEY(f_bseq) REFERENCES tbl_bbs(b_seq)
ON DELETE CASCADE;

-- 참조무결성 관계 삭제
ALTER TABLE tbl_files
DROP CONSTRAINT tbl_files_ibfk_1;

-- ON DELETE CASCADE 가 설정되어있기 때문에
-- tbl_bbs 의 항목을 삭제하면 덩달아서 tbl_files 의 데이터도 함께 삭제된다.
SELECT *
FROM tbl_bbs
	JOIN tbl_files
		ON b_seq = f_bseq;
        
DELETE FROM tbl_bbs
WHERE b_seq = 10;

SELECT * FROM tbl_bbs;
SELECT * FROM tbl_files;