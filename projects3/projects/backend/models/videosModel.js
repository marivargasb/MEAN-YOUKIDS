
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');

const videos = new Schema({
   name : { type: String , required:true  },
   url: { type: String , required:true },
   type: { type: String , required:true },
      id_parent: { type: String , required:true },

});

module.exports = mongoose.model('videos', videos);