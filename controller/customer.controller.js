const { request, response } = require("express");
const transporter=require('../mail/mail');

exports.sendOtp=(request,response,next)=>{
    const email=request.body.email;
    const otp=Math.floor((Math.random() * 10000) + 1);
    const mailData = {
        from: 'kushwahshailendra732@gmail.com', 
          to: email,   
          subject: "EMAIL VERIFICATION",
          text:"hello "+request.body.name+" Your One Time Password is :-"+otp
          
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err){
                console.log(err)
            return response.status(500).json({message:"error"})
         
        }
            else
              return response.status(200).json({message:"sucesss"})
         });
         

};