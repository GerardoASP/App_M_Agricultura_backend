const twilio = require('twilio');
const dotenv = require('dotenv').config()

const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

const createSMS = () =>{
    client.messages.create({
        body:'Cuenta Verificada \n Revisa la aplicación ',
        to: '+573128581362',
        from: process.env.ADMIN_PHONE
    }).then((message) => console.log('SMS ====> ENVIADO'));
}


exports.sendSMS = () => createSMS()
