const mysql = require("mysql2");

const connection = mysql.createConnection(
  "mysql://root:@localhost:3306/shop-nodejs"
);

connection.addListener("error", (err) => {
  console.log(err);
});

module.exports = connection;
