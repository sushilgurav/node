var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kle"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE bus (name varchar(30),tnum int(3),bus varchar(30),dat date,ttyp varchar(30),PRIMARY KEY(name,dat))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});