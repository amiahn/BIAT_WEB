const mongoose = require('mongoose')
const Etiquette = new mongoose.Schema( {
   Identifiant :{
    type : String 
   }
},
{collection : 'Etiquettes'}
);

module.exports = mongoose.model('Etiquettes', Etiquette) ;