const mongoose = require('mongoose');
const Etiquette = require('./Etiquette') 
//const Local = require ("./local") ;
const Carateristques = new mongoose.Schema({
    Ram :{
        type:String
    },
    Processeur : {
        type:String 
    },
    carte_Graphique:{
        type:String
    }
})
const Material = new mongoose.Schema({
    des_article : 
    {   type : String,
        required :true
        
    },
    type : 
    {   type : String,
        required :true
        
    },
   
    N_Serie : 
    {   type : String,
        required :true ,
        //unique :true 
       
    },
    N_inventaire : 
    {   type : String,
        required :true ,
        //unique :true 
       
      
    },
    Etat : 
    {   type : String,
        required :true 
      
    },

    carateristque:{
        type:Carateristques 
    },

     Etiquette :{ 
         
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Etiquette" ,
     required : true ,
     unique : true ,
    },
    
    localisation : { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Local" ,
        required : true 
    },
    adresse_Mac: {
        type :String ,
        
    }    
},

    {collection : 'Materials'}
)



module.exports = mongoose.model('Materials', Material) ;