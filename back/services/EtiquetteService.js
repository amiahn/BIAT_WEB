const Etiquette = require("../models/Etiquette") ;
const Material = require('../models/Material');
const jwt = require('jsonwebtoken') ;



async function createEtiquette (EtiquetteInfo) {
    try {
      const newEtiquette = new Etiquette (EtiquetteInfo) ; 
      await newEtiquette.save(); 
      return newEtiquette 
    } catch(error) {
      throw Error(error)
    }
  }


  async function getEtiquette (user)  {

    let foundEtiquettes;
    let userRole = user.Role 
    try{
      if (userRole == "Administrateur" || userRole== "Magasinier" ||userRole== "technicien") {
        foundEtiquettes =  await Etiquette.find({})
      } 
      
      return foundEtiquettes 
      
    } catch(error){
    throw Error(error)
    }
  }

  async function getEtiquetteandNumserie (user)  {
    let allEtiquettes;
    let allMaterials ; 
    let etiquettewithNumserie = [] 
    let userRole = user.Role
    let all = [] 

    try{
  
      if (userRole == "Administrateur" || userRole== "Magasinier" ||userRole== "technicien") {
        
     
    
       //allEtiquettes = await Etiquette.find({})
       allMaterials = await Material.find({}).populate({path :"Etiquette" , model: Etiquette })
       console.log(allMaterials,"allMaterials")
       all = getEtiquetteVerif (user) 
       all.map() 
        
       //allEtiquettes.map((item) => {
         
         
       
        //let foundEtiquetteInMaterials = allMaterials.find(material => { console.log(material.Etiquette._id.toString(),"////////"); material.Etiquette._id.toString() == item._id.toString()})
         // let found = false ;
         
          
       // for(let i=0 ;i< allMaterials.length; i++) {
         // console.log(allMaterials[i].Etiquette.Identifiant,"++++")
         
//if  (allMaterials[i].Etiquette.Identifiant.toString() == item.Identifiant.toString()) {
 
 //found = true ; 
 //break ;
//}
}
        //console.log(found,"found")
         //if (!found) { 
          //diffEtiquette.push(item)

        // }
      //   
      // }
      // )
       
    //console.log(diffEtiquette,"diffEtiquette")
  //} 
    return all 
 
  } catch(error){
  throw Error(error)
  }
  }

  async function EtiquetteList(){
    try {
     const response = await Etiquette.find({})
     console.log(response) 
  } catch(error) {
    console.log(error)
  }}









  async function getEtiquetteVerif (user)  {
    let allEtiquettes;
    let allMaterials ;
    let diffEtiquette = []
    let userRole = user.Role
    
    try{
  
        if (userRole == "Administrateur" || userRole== "Magasinier" ||userRole== "technicien") {
          
       
      
         allEtiquettes = await Etiquette.find({})
         allMaterials = await Material.find({},"Etiquette").populate({path :"Etiquette" , model: Etiquette })
         
         allEtiquettes.map((item) => {
           
           
         
          //let foundEtiquetteInMaterials = allMaterials.find(material => { console.log(material.Etiquette._id.toString(),"////////"); material.Etiquette._id.toString() == item._id.toString()})
            let found = false ;
           
            
          for(let i=0 ;i< allMaterials.length; i++) {
            //console.log(allMaterials[i].Etiquette.Identifiant,"++++")
           
 if  (allMaterials[i].Etiquette.Identifiant.toString() == item.Identifiant.toString()) {
   
   found = true ; 
   break ;
 }
}
         // console.log(found,"found")
           if (!found) { 
            diffEtiquette.push(item)

           }
           
         }
         )
         
     // console.log(diffEtiquette,"diffEtiquette")
    } 
      return diffEtiquette 
   
    } catch(error){
    throw Error(error)
    }
  }
  

  
  async function deleteEtiquette(id)  {
    try{
      let Etiquettes = await Etiquette.deleteOne({_id: id});
      return Etiquettes;
    } catch(error) {
      throw Error(error)
    }
    
    };

    async function updateEtiquette(Etiquette_id,Etiquette_info) { 
      try{
        let etiquette = await Etiquette.updateOne({_id:Etiquette_id}, Etiquette_info) ;
        return etiquette 
      } catch(error) {
        throw Error(error)
      }
        
    };

    module.exports = {
        createEtiquette ,
        getEtiquette ,
        deleteEtiquette ,
        updateEtiquette ,
        getEtiquetteVerif ,
        getEtiquetteandNumserie ,
        EtiquetteList
        
          
      } 