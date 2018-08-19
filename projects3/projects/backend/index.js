/* ===================
Import Node Modules
=================== */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Parent = require('./models/parentModel');
const config = require('./config/database');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authentication = require('./routes/authentication')(router); 
const kids = require('./routes/kids')(router); 
const videos = require('./routes/videos')(router); 

// Database Connection
mongoose.connect(config.uri,{ useNewUrlParser: true } ,(err) => {
    if (err) {
      console.log('Could NOT connect to database: ', err);
    } else {
      console.log('Connected to database: ' + config.db);
    }
  });

  // Middleware
  
 // app.use(app.router);
  app.use(cors({ origin: 'http://localhost:4200' }));
  app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
 //app.use(express.static(__dirname + '/../frontend/')); // Provide static directory for frontend
  app.use('/authentication', authentication);
  app.use('/kids', kids);
  app.use('/videos', videos);


// Connect server to Angular 2 Index.html
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + '../frontend/tubekids/dist/index.html'));
//  });


app.listen(8000, () => 
console.log('TODO API is listening on port 8000!'));