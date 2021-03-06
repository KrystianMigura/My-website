var mailer = require("./index")
var nodemailer = require('nodemailer')
var credentials = require('../credentional.json')

module.exports.authorization = function(userInformation){
var account = new Promise(function(resolve, reject){
    console.log('move to email createTransport')

   // let testAccount = nodemailer.createTestAccount();


    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "Gmail",
        port: 587,
        secure: false,
        auth: {
            user: credentials.gmail.user,
            pass: credentials.gmail.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var transport = {
        transporter: transporter,
        userInformation: userInformation
    }
    resolve(transport)
})
    return account.then( data => {

        return mailer.sendEmail(data);
    })

}
//dodać całą resztę!
module.exports.sendEmail = function(transporter){
    var html = "Dziękujemy za rejestracje na naszej stronie<br> Poniżej znajduje się link w celach potwierdzenia rejestracjii.<br> Gdy zostaną państwo przekierowani na stronę główną, to autoryzacja przebiegła pomyślnie<br> W razie pytań proszę o kontakt. <br>"
    let info = new Promise(function(resolve, reject){

        const mailOptions = {
            from: 'simplegamesofdev@gmail.co', // sender address
            to: transporter.userInformation.email, // list of receivers
            subject: 'Potwierdzenie rejestracji użytkownika na Stronie SimpleGameSofDev', // Subject line
            html: html + "Link: http://192.168.1.106/register&data="+transporter.userInformation.name+"&"+transporter.userInformation.nick+"&"+transporter.userInformation.uniqueId+""
        };

         transporter.transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err + "error")
            else
                console.log("mail sended to user!")
        });

    })
    return info.then(data =>{
        return data
    })
}
