'use strict'
var MongoClient = require('mongodb').MongoClient;
var config = require('../config.json');

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

            }
        });

    return db
}

module.exports.addUser = function(req, res){

    //need get email username passwd code number of auth send user status authorization

    var con = new Promise(function(resolve, reject){
       var dat = auth.authToMongoDb();
        resolve(dat);
    });

    con.then(function(data) {
       var DataBase = data.db("Users");
        var dbAdmin = DataBase.admin();

        new Promise(function(resolve, reject){

/**
**
* {myobj}param inside string
**
**/

            var myobj = {
                firstname: '',
                surname: '',
                nick: 'firstname',
                email: '',
                password: '',
                keyForAuth: '',
                confirmed: ''
                }
            DataBase.collection("users").insertOne(myobj, function(err, res){

                console.log(res)
            })
        })


        console.log('there add new user @@@@@@@@@@@@@@@@@@@@@@')
    })

}

module.exports.createNewUser = function(req, callback){
    var md5 = require('md5');
    var con = new Promise(function(resolve, reject){
        var dat = auth.authToMongoDb();
        resolve(dat);
    });

    return con.then(data => {

        var DataBase = data.db("Users");
        var dbAdmin = DataBase.admin();

        var addUser = new Promise(function(resolve, reject){
            var pack = req.body;
            console.log(pack.password + " przed md5")
            var a = pack.pass
            var xxx = md5(a);
            console.log(xxx + " po md5")

            DataBase.collection("users").insertOne(pack, function(err, res){

               resolve(res)
            })

        })

        return addUser.then(data => {

            console.log(data + "!@!!!!!!!!!!!!!!!!");
        })

    })



    var pack = req.body;

    var answer = {
        pack : pack,
        message: "all its ok"
    }
    callback.send(answer)




}
