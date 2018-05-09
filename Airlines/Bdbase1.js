var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sample"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE student (	Name varchar(25), USN varchar(20) NOT NULL PRIMARY KEY,Branch varchar(20),Attendance int,CIE int); ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});