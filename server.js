var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var siteUrl = "http://localhost:63342";
var pathToAllList = "app/data/clients.json";
var pathToAdminsList = "app/data/admins.json";
var pathToUsersList = "app/data/users.json";

fs.readFile(pathToAllList, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    } else {
        var clients = JSON.parse(data);
        var users = [];
        var admins = [];
        clients.forEach(function (item) {
            if (item.admin) {
                admins.push(item);
            } else {
                users.push(item);
            }
        });
        users = users.map(function (item) {
            delete item['phone'];
            return item;
        });
        var usersResult = JSON.stringify(users);
        var adminsResult = JSON.stringify(admins);
    }

    fs.writeFile(pathToUsersList, usersResult, 'utf8', function (err) {
        if (err) return console.log(err);
    });

    fs.writeFile(pathToAdminsList, adminsResult, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

app.options('/*', function (req, res) {
    addResponseHeaders(res);
    res.status(200);
    res.end();
});

app.post('/user', function (req, res) {
    fs.readFile(pathToUsersList, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log(data);
            var users = JSON.parse(data);
            var model = req.body;
            var maxId = 0;
            users.forEach(function (item) {
                if (item["id"] > maxId) {
                    maxId = item["id"];
                }
            });
            model["id"] = maxId + 1;

            users.push(model);
            model = JSON.stringify(model);
            users = JSON.stringify(users);

            fs.writeFile(pathToUsersList, users, 'utf8', function (err) {
                if (err) return console.log(err);
            });
            addResponseHeaders(res);
            res.status(201);
            res.end(model);
        }
    });
});

app.delete('/user', function (req, res) {
    fs.readFile(pathToUsersList, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log(data);
            var id = parseInt(req.body.id);
            var users = JSON.parse(data);
            var removeIndex;
            users.forEach(function (item, index) {
                if (item['id'] === id) {
                    removeIndex = index;
                }
            });
            var deletedModel = users.splice(removeIndex, 1)[0];
            users = JSON.stringify(users);
            fs.writeFile(pathToUsersList, users, 'utf8', function (err) {
                if (err) return console.log(err);
            });
            addResponseHeaders(res);
            res.end(JSON.stringify(deletedModel));
        }
    });
});

app.post('/users', function (req, res) {
    fs.readFile(pathToUsersList, 'utf8', function (err, data) {
        if (err) {
            if (err) return console.log(err);
        } else {
            console.log(data);
            var page = parseInt(req.body.page, 10) || 0;
            var pageSize = parseInt(req.body.pageSize, 10) || 10;
            var users = JSON.parse(data);
            var totalItems = users.length;
            var result = users.splice((pageSize * page) + 1, pageSize);
            addResponseHeaders(res);
            var dataObj = {
                totalItems: totalItems,
                page: page,
                result: result
            };
            res.end(JSON.stringify(dataObj));
        }
    });
});
app.put('/user', function (req, res) {
    fs.readFile(pathToUsersList, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log(data);
            var users = JSON.parse(data);
            var model = req.body;
            var id = +parseInt(model['id']);
            model.id = id;
            var findIndex;
            users.forEach(function (item, index) {
                if (item['id'] === id) {
                    findIndex = index;
                }
            });
            users.splice(findIndex, 1, model);
            users = JSON.stringify(users);

            fs.writeFile(pathToUsersList, users, 'utf8', function (err) {
                if (err) return console.log(err);
            });
            model = JSON.stringify(model);
            addResponseHeaders(res);
            res.status(200);
            res.end(model);
        }
    });
});
app.get('/user', function (req, res) {
    fs.readFile(pathToUsersList, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log(data);
            var users = JSON.parse(data);
            var id = parseInt(req.query.id);
            var findIndex;
            users.forEach(function (item, index) {
                if (item.id === id) {
                    findIndex = index;
                }
            });
            var result = users[findIndex];
            addResponseHeaders(res);
            res.end(JSON.stringify(result));
        }
    });
});

function addResponseHeaders(obj) {
    obj.header('Access-Control-Allow-Origin', siteUrl);
    obj.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    obj.header('Access-Control-Allow-Headers', 'Content-Type');
}

var server = app.listen(4000, function () {
    console.log("Example app listening at http://localhost:4000")
    
});
//
// var server = app.listen(8000, function () {
//
// });