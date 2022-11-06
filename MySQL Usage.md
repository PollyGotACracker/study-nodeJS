# MySQL

- https://github.com/mysqljs/mysql

## .query(sqlString, callback)

- 첫 번째 인수는 SQL 문자열, 두 번째는 callback 이다.

## .query(sqlString, values, callback)

- 여기서 두 번째 인수 values 는 쿼리의 값이다.  
  쿼리의 값을 escape 처리하기 위한 placeholder 로 `?` 문자를 쿼리문에 사용했을 때 쓴다.  
  cf) SQL Injection 공격을 막기 위하여, 쿼리의 값은 `?` 문자 또는 `Connection.escape()` 메서드 등을 통해 반드시 escape 되어야 한다.

## .query(options, callback)

- 첫 번째 인수 options 는 다양한 고급 옵션들을 객체 형태로 전달한다.
