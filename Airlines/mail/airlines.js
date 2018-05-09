var http = require('http');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var name1;

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "airline"
});

app.get('/r', function (req, res) {
    var rr = `
    <html>
	<center>
    <head>
        <title>Airlines</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous">
		<h2>AIRLINE DATABASE SYSTEM </h2>
    </head>

    <body>
        
        <form method='post' action='/'>
            <div class="col-md-4" style="padding-top: 10px;">
                <div class="form-group">
                    <input type="text" class="form-control" name="id" placeholder="id"  />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="name" placeholder="Name" />
                </div>
				<div class="form-group">
                    <input type="text" class="form-control" name="email" placeholder="Email" />
                </div>
				<div class="form-group">
                    <input type="password" class="form-control" name="pass" placeholder="Password" />
                </div>
				 <div class="form-group">
                    <input type="DATE" class="form-control" name="date1" placeholder="DATE OF BIRTH" />
                </div>
				 <div class="form-group">
                    <input type="number" class="form-control" name="phno" placeholder="Phone number" max="9999999999" min="8888888888" />
                </div>
                
                <div class="form-group">
                    <button class="button button-default" formaction="AddtoDb" name="submitbtn" type="submit" value="ins">Submit</button>
                   
                </div>
	
				
			
				
				
				
				
				
				
				
				
				
				<h6>Search Flights </h6>
				
				 <div class="form-group">
                    <input type="text" class="form-control" name="source" placeholder="Source"  />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="destination" placeholder="Destination" />
                </div>
				<div class="form-group">
                    <input type="text" class="form-control" name="date2" placeholder="Date(dd-mm-yyyy)" />
                </div>
				<div class="form-group">
                    <input type="text" class="form-control" name="time" placeholder="time(HH:MM)" />
                </div>
				
				<div class="form-group">
                    <button class="button button-default" formaction="show" name="submitbtn" type="submit" value="hall">Show flights</button>
                   
                </div>
				
				
					<h6>Book Flights </h6>
				
				 <div class="form-group">
                    <input type="text" class="form-control" name="fliid" placeholder="Flight ID"  />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="userid" placeholder="User ID" />
                </div>
				<div class="form-group">
                    <input type="password" class="form-control" name="pass" placeholder="Password" />
                </div>
				<div class="form-group">
                    <button class="button button-default" formaction="book" name="submitbtn" type="submit" value="hall">Book flight</button>
					
				<div class="form-group">
                    <button class="button button-default" formaction="del" name="submitbtn" type="submit" value="hall">Delete Booking</button>
                   
                </div>
                   
                </div>
				
				
				
				
				
				
				
				
				
				

        </form>
    </body>
	</center>
    </html>
    `;
    res.send(rr);
});



app.post('/AddtoDb', urlencodedParser, function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
	var email = req.body.name;
	var pass = req.body.pass;
	var date1 = req.body.date1;

	var phno =parseInt(req.body.phno);
	 
	if (id == "") {
        res.send("Enter id");
        return false;
	}
	if (name == "") {
        res.send("Enter name");
        return false;
	}
	if (email == "") {
        res.send("Enter email");
        return false;
	}
	if (phno == "") {
        res.send("Enter Phone number");
        return false;
	}
	if (pass == "") {
        res.send("Enter password");
        return false;
	}
	
	
	 
    var sql = "INSERT INTO login values('" + id + "','" +name +"','" + email + "','" +pass +"','"+date1+"','" + phno + "')";

    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        //console.log(usn + " " + name + " " + att +" "+ cie + " " + branch +  " Inserted");
		  //console.log("sushil");
    });
    //res.redirect("/r");
    res.send("Submitted");
    res.end();
});
});

app.post('/book', urlencodedParser, function (req, res) {
  var fid1 = req.body.fliid;
  var userid1 = req.body.userid;
	
	
  con.connect(function(err) {
 var sql = "insert into bookings values('" + fid1+"','"+userid1+"');";
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(" booked");
		console.log(fid1+ " " + userid1 + " Flight booked");
    });
    //res.redirect("/r");
    res.send("#================================"+fid1+ " " + userid1 + "   Congratulations your flight has been booked Flight booked=================================================#");
    res.end();
});
});

app.post('/del', urlencodedParser, function (req, res) {
	  var fid1 = req.body.fliid;
  var userid1 = req.body.userid;
 var sql = "delete from bookings where fno='" + fid1+"' and user_id='"+userid1+"';";
 
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(" booked");
    });
    //res.redirect("/r");
    res.send("Flight booked");
    res.end();
});
 

app.post('/show', urlencodedParser, function (req, res){
    //var reply='';
    //reply += "first  number is" + req.body.one;
    //reply += "sec number is" + req.body.two; 
          
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "airline"
    });
  
   var flag=0;
  //--------------------------------------------------------------------------------------//
  con.connect(function(err) {
  if (err) throw err;
          console.log("Connected!");
        var source = req.body.source;
		var destination = req.body.destination;
		var date2 = req.body.date2;
        var time = req.body.time;
		  var sql ="select * from flight where ffrom='"+source+"' and fto='"+destination+"' and fdate='"+date2+"' and ftime='"+time+"';";
		  

          var rr = "<html>";
          rr = rr+"<head>";
          rr = rr+"<style>";
          rr = rr+"table, th, td {";
          rr = rr+"border: 1px solid black";
          rr = rr+"}";
          rr = rr+"</style>";
          rr = rr+"</head>";
          rr =rr+ "<body>";
          
          rr = rr+"<h3>List of flights are:</h3>";
          rr = rr+"<table style:'width:100%'>";
          rr = rr+"<tr>";
          rr = rr+"<th>Flight number</th>";
          rr = rr+"<th>From</th>";
          rr = rr+"<th>To</th>";
          rr = rr+"<th>Date</th>";
          rr = rr+"<th>Time</th>";
		  rr = rr+"<th>Amount</th>";
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
                      rr = rr+"<td>"+rows[i].fid+"</td>";
                      rr = rr+"<td>"+rows[i].ffrom+"</td>";
                      rr = rr+"<td>"+rows[i].fto+"</td>";
                      rr = rr+"<td>"+rows[i].fdate+"</td>";
                      rr = rr+"<td>"+rows[i].ftime+"</td>";
					  rr = rr+"<td>"+rows[i].amount+"</td>";
                      rr = rr+"</tr>";
                      
                 
              }
          }
              rr = rr+"</body>";
              rr = rr+"</html>";
              res.send(rr);
          });
          
         }).listen(9000);  
//app.listen(9001);


