USE mybooks;
SELECT * FROM tbl_users;
SELECT * FROM tbl_books;
SELECT * FROM tbl_mybooks;

SHOW TABLES;
SELECT * FROM sessions;

SELECT U.username, U.u_name, M.my_isbn, M.my_odate, B.title, B.author, B.publisher
FROM tbl_users U
	LEFT JOIN tbl_mybooks M
		ON U.username = M.my_username
	LEFT JOIN tbl_books B
		ON M.my_isbn = B.isbn
WHERE U.username = "polly";
        