const mongoose = require('mongoose')
const Local = new mongoose.Schema( {
   nameLocal :{
    type : String 
   },
   type : {
      type : String 
   },
   Description : {
      type : String
   }
},
{collection : 'locaux'}
);

module.exports = mongoose.model('locaux', Local) ;