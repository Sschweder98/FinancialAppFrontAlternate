var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var url = require('url'); 
const { Console } = require('console');

var tmp;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test#1234",
  database: "finance_app"
});

con.connect;

http.createServer(function (req, res) {
    var reqData = url.parse(req.url, true);
    const param = reqData.query;
    if (reqData.pathname === '/api'){
        con.query("SELECT * FROM _finance_data WHERE `date` LIKE '%" + param["datum"] + "%'", function (err, result, fields) {
            if (err) throw err;
            tmp = result;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(tmp));
        });
    } 
    else{
        fs.readFile('page.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    }

}).listen(8080);
