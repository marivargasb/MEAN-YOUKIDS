const Parent = require('../models/parentModel'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const hbs = require('nodemailer-express-handlebars');
//nodemailer
const nodemailer = require('nodemailer');

module.exports = (router) => { 

 /* ========
  Register ROUTE
  ======== */
  router.post('/parents', (req, res) => {

    if((req.body.email || req.body.password || req.body.name || req.body.surnames || req.body.country || req.body.birth ) === ''){
    res.json({ success: false, message: "todos los datos deben estar completos" }); 
     console.log("no estan completos"); // Return error
    }
    
     else{
  
      var parent = new Parent();
      req.param.id
      parent.email = req.body.email;
      parent.password = req.body.password;
      parent.name = req.body.name;
      parent.surnames = req.body.surnames;
      parent.country = req.body.country;
      parent.birth = req.body.birth;
      parent.state = req.body.state;
      console.log(req.body);
      var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
      var contraseña = "";
      for (i=0; i<20; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
       parent.code = contraseña;
       console.log(req.body.email);
  
     
        parent.save(function(err){
          if (err) {  res.json({ success: false, message: err }); // Return error
          console.log("error");
         }
      else { 
       
    
           console.log("ADD NEW PARENT");  
            res.json({ success: true,  message: " Registrado Exitosamente" }); // Return success and token to frontend
  
            
            let transport = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: '587',
              service: 'gmail',
              auth: {
                  user: 'mvb1996.23@gmail.com',
                  pass: '86161177'
              },
              tls: {
                  rejectUnauthorized: false
              }
          });
         
          let mailOptions = {
            from: '"TUBEKIDS YEAH 👻" <mvb1996.23@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'Confirmation code ✔', // Subject line
            text: 'this is your code'+ parent.code , // plain text body
            html: '<b>this is your code!! </b>' + '<br>' + '<h1>'+ parent.code + '</h1>' // html body
          };
          console.log("enviando");
          
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          
          });
  
        
          
           }
        });
  
    
      }
  });



      
   return router; // Return router object to main index.js
}
