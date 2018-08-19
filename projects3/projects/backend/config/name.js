const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = mongoose.connect('mongodb://127.0.0.1:27017/tubeKids', { useNewUrlParser: true });
const Parent = require('./models/parentModel');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.set('view engine', 'pug');
// this is where we can put the public contents like css and js files
app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {
    //connect to db and get data
    response.render('index', {
        title: 'Main Title',
        content: 'The content of the page'
    })
});


app.get('/parents',  (request, response) => {
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
    

app.get('/parents',  (req, res) => {
Parent.find(function(err, parents) {
  
    if(err){
        res.send(err);
    }
    res.json(parents);
  });
});

app.post('/parents', (req, res) => {
    var parent = new Parent();

    parent.email = req.body.email;
    parent.password = req.body.password;
    parent.name = req.body.name;
    parent.surnames = req.body.surnames;
    parent.contry = req.body.contry;
    parent.birth = req.body.birth;
    parent.state = req.body.state;
    console.log(req.body);
    parent.save(function(err){
        if(err) {
            console.log("there is an error in adding user in database");
            res.status(422);
            res.json({error: err});
        }
        console.log("ADDED NEW PARENTS");
        res.status(201);
        res.json(parent);
    });
});


// handle 404
app.use(function(req, res, next){
    res.status(404);
    res.send({ error: 'Not found' });
    return;
});


app.listen(8000, () => 
console.log('TODO API is listening on port 3000!'));