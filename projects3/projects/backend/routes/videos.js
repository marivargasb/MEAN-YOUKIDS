const Videos = require('../models/videosModel'); // Import User Model Schema
const jwt = require('jsonwebtoken');  // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration


module.exports = (router) => { 
   // router.use('/videos', videos);



 router.get('/', (request, response) => {
    //connect to db and get data
    response.render('index', {
        title: 'Main Title',
        content: 'The content of the page'
    })
});

router.get('/videos',  (request, response) => {
    videos.find(function(err, video) {
      
        if(err){
            response.send(err);
        }
        response.render('index', { 
            title: 'videos',
            content: JSON.stringify(video)

        });
    });
    
    });

    router.get('/videos/:id_parent',(req, res)  => {
        var  video = new Videos();
        if ((req.params.id_parent) == null){ 
           //   res.status(422);
             res.json({success: false, message: 'vasio' });
        }
      
        Videos.find({ id_parent: req.params.id_parent.toLowerCase() } , (err, video) => {
        
          if(err){
           // res.status(422);
           // res.json({success: false, message: 'no encontrado' } );
           res.json({ success: false, message: err }); // Return error
            console.log("error");
          }
          //res.json({ success: true, message: 'Success!'});
          res.json({ success: true, video }); // Return success and token to frontend
          console.log(video);   
       
        })
        
      }); 

    
    /*
    router.get('/videos/:id',(req, res)  => {
        var videos = new videos();
        if ((req.params.id) == null){ 
           //   res.status(422);
             res.json({success: false, message: 'vasio' });
        }
      
        videos.findOne({ _id: req.params.id.toLowerCase() } , (err, videos) => {
        
          if(err){
           // res.status(422);
           // res.json({success: false, message: 'no encontrado' } );
           res.json({ success: false, message: err }); // Return error
            console.log("error");
          }
          //res.json({ success: true, message: 'Success!'});
          res.json({ success: true, videos }); // Return success and token to frontend
          console.log(videos);   
      
        })
        
      }); 
*/


      
       /* ========
  Register ROUTE
  ======== */
router.post('/videos', (req, res) => {
    var video = new Videos();
    req.param.id
    video.name = req.body.name;
    video.url = req.body.url;
    video.type = req.body.type;
    video.id_parent = req.body.id_parent;


    console.log(req.body);
    video.save(function(err){
      if (err) {  res.json({ success: false, message: err }); // Return error
      console.log("error");
     }
  else { 
       console.log("ADD NEW videos" + video);  
        res.json({ success: true, video }); // Return success and token to frontend
      
       }
    });
});

 /* ========
  edit ROUTE
  ======== */

  router.put('/videos/:id', (req, res) => {
    var video = new  Videos();
  
    if ((req.params.id) == null){ 
      //   res.status(422);
        res.json({success: false, message: 'vasio' });
   }
  
     var pa = {
     
      name: req.body.name,
      url: req.body.url,
      type: req.body.type,
   
  
    };
    Videos.findByIdAndUpdate(req.params.id, { $set: pa }, { new: true }, (err, video) => {
       
      if (err) {  res.json({ success: false, message: err }); // Return error
        console.log("error");
       }
    else { 
  
          res.json({ success: true, video}); // Return success and token to frontend
          console.log("videoss" + video);  
         }
  
         
    });
  });
  
  router.delete('/videos/:id', (req, res) => {
      console.log("antes");
    var video = new  Videos();
     console.log("eliminando");
    Videos.findByIdAndRemove(req.params.id, (err, video) => {
      if (err) {  res.json({ success: false, message: err }); // Return error
      console.log("error al eliminar su cuenta");
     }
  else { 
       console.log("DELETE videos");  
        res.json({ success: true }); // Return success and token to frontend
      
       }
    });
});


return router;
}