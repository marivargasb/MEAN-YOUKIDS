const Kids = require('../models/kidsModel'); // Import User Model Schema
const jwt = require('jsonwebtoken');  // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration


module.exports = (router) => { 
   // router.use('/kids', kids);



 router.get('/', (request, response) => {
    //connect to db and get data
    response.render('index', {
        title: 'Main Title',
        content: 'The content of the page'
    })
});

router.get('/kids',  (request, response) => {
    Kids.find(function(err, kid) {
      
        if(err){
            response.send(err);
        }
        response.render('index', { 
            title: 'kids',
            content: JSON.stringify(kid)

        });
    });
    
    });


router.get('/kids',(request, response)=> {

    console.log("feel");
  
    Kids.find(function(err, kids) {
      
        if(err){
            response.send(err);
        }
        response.render('index', { 
            title: 'kids',
            content: JSON.stringify(kids)

        });
    });

    }); 
    

            
    router.get('/kid/:id',(req, res)  => {
      var kids = new Kids();
      if ((req.params.id) == null){ 
         //   res.status(422);
           res.json({success: false, message: 'vasio' });
      }
    
      Kids.findOne({ _id: req.params.id.toLowerCase() } , (err, kids) => {
      
        if(err){
         // res.status(422);
         // res.json({success: false, message: 'no encontrado' } );
         res.json({ success: false, message: err }); // Return error
          console.log("error");
        }
        //res.json({ success: true, message: 'Success!'});
        res.json({ success: true, name: kids.name , parent: kids.id_parent, kids  }); // Return success and token to frontend
        console.log("llego a kids"+kids );  
         
     
      })
      
    }); 
    


          
    router.get('/kids/:id_parent',(req, res)  => {
        var kids = new Kids();
        if ((req.params.id_parent) == null){ 
           //   res.status(422);
             res.json({success: false, message: 'vasio' });
        }
      
        Kids.find({ id_parent: req.params.id_parent.toLowerCase() } , (err, kids) => {
        
          if(err){
           // res.status(422);
           // res.json({success: false, message: 'no encontrado' } );
           res.json({ success: false, message: err }); // Return error
            console.log("error");
          }
          //res.json({ success: true, message: 'Success!'});
          res.json({ success: true, kids }); // Return success and token to frontend
          console.log(kids);   
       
        })
        
      }); 


      
       /* ========
  Register ROUTE
  ======== */
router.post('/kids', (req, res) => {
    var kid = new  Kids();
    req.param.id
    kid.name = req.body.name;
    kid.username = req.body.username;
    kid.pin = req.body.pin;
    kid.birth = req.body.birth;
    kid.id_parent = req.body.id_parent;


    console.log(req.body);
    kid.save(function(err){
      if (err) {  res.json({ success: false, message: err }); // Return error
      console.log("error");
     }
  else { 
       console.log("ADD NEW KIDS" + kid);  
        res.json({ success: true, kid }); // Return success and token to frontend
      
       }
    });
});

 /* ========
  edit ROUTE
  ======== */

  router.put('/kids/:id', (req, res) => {
    var kid = new  Kids();
  
    if ((req.params.id) == null){ 
      //   res.status(422);
        res.json({success: false, message: 'vasio' });
   }
  
     var pa = {
     
      name: req.body.name,
      username: req.body.username,
      pin: req.body.pin,
      birth: req.body.birth,
  
    };

    Kids.findByIdAndUpdate(req.params.id, { $set: pa }, { new: true }, (err, kid) => {
       
      if (err) {  res.json({ success: false, message: err }); // Return error
        console.log("error");
       }
    else { 
  
          res.json({ success: true, kid}); // Return success and token to frontend
          console.log("kidss" + kid);  
         }
  
         
    });
  });
  
  router.delete('/kids/:id', (req, res) => {
      console.log("antes");
    var kid = new  Kids();
     console.log("eliminando");
    Kids.findByIdAndRemove(req.params.id, (err, kid) => {
      if (err) {  res.json({ success: false, message: err }); // Return error
      console.log("error al eliminar su cuenta");
     }
  else { 
       console.log("DELETE KIDS");  
        res.json({ success: true }); // Return success and token to frontend
      
       }
    });
});

 /* ========
  LOGIN ROUTE
  ======== */
  router.post('/kids/login', (req, res) => {
    console.log("pos kids login");
    var kid = new Kids();
  
    console.log("antes");  
    // Check if username was providedS
    if (!req.body.username) {
        console.log("username basio");  
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.pin) {
        console.log("pin vasio");  
        res.json({ success: false, message: 'No pin was provided.' }); // Return error
      } else {
        // Check if username exists in database

        Kids.findOne({ username: req.body.username.toLowerCase() }, (err, kid) => {
           
          // Check if error was found
          if (err) {
            console.log("no hay nada "); 
            res.json({ success: false, message: err }); // Return error
          
          } else {
            // Check if username was found


            if (!kid) {
              res.json({ success: false, message: 'username not found.' }); // Return error
            } else {
           //   const validpin = kid.pin(req.body.pin); // Compare pin provided to pin in database
              // Check if pin is a match
              if (kid.pin != req.body.pin) {
                console.log("sin pin "); 
                res.json({ success: false, message: 'pin invalid' }); // Return error
              } else {

             
                const token = jwt.sign({ kidId: kid._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                res.json({ success: true, message: 'Success!', token: token, username: kid.username, id: kid._id, name: kid.name }); // Return success and token to frontend

                console.log(token);
                console.log(kid);
              }
            }
          }
        });
      }
    }
   

   // console.log("login:  " +  req.body.username + req.body.pin);
  });

  
  router.post('/email',(req, res)  => {
    console.log(req.body.email);
    var parent = new Parent();
    if ((req.body.email) == null){ 
         res.json({success: false, message: 'vasio' });
         console.log(vasio);
    }
  
    
  });

return router;
}