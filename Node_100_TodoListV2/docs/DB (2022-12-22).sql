-- TodoList DB, root 접속
CREATE DATABASE todo;
USE todo;

CREATE TABLE tbl_todolist(
	id	BIGINT	AUTO_INCREMENT	PRIMARY KEY,
	s_date	VARCHAR(10)	NOT NULL,
	s_time	VARCHAR(10)	NOT NULL,	
	t_content	VARCHAR(225)	NOT NULL,
	e_date	VARCHAR(10),
	e_time	VARCHAR(10)	
);

DESC tbl_todolist;