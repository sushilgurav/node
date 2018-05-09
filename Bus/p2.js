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
    database: "film"
});

app.get('/r', function (req, res) {
    var rr = `
    <html>

    <head>
        <title>Making Get Requests</title>
        <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet" id="bootstrap-css">
        <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
		<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    </head>

    <body>
        
        <form method='post' action='/'>
            <div class="col-md-4" style="padding-top: 10px;">
                <div class="form-group">
                    <input type="number" class="form-control" name="ticketno" placeholder="Account No"  />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="name" placeholder="Name" />
                </div>
				<div class="form-group">
                    <input type="number" class="form-control" name="ticket_type" placeholder="Ticket Type" />
                </div>               
                <div class="form-group">
                    <input type="DATE" class="form-control" name="date1" placeholder="DATE" />
                </div>
                <div class="form-group">
                    <input type="TIME" class="form-control" name="time1" placeholder="TIME" />
                </div>
                
                
        

                
                <div class="form-group">
                    <button class="button button-default" formaction="AddtoDb" name="submitbtn" type="submit" value="ins">BOOK Ticket</button>
                   
                </div>
				<div class="form-group">
                    <button class="button button-default" formaction="deltoDb" name="submitbtn" type="submit" value="ins">CANCEL Ticket</button>
                   
                </div>
            </div>
        </form>
    </body>
    </html>
    `;
    res.send(rr);
})

app.post('/AddtoDb', urlencodedParser, function (req, res) {
    var ticketno = parseInt(req.body.ticketno);
    var name = req.body.name;
	var ticket_type=req.body.ticket_type;
    var date1 = req.body.date1;
    var time1 = req.body.time1;
    //var balance = parseFloat(req.body.balance);

    var sql = "INSERT INTO film values(" + ticketno + ",'" +name +"','" + ticket_type + "','" +date1 +"','" + time1 + "');";
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(ticketno + " " + name + " " + ticket_type +" "+ date1 + " " + time1 +  " Inserted");
    });
    //res.redirect("/r");
    res.send("Insert Successfully");
    res.end();
});
app.post('/deltoDb', urlencodedParser, function (req, res) {
    var ticket_no = parseInt(req.body.ticketno);
    
    //var balance = parseFloat(req.body.balance);

    var sql = "delete from film where ticketno="+ticket_no+"";
    console.log(sql);
    con.query(sql, function (err, res) {
        if (err) throw err;
        console.log(ticket_no +  " deleted");
    });
    //res.redirect("/r");
    res.send("deleted Successfully");
    res.end();
});
app.listen(9000);