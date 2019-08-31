module.exports.prepareAuthContext = function( req, res){
    console.log(this)
    var x =  Object.keys(res)

    console.log(x)
    res.json({"asdf": 'ine dziala'})
}
