import mysql from "mysql2/promise";

export default await mysql.createConnection(
  "mysql://root:@localhost:3306/shop-nodejs"
);
