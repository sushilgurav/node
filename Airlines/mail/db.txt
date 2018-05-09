var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "airline"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE login(id varchar(32) PRIMARY KEY, name varchar(32), email varchar(32), password varchar(32), dob varchar(32),mobilenum bigint (11))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
 
  
});

