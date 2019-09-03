
// ImplementServices()


var uiModel = {
    register: function(){
        window.location.assign("~")
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
