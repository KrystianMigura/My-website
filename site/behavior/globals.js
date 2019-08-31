/*
*
* Krystian Migura 27.08.2019
*
* */

(function(globals){
    globals.ImplementServices = function(){

            HttpRequestJson('/implement').then(function(data){
                console.log(data);
                console.log("asdfasdfasdf")
            })

    }

    /*
    *
    * url param string
    * body param json
    *
    * */
    globals.HttpRequestJson= function (url, body){
        return new Promise(function(resolve, reject){

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    debugger;
                    var json = JSON.parse(xhr.responseText) || xhr.responseText;
                    resolve(json)
                }
            };
            var data = JSON.stringify(body);
            xhr.send(data);
        })
    }



})(window)

