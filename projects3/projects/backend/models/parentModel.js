const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');

const parent = new Schema({
   email : { type: String , required:true , unique: true, },
   password: { type: String , required:true },
   name: { type: String , required:true },
   surnames: { type: String , required:true },
   country: { type: String } ,
   birth: { type: String , required:true },
   state: { type: String , required:true },
   code:   {type: String , required:true },
});

module.exports = mongoose.model('parents', parent);