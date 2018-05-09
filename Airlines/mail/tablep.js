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
  var sql = "create table bookings (fno varchar(32) not null ,user_id varchar(32)  not null);";
	
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  
});

