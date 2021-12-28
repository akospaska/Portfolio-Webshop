const mysql = require(`mysql-await`);

const dbConfig = {
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "password",
  database: "webshop",
};

const MyslqDatabaseConnection = mysql.createConnection(dbConfig);

MyslqDatabaseConnection.on(`error`, (err) => {
  console.error(`Connection error ${err.code}`);
});

module.exports = MyslqDatabaseConnection;
