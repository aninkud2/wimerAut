
const nodemailer=require("nodemailer")
const dotenv=require("dotenv")

dotenv.config()
const mailSender=async(options)=>{
const transporter=nodemailer.createTransport({
service:process.env.service,
auth:{
user:process.env.user,
pass: process.env.password,
secure:false
}

})
let  mailoption={

from:process.env.user,
to:options.email,
subject:options.subject,
text:options.message,

}


await transporter.sendMail(mailoption)
}

module.exports=mailSender