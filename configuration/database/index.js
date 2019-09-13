'use strict'
var MongoClient = require('mongodb').MongoClient;
var config = require('../config.json');
var sha256 = require('sha256');
var uniqid = require('uniqid');
var path = require('path')
var configFile = path.join(__dirname,'../../');
var mailer = require("../mailer")
var db;
const auth = require('./index.js')

module.exports.authToMongoDb= function (req, res) {
    var url = "mongodb://"+config.mongoDb.address+"/"+config.mongoDb.name;
    var client = new MongoClient(url);


    client.connect(function(err, res){
            if(err) {
                console.log('NOT CONNECTED ', err)
                return false;
            }else {
                console.log('You Are Connected')
                db = res;
                try {
                    var newDataBase = db.db("UsersWaitingForAccept"); // created DATABASE
                    newDataBase.createCollection("waitingUsers", function (err, res) { // create table
                        console.log("collection work");
                    })
                } catch(e){
                    console.log(e)
                }

                try {
                    var newDataBase1 = db.db("AcceptedUsers"); // created DATABASE
                    newDataBase1.createCollection("Users", function (err, res) { // create table
                        console.log("collection work");
                    })
                } catch(e){
                    console.log(e)
                }
            }
        });

    return db
}

module.exports.ALL = function(req, res){

    console.log(req.url)
    var parametr = req.url.split("=")
    var value = parametr[1];
    value = value.split("&")
    var userName = value[0];
    var nick = value[1];
    var uniqueId = value[2];

    var con = new Promise(function(resolve, reject){
        var dat = auth.authToMongoDb();
        resolve(dat);
    });

    return con.then(data =>{

        var newDataBase = data.db("UsersWaitingForAccept");
        newDataBase.collection("waitingUsers").find({"name":userName, "nick":nick}).toArray(function(err, result) {
            if (err) throw err;

            if(result.length > 0)
            if(result[0].uniqueId == uniqueId){
                var newDataBase = data.db("UsersWaitingForAccept");
                newDataBase.collection("waitingUsers").deleteOne({"_id":result[0]._id});

                var newDataBase = data.db("AcceptedUsers")
                var userValue = result[0];
                userValue.authorization = "true";
                userValue.status = "free"
                newDataBase.collection("Users").insertOne(userValue, function(err, res){
                    if(err) throw err;


                });
                setTimeout(function(){res.redirect('/')},3000);

            }

            if(result.length == 0){
                res.redirect("/404")
            }



        });

    })
}

module.exports.checkUser = function(req, res){
    var con = new Promise(function(resolve, reject){
        var dat = auth.authToMongoDb();
        resolve(dat);
    });

    return con.then(data =>{


    var email = req.body.email;

    var valToSend = true;
    var newDataBase = data.db("UsersWaitingForAccept");

        newDataBase.collection("waitingUsers").find({"email": email}).toArray(function(err, result) {
            if (err) throw err;

            if(result.length == 0){
                valToSend = false;
            }

            if(result.length >0){
                valToSend = true;
            }
        })

        setTimeout(function(){res.send(valToSend)},500);
    });
}

module.exports.createNewUser = function(req, callback){

    var con = new Promise(function(resolve, reject){
        var dat = auth.authToMongoDb();
        resolve(dat);
    });

    return con.then(data => {
        var userInformation = {
            "name": req.body.name,
            "surname": req.body.surname,
            "nick": req.body.nick,
            "email": req.body. email,
            "password": sha256(req.body.password),
            "status": 'null',
            "authorization": 'null',
            "adminAccess": false,
            "uniqueId": uniqid()
        }
        var newDataBase = data.db("UsersWaitingForAccept")
        newDataBase.collection("waitingUsers").insertOne(userInformation, function(err, res){
            if(err) throw err;

            var email = new Promise(function(resolve, reject){
                console.log('emailPromise')
                return mailer.authorization(userInformation)

            })

            return email.then(information =>{


            })
            //nodemailer send email + link for authorization
            console.log("user Added")
        });

        var answer = {
            "message": "User added to temporary array",
            "body": req.body
        }
        callback.send(answer)

    })
}
