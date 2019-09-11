

var uiModel ={
    information: '',
    send: function(){
        loadingOn();
        debugger;
        var name = document.getElementById("Name").value;
        var surname = document.getElementById("Surname").value;
        var nick = document.getElementById("Nick").value;
        var email = document.getElementById("Email").value;
        var password = document.getElementById("password").value;
        var replyPassword = document.getElementById("password1").value;

        var at = email.indexOf('@')
        if (password !== replyPassword || at == -1 ){
            uiModel.information = "Hasła nie są takie same... lub email jest zły";
            loadingOff();
        }else {
            uiModel.information = '';


            var registerPack = {
                "name": name,
                "surname": surname,
                "nick": nick,
                "email": email,
                "password": password
            }

            var checkExistUser = new Promise(function(resolve, reject){
                return HttpRequestJson("/checkUser",registerPack).then(function(info){
                    resolve(info)
                })

            })

            return checkExistUser.then(function(information) {
                debugger;
                if(information == true || information == "true"){
                    uiModel.information = "Podany użytkownik już istnieje w bazie..."
                    loadingOff();
                }

                if(information == false || information == "false"){
                    return registerNewUser(registerPack);

                }
            })

        }
    }
}



function registerNewUser(registerPack){
    var createUser = new Promise(function(resolve, reject){
         return HttpRequestJson("/createNewUser",registerPack).then(function(info){

            resolve(info)
        })
    })

    return createUser.then(data => {
        console.log(data)
       setTimeout(function(){loadingOff()},1000);
    });
}




var el = document.getElementById('allPages');
rivets.bind(el, uiModel)
