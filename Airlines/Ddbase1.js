var http = require("http");
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//---------------------------------------------//
   var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sample"
});

//-------------------------------------------//
app.get('/', function (req, res) {
 res.send('Hello World');
})
app.get('/send', function (req, res) {
var rr="<html>";
rr = rr+"<body>";
rr=rr+"<form  method='post' action='thank' >";
rr = rr+"Click the button to display all eligible students ";


rr = rr+"<input type='submit' name='t1' value='send '>";

rr = rr+"</form>";
rr = rr+"</body>";
res.send(rr);

  
})
 app.post('/thank', urlencodedParser, function (req, res){
    //var reply='';
    //reply += "first  number is" + req.body.one;
    //reply += "sec number is" + req.body.two; 
    var usn1 = req.body.usn;
          
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "sample"
    });
  
   var flag=0;
    var usn1=req.body.usn;
    usn1="'"+usn1+"'";
  //--------------------------------------------------------------------------------------//
  con.connect(function(err) {
  if (err) throw err;
          console.log("Connected!");
          var sql ="select * from student where Attendance>80 and CIE>8;";
          var rr = "<html>";
          rr = rr+"<head>";
          rr = rr+"<style>";
          rr = rr+"table, th, td {";
          rr = rr+"border: 1px solid black";
          rr = rr+"}";
          rr = rr+"</style>";
          rr = rr+"</head>";
          rr =rr+ "<body>";
          
          rr = rr+"<h3>Eligible Students are:</h3>";
          rr = rr+"<table style:'width:100%'>";
          rr = rr+"<tr>";
          rr = rr+"<th>USN</th>";
          rr = rr+"<th>Name</th>";
          rr = rr+"<th>Attendance</th>";
          rr = rr+"<th>CIE(/20)</th>";
          rr = rr+"<th>Branch</th>";
          rr = rr+"</tr>";
          rr = rr+"<tr>";
          con.query(sql, function (err, rows,fields) {
              if (err) 
                  throw err;
              if(rows.length<=0)
                  rr = rr+"<p>No results found.";
              else{
              for(var i in rows){
                      console.log('Result:',rows[i].name);
                      rr = rr+"<td>"+rows[i].USN+"</td>";
                      rr = rr+"<td>"+rows[i].Name+"</td>";
                      rr = rr+"<td>"+rows[i].Attendance+"</td>";
                      rr = rr+"<td>"+rows[i].CIE+"</td>";
                      rr = rr+"<td>"+rows[i].Branch+"</td>";
                      rr = rr+"</tr>";
                      
                 
              }
          }
              rr = rr+"</body>";
              rr = rr+"</html>";
              res.send(rr);
          });
          });
          
         }).listen(9000);