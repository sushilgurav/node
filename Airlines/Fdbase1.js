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
rr = rr+"Name "+"<input type='text' name='nm' value=' '>";
rr = rr+"USN"+"<input type='text' name='usn' value=' '>";
rr = rr+"Branch "+"<input type='text' name='br' value=' '>";

rr = rr+"Attendance "+"<input type='text' name='att' value=' '>";
rr = rr+"CIE Marks "+"<input type='text' name='cie' value=' '>";

rr = rr+"<input type='submit' name='t1' value='send '>";
rr = rr+"</form>";
rr = rr+"</body>";
res.send(rr);

  
})
app.post('/thank', urlencodedParser, function (req, res){
  //var reply='';
  //reply += "first  number is" + req.body.one;
  //reply += "sec number is" + req.body.two; 

  var name=req.body.nm;
  name="'"+name+"'";
  usn1=req.body.usn;
  usn1="'"+usn1+"'";
  branch = req.body.br;
  branch="'"+branch+"'";
  atnd=req.body.att;
  atnd=parseInt(atnd)
  cie1=req.body.cie;
  cie1=parseInt(cie1);
  var flag=0;
  
  var sql =" INSERT INTO student (Name,USN,Branch,Attendance,CIE) VALUES ("+name+","+usn1+","+branch+","+atnd+","+cie1+")";
//--------------------------------------------------------------------------------------//
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
con.query(sql, function (err, result) {
 if (err) throw err;
   console.log("1 record inserted");
   flag=1
     //  console.log("statement ="+sql);
//  res.write("statement"+sql);
  //res.write("rec inserted");
 });

//------------------------------------------------------------------------------------//
  if(flag==1){
  res.send("Inserted Successfully");
  }else{
      res.send("Not inserted..Please insert the fields")
  }
 }).listen(9000);