var mysql = require('mysql');
var http = require('http');
var fs = require('fs');

var tmp;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test#1234",
  database: "finance_app"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM _finance_data", function (err, result, fields) {
    if (err) throw err;
    tmp = result;
  });
});


http.createServer(function (req, res) {
    if (req.url === '/api'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(tmp));
    } 
    else{
        fs.readFile('page.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    }

}).listen(8080);
