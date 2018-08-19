const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');

const kids = new Schema({
   name : { type: String , required:true  },
   username: { type: String , required:true , unique: true, },
   pin: { type: String , required:true },
   birth: { type: String , required:true },
   id_parent: { type: String , required:true },

});

module.exports = mongoose.model('kids', kids);

