const Material = require('../models/Material');
const materialsService = require('../services/MaterialsService');
const jwt = require('jsonwebtoken') ;


async function createMaterial(req, res) {
  try {
    const materialInfo = req.body;
    let result = await materialsService.createMaterial(materialInfo)
    res.send(result) ;
  } catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
}



// pour l'IOT 
async function getByRfid(req,res){
  try {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
      if (err) {
        console.log(err)
        return res.sendStatus(401);
      }
      
      let result = await materialsService.getByRfid(user)
        
      
  
      res.send(result);
  
    });

  }catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
}
//Fin IOT 


async function getMaterials(req, res) {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
      if (err) {
        console.log(err)
        return res.sendStatus(401);
      }
  
      const userRole = user.Role;
      let result = await materialsService.getMaterials(user)
      
  
      res.send(result);
  
    });
  } catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
  


};

async function deleteMaterial(req,res) {

  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
  
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
      if (err) {
        console.log(err)
        return res.sendStatus(401);
      }
  
      const userRole = user.Role;
  
  
      await materialsService.deleteMaterial(req.params.id) ;
      let newListOfMaterials = await materialsService.getMaterials(user);
      res.send({Materials: newListOfMaterials});
  
    });
  } catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
 



};


async function updateMaterial(req,res) {

  try{
    console.log(req.body)
    const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
    if (err) {
      console.log(err)
      return res.sendStatus(401);
    }

    const userRole = user.Role;
    

      let Material_id = req.params.id;
      let Material_info = {
     des_article : req.body.des_article,
     type : req.body.type,
     N_Serie : req.body.N_Serie,
     N_inventaire : req.body.N_inventaire,
     Etat : req.body.Etat,
     caractéristique: req.body.caractéristique,
     Etiquette :req.body.Etiquette,
     localisation :req.body.localisation,
     adresse_Mac:req.body.adresse_Mac
     }

      let result = await materialsService.updateMaterial(Material_id, Material_info);
      let newListOfMaterials = await materialsService.getMaterials(user);
      
      res.send({Materials: newListOfMaterials});
    });
  }catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }

  
};
async function getMaterialByLocalisation(req, res) {
  const {LocId} = req.params;
  if (!LocId) {
    return res.json({ error: "All filled must be required" });
  } else {
    try {
      let materials = await Material
        .find({ localisation: LocId }) 
      
      if (materials) {
        return res.json({  materials });
      }
    } catch (err) {
      return res.json({ error: "Search product wrong" });
    }
  }
} ; 


//async function updateMaterial(req,res) {
//let result = await materialsService.updateMaterial(req,res) 
//res.send(result);

//};

module.exports = {
    createMaterial ,
    getMaterials ,
    deleteMaterial ,
    updateMaterial ,
    getByRfid,
    getMaterialByLocalisation
};