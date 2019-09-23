
// ImplementServices()


var uiModel = {
    register: function(){
        window.location.assign("/register")
    },
    login: function(){
         var login = document.getElementById("login");

         if(login.style.visibility == "visible"){
             login.style.visibility = "hidden"
         }else{
             login.style.visibility = "visible"
         }

    },
    logIn: function(){
        debugger;
      loadingOn();

      setTimeout(function(){ debugger; loadingOff()},5000)
    },
    Send: function () {
        var Value = {
            "name": document.getElementById("Name").value,
            "surname": document.getElementById("Surname").value,
            "nick": document.getElementById("Nick").value,
            "email": document.getElementById("Email").value
        }


       HttpRequestJson('/services', Value).then(data =>{
           console.log(data)
       })



    }
}




var el = document.getElementById('allPages');
rivets.bind(el, uiModel)
