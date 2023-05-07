const mongoose = require('mongoose')

const User = new mongoose.Schema({
    nom : 
    {   type : String,
        required : true,
    },
    Prenom : 
    {   type : String,
        required : true,
    },
   
    Email : 
    {   type : String,
        required : true,
        unique : true
    },
    
    Num_Bureau: 
    { type : mongoose.Schema.Types.ObjectId , 
        ref : "Local" ,
        required : true    
    },
    Role : 
    {   type : String,
        required :true 
        
    },
    Password : 
    {   type : String,
        required : true,
    }},
    {collection : 'Users'}
)

module.exports = mongoose.model('Users', User) ;