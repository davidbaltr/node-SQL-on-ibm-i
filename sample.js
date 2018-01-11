var credentials = require("./credentials");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a');

var DBname = "*LOCAL";
var userId = credentials.userName;
var passwd = credentials.pwd;
var ip     = credentials.ip;
var port   = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* serves main page */
app.get("/", function (req, res) {
  res.sendfile('sample.html')
});

app.post("/sql", function (req, res) {
  
  var sql = req.body.query;

  if (sql && sql.length > 0) {

    console.log("SQL statement : " + sql);
    var dbconn = new db.dbconn();
    dbconn.conn(DBname, userId, passwd);  // Connect to the DB 

    var stmt = new db.dbstmt(dbconn);
    stmt.exec(sql, (rs) => { 
      // Query the statement
      res.send(JSON.stringify(rs));
    });
  }
});

app.use('/static', express.static('static'))

app.listen(port, function () {
  console.log("Listening on " + ip + ":" + port);
});

