var express = require('express');
var app = express();
var fs = require("fs");

var path = "app/data/clients.json";

app.get('/listUsers', function (req, res) {
    fs.readFile( path, 'utf8', function (err, data) {
        console.log( data );
        res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.end( data );
    });
});

var server = app.listen(4000, function () {
    console.log("Example app listening at http://localhost:4000")
});