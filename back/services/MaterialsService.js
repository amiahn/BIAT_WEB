const Material = require('../models/Material');
const Local = require("../models/local") 
const Etiquette = require ('../models/Etiquette')
const _ = require("lodash");



async function createMaterial(MaterialInfo) {
  try {
    const newMaterial = new Material (MaterialInfo) ; 
    await newMaterial.save() ; 
    return newMaterial
  } catch(error) {
    throw Error(error)
  }
}

// pour l'IOT 
  
  async function getByRfid(user) {
    var EtiquetteRfid =["1111" , "2222" ,"3333" ,"4444","5555","6666"]
    let foundMaterials;
    let userRole = user.Role 
    
    try{
      if (userRole == "Administrateur" || userRole== "Magasinier") {
        foundMaterials =  await Material.find({Etiquette : EtiquetteRfid}); 
        
      }
      
      var grouped = _.mapValues(_.groupBy(foundMaterials, 'localisation'),
                 clist => clist.map(foundMaterials => _.omit(foundMaterials, 'localisation')));
    
    
                 //teba3 front 
      //let numberOfIndividualArrays = Object.keys(grouped).length();
      //console.log(grouped ,"*************") ;


        ///for(let key in grouped) {
        //  console.log(grouped[key]);
      //  }

      
      return grouped 

    }catch(error){
      throw Error(error)
      }
      
  }

//Fin IOT 
async function getMaterials (user)  {

  let foundMaterials;
  let userRole = user.Role 
  try{
    if (userRole == "Administrateur" || userRole== "Magasinier") {
      foundMaterials =  await Material.find({}).populate({
        path: 'localisation',
        model: Local
      }).populate({
        path: 'Etiquette',
        model: Etiquette
      });
    } else if (userRole== "technicien") {
      foundMaterials = await  Material.find({Etat : "En Panne"}).populate({
        path: 'localisation',
        model: Local , 
        
      }).populate({
        path: 'Etiquette',
        model: Etiquette
      });
    }else if (userRole =="Employe") {
      foundMaterials = await Material.find({localisation: user.Num_Bureau}).populate({
        path: 'localisation',
        model: Local
      }).populate({
        path: 'Etiquette',
        model: Etiquette
      });
    }
    
    return foundMaterials 
    
  } catch(error){
  throw Error(error)
  }
}


  async function deleteMaterial(id)  {
    try{
      let Materials = await Material.deleteOne({_id: id});
      return Materials;
    } catch(error) {
      throw Error(error)
    }
    
    };



async function updateMaterial(Material_id,Material_info) {
  try{
    let material = await Material.updateOne({_id:Material_id}, Material_info) ;
    return material 
  } catch(error) {
    throw Error(error)
  }
    
};
   




module.exports = {
  createMaterial ,
  getMaterials ,
  deleteMaterial ,
  updateMaterial ,
  getByRfid
  
};