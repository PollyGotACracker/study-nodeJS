import mysql from "mysql2";

const connConfig = {
  host: "localhost",
  port: 3306,
  password: "!Biz8080",
  user: "root",
  database: "schooldb",
};

const dbConnection = mysql.createConnection(connConfig);

export default dbConnection;
