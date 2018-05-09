var mysql = require('mysql');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//let date = require('date-and-time');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kle"
});
app.get('/bookticket', function (req, res) {
var rr="<html>";
rr = rr+"<body>";
rr= rr+"<form method='post' action='add' >";
//rr = rr+"Account_num"+"<input type='text' minlength='5' maxlength='5' name='num' value=' '>";
rr = rr+"Name:"+"<input type='text' name='nm' value=' '>";
rr=rr+"<label for='bus'>Bus:</label>";
rr=rr+"<select id='bus' name='bus' required autofocus>";
rr=rr+"<option></option>";
rr=rr+"<option value='vrl'>VRL</option>";
rr=rr+"<option value='volvo'>VOLVO</option>";
rr=rr+"<option value='srs'>SRS</option>";
rr=rr+"</select><br>";
//rr = rr+"Bus:"+"<input type='text' name='bus' value=' '>";
rr = rr+"Number of tickets:"+"<input type='number' minlength='1' maxlength='2' name='num' value=' '>";
rr=rr+"<label for='typ'>Ticket type:</label>";
rr=rr+"<select id='typ' name='typ' required autofocus>";
rr=rr+"<option></option>";
rr=rr+"<option value='gold'>GOLD</option>";
rr=rr+"<option value='silver'>SILVER</option>";
rr=rr+"<option value='platinum'>PLATINUM</option>";
rr=rr+"</select><br>";
rr = rr+"Name:"+"<input type='text' name='name' value=' '>";
rr = rr+"Dob:"+"<input type='text' name='dob' value=' '>";
rr = rr+"Source:"+"<input type='text' name='source' value=' '>";
rr = rr+"Destination:"+"<input type='text' name='dest' value=' '>";
rr = rr+"<input type='submit' name='t1' value='Add '>";
rr = rr+"</form>"
//rr=rr+" <a href='localhost:9000/cancelbooking'>You can cancel ur booking now!!</a>";
rr = rr+"</body>";
res.send(rr);
})

app.get('/cancelbooking', function (req, res) {
  var rr="<html>";
  rr = rr+"<body>";
  rr= rr+"<form method='post' action='cancel' >";
rr = rr+"Name:"+"<input type='text' name='nm2' value=' '>";
rr = rr+"Date:"+"<input type='text' name='date2' value=' '>";
rr = rr+"<input type='submit' name='t2' value='Cancel'>";
rr = rr+"</form>"
rr = rr+"</body>";
  res.send(rr);
  })

  

app.post('/add', urlencodedParser, function (req, res){
  nam = req.body.nm;
   numt= parseInt(req.body.num);
   bus=req.body.bus;
   dat=req.body.date;
typt=req.body.typ;
   

var sql = "INSERT INTO bus values('" + nam + "'," + numt+ ",'" + bus + "','" + dat + "','" + typt+ "');";
var flag=0;   
    
  //var sql = "INSERT INTO account (acc_num,cdate,balance,name) VALUES ("+a+","+"'"+new Date()+"',"+b+","+"'"+c+"')";
  con.connect(function(err) {
    if(err){ throw err;}
    console.log("Connected!");
    //seatnum=seatnum-1;
  });
    con.query(sql, function (err, result) {
      if (err.code==='ER_DUP_ENTRY') {
        console.log("Duplicate ");
        flag=1;
   
      }

    });
  
if(flag>1)
{
res.send("DUPLICATE ENTRY");
}
else
{
res.send("Ticket booked");
}
 
 




    
    
 }).listen(8080);

   

 
 
 

 app.post('/cancel', urlencodedParser, function (req, res){
  nam2 =req.body.nm2;
  mov2= req.body.bus2;
d2=req.body.date2;
   
  var sql ="DELETE FROM bus WHERE name="+"'"+nam2+"' AND dat="+"'"+d2+"';";
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
    con.query(sql, function (err, result) {
      if (err.code) throw err;
      console.log("Booking canceled");
    });
   
  res.send("Booking cancelled");
 }).listen(9000);
 

