'use strict'
var MongoClient = require('mongodb').MongoClient;
var config = require('../config.json');
var sha256 = require('sha256');

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
            "adminAccess": false
        }
        var newDataBase = data.db("UsersWaitingForAccept")
        newDataBase.collection("waitingUsers").insertOne(userInformation, function(err, res){
            if(err) throw err;

            console.log("user Added")
        });

        var answer = {
            "message": "ok",
            "body": req.body
        }
        callback.send(answer)

    })







}
