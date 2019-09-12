const express = require('express');
const routing = require('./routing');
const mongo = require('./configuration/database');
const request = require('request');
const services = require('./configuration/global');
const Bottle = require('bottlejs');
// const asdf = require('./admin/behavior/services.js')
var bodyParser = require('body-parser')

    var app = express();

routing.registerRoutes(app)



// app.post('/services', function (req, res) {
//     console.log(req.body)
//     console.log(req)
//     res.send(req.body)
//     // create user in req.body
// })

app.use(bodyParser.json());
app.use('/scripts', express.static(__dirname + '/admin/behavior/'));
app.use('/site', express.static(__dirname + '/site/behavior/'));
app.use('/style', express.static(__dirname + '/style/admin'));
app.use('/styleSite', express.static(__dirname + '/style/site'));
app.use('/service', express.static(__dirname+'/configuration/global'));
app.use('/asdf', express.static(__dirname+'/dest'))

//fix in 404 error
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.sendFile(__dirname+"/admin/pages/404.html")
});

app.use(function(req, res, next) {
    req.setHeader("Content-Type", "application/json;");
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );


    next();
});


//connect to mongoDb
(function(){
    new Promise(function(resolve, reject){
         mongo.authToMongoDb()
    })




})();




var server = app.listen(80,'192.168.1.106', function(){


       var host = server.address().address
       var port = server.address().port

    console.log(host, port)
});

