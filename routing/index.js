path = require('path')
var bodyParser = require('body-parser')
var configFile = path.join(__dirname,'../');
var file = require("./../ServicesPath.json")
module.exports.registerRoutes = function(app){
    routes(app);
}


function routes(app){
app.use(bodyParser.json({ limit: '128mb'}));
//all routes here

        //post
        app.post("/services",function(req,res){
                console.log(req.body)
                res.send(req.body);
        })

        app.post("/implement",function(req,res){
                console.log(req.body)
                var maps = new Map(file.map(i =>[i.name, i.path]))
                var dupa = maps.get("test");
                var send = require('./../'+dupa);
                var asdf = send.testowa();
                var dupa = {
                        asdf : asdf
                }
                res.send(dupa);
        })

        //get
        app.get("/", function(req, res){ res.sendFile( configFile+'/index.html')})
        app.get("/sys-ui", function(req, res){res.sendFile(configFile+"/admin/pages/index.html")})
        app.get("/dashboard",function(req, res){res.sendFile(configFile+"/admin/pages/dashboard.html")})
        app.get("/users",function(req, res){res.sendFile(configFile+"/admin/pages/users.html")})
        app.get("/create-post",function(req, res){res.sendFile(configFile+"/admin/pages/create-post.html")})
        app.get("/configuration",function(req, res){res.sendFile(configFile+"/admin/pages/configuration.html")})
        app.get("/log-out",function(req, res){res.send("logout panel")})

       // app.post("/addUser", require(configFile+'/configuration/database').addUser);

        app.get("/register", function(req, res){res.sendFile(configFile+"/site/pages/register.html")})


        app.post("/createNewUser", require(configFile+'/configuration/database').createNewUser);

        //error

        //style
        app.get("/",function(req, res){res.sendFile(configFile+"/style/")})



}
