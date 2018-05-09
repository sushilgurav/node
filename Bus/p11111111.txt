var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "film"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE film(ticketno int(11) PRIMARY KEY, name varchar(32), ticket_type varchar(32), date1 varchar(32), time1 varchar(32))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});