var fs = require('fs');
var express = require("express");
var app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/test', express.static(__dirname + '/test'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/test/runner.html');
});

var host = '127.0.0.1';
var port = 3001;

app.listen(port);

var f=fs.readFileSync(__dirname + '/help.txt', 'utf8');
console.log(f.replace('{{host}}', host).replace('{{port}}', port));
console.log('Server running %s:%d...', host, port);