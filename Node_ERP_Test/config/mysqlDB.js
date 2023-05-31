import mysql from "mysql2";

const config = {
  host: "localhost",
  user: "root",
  password: "!Biz8080",
  database: "buyerDB",
};

const dbConnection = mysql.createConnection(config);

export default dbConnection;
