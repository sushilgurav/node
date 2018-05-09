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
  var sql = "CREATE TABLE flight(fid varchar(32) PRIMARY KEY, ffrom varchar(32), fto varchar(32), fdate varchar(32), ftime varchar(32), amount int(11));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  
});

