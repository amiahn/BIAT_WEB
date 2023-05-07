const Local = require("../models/local") ;
const jwt = require('jsonwebtoken') ;


async function createlocal (localInfo) {
    try {
      const newLocal = new Local(localInfo) ; 
      await newLocal.save(); 
      return newLocal 
    } catch(error) {
      throw Error(error)
    }
  }

  async function getLocals (user)  {

    let foundLocals;
    let userRole = user.Role 
    try{
      if (userRole == "Administrateur" || userRole== "Magasinier" ||userRole== "technicien") {
        foundLocals =  await Local.find({})
      } 
      
      return foundLocals 
      
    } catch(error){
    throw Error(error)
    }
  }

  async function deleteLocal(id)  {
    try{
      let Locals = await Local.deleteOne({_id: id});
      return Locals;
    } catch(error) {
      throw Error(error)
    }
    
    };

    async function updateLocal(Local_id,Local_info) { 
      try{
        let local = await Local.updateOne({_id:Local_id}, Local_info) ;
        return local 
      } catch(error) {
        throw Error(error)
      }
        
    };

  module.exports = {
    createlocal ,
    getLocals ,
    deleteLocal ,
    updateLocal
  } ; 