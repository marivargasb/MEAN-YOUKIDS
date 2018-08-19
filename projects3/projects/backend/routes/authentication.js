const Parent = require('../models/parentModel'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

module.exports = (router) => { 
// router.use('/authentication', authentication);  
    
router.get('/', (request, response) => {
    //connect to db and get data
    response.render('index', {
        title: 'Main Title',
        content: 'The content of the page'
    })
});


router.get('/parents',  (request, response) => {
    Parent.find(function(err, parents) {
      
        if(err){
            response.send(err);
        }
        response.render('index', { 
            title: 'Parents',
            content: JSON.stringify(parents)

        });
    });
    
    });
 
router.get('/parents/:id',(req, res)  => {
  var parent = new Parent();
  if ((req.params.id) == null){ 
     //   res.status(422);
       res.json({success: false, message: 'vasio' });
  }

  Parent.findOne({ _id: req.params.id.toLowerCase() } , (err, parent) => {
  
    if(err){
     // res.status(422);
     // res.json({success: false, message: 'no encontrado' } );
     res.json({ success: false, message: err }); // Return error
      console.log("error");
    }

    //res.json({ success: true, message: 'Success!'});
    res.json({ success: true, parent }); // Return success and token to frontend
    console.log(parent);   

  })
  
});

router.post('/email',(req, res)  => {
  console.log(req.body.email);
  var parent = new Parent();
  if ((req.body.email) == null){ 
       res.json({success: false, message: 'vasio' });
       console.log(vasio);
  }

  
});

 /* ========
  edit ROUTE
  ======== */

router.put('/parents/:id', (req, res) => {
  var parent = new Parent();

  if ((req.params.id) == null){ 
    //   res.status(422);
      res.json({success: false, message: 'vasio' });
 }

   var pa = {
   
    name: req.body.name,
    surnames: req.body.surnames,
    country: req.body.country,

  };
  Parent.findByIdAndUpdate(req.params.id, { $set: pa }, { new: true }, (err, parent) => {
     
    if (err) {  res.json({ success: false, message: err }); // Return error
      console.log("error");
     }
  else { 

        res.json({ success: true, parent }); // Return success and token to frontend
        console.log("parentssss" + parent);  
       }

       
  });
});


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





 /* ========
  LOGIN ROUTE
  ======== */
  router.post('/login', (req, res) => {

    var parent = new Parent();

  
    // Check if username was providedS
    if (!req.body.email) {
       res.json({ success: false, message: 'correo vacio' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'password vacio' }); // Return error
      } else {
        // Check if email exists in database

        Parent.findOne({ email: req.body.email.toLowerCase() }, (err, parent) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: "su cuenta no esta registrada, de estarlo vuelvalo a intentar" }); // Return error
          } else {
            // Check if email was found


            if (!parent) {
              res.json({ success: false, message: ' Sus datos son validos revice sus datos nuevamente ' }); // Return error
            } else {
           //   const validPassword = parent.password(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (parent.password != req.body.password) {
                res.json({ success: false, message: 'password ivalido' }); // Return error
              } else {

             
                const token = jwt.sign({ parentId: parent._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                res.json({ success: true, message: 'lISTO!', token: token, email: parent.email,  state: parent.state , id: parent._id }); // Return success and token to frontend

                console.log(token);
                console.log(parent);
              }
            }
          }
        });
      }
    }

    console.log("login" +  req.body.email + req.body.password);
  });


  router.delete('/parents/:id', (req, res) => {

    var parent = new Parent();
     console.log("eliminando");
    Parent.findByIdAndRemove(req.params.id, (err, parent) => {
      if (err) {  res.json({ success: false, message: err }); // Return error
      console.log("error al eliminar su cuenta");
     }
  else { 
       console.log("DELETE PARENT");  
        res.json({ success: true }); // Return success and token to frontend
      
       }
    });
});





 /* ========
  CODE ROUTE
  ======== */
  router.post('/code', (req, res) => {

    var parent = new Parent();
 
    // Check if username was providedS
    if (!req.body.email) {
      res.json({ success: false, message: 'No email was provided' }); // Return erro    
      console.log("vacio email");

    } else {
      // Check if password was provided
      if (!req.body.code) {
        res.json({ success: false, message: 'No code was provided.' }); // Return error
        console.log("vacio code");
      } else {
        // Check if email exists in database
        console.log("entrando a buscar");
        Parent.findOne({ email: req.body.email.toLowerCase() }, (err, parent) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
            console.log("error buscando");
          } else {
            // Check if email was found
            if (!parent) {
              res.json({ success: false, message: 'email not found.' }); // Return error
              console.log("correo no encontrado");
            } else {
           //   const validcode = parent.code(req.body.code); // Compare code provided to code in database
              // Check if code is a match
              if (parent.code != req.body.code) {
                res.json({ success: false, message: 'code invalid' }); // Return error
                console.log("correo no igual");
              } else {
             console.log("vamos hacer  el cambio");
                res.json({ success: true,  message: 'fine', id: parent._id  });
             
              
              }
            }
          }
        });
      }
    }

   // console.log("code" +  req.body.email + req.body.code);
  });



  router.put('/codes/:id', (req, res) => {
    var parent = new Parent();
  
    if ((req.params.id) == null){ 
      //   res.status(422);
        res.json({success: false, message: 'vasio' });
   }
   console.log(req.body._id);
  
   var pa = {state: 'on'};

    Parent.findByIdAndUpdate(req.params.id, { $set: {state: 'on'} }, { new: true }, (err, parent) => {
     
      if (err) {  res.json({ success: false, message: err }); // Return error
      console.log("error cambiando");
        }else { 
       console.log("cambiado");
       const token = jwt.sign({ parentId: req.body._id}, config.secret, { expiresIn: '24h' }); // Create a token for client
       res.json({ success: true, message: 'Success!', token: token , id: req.body._id  }); // Return success and token to frontend

       console.log(token);
       console.log(parent); 
        }

       });
  }); 


    
  /*================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================
  router.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided au' }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
  });

 */

  
   return router; // Return router object to main index.js
}
