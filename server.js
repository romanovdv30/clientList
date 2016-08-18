var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var path = "app/data/clients.json";
//
// app.get('/listUsers', function (req, res) {
//     fs.readFile( path, 'utf8', function (err, data) {
//         console.log( data );
//         var page = parseInt(req.query.page, 10) || 0;
//         var pageSize = parseInt(req.query.pageSize, 10) || 10;
//         var clients = JSON.parse(data);
//         var totalItems = clients.length;
//
//         var result = clients.splice((pageSize * page) + 1, pageSize);
//
//         res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//         res.header('Access-Control-Allow-Headers', 'Content-Type');
//
//         var dataObj  = {
//             totalItems: totalItems,
//             page: page,
//             result: result
//         };
//         res.end( JSON.stringify(dataObj) );
//     });
// });

app.post('/listUsers', function(req, res){
    fs.readFile( path, 'utf8', function (err, data) {
        console.log( data );
        var page = parseInt(req.body.page, 10) || 0;
        var pageSize = parseInt(req.body.pageSize, 10) || 10;
        var clients = JSON.parse(data);
        var totalItems = clients.length;

        var result = clients.splice((pageSize * page) + 1, pageSize);

        res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        var dataObj  = {
            totalItems: totalItems,
            page: page,
            result: result
        };
        res.end( JSON.stringify(dataObj) );
    });
});

var server = app.listen(4000, function () {
    console.log("Example app listening at http://localhost:4000")
});