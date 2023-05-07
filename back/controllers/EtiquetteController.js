const Etiquette = require("../models/Etiquette") ;
const jwt = require('jsonwebtoken') ;
const EtiquetteService = require("../services/EtiquetteService") ;
const Material = require("../models/Material");
const { ObjectId } = require('mongodb');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

async function createEtiquette (req, res) {
    try {
      const EtiquetteInfo = req.body;
      let result = await EtiquetteService.createEtiquette(EtiquetteInfo)
      res.send(result) ;
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
  }

 
  

  async function getEtiquette(req, res) {
    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
        if (err) {
          console.log(err)
          return res.sendStatus(401);
        }
    
        const userRole = user.Role;
        let result = await EtiquetteService.getEtiquette(user)
        
    
        res.send(result);
    
      });
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
    
  
  
  };

  


  async function getEtiquetteVerif(req, res) {
    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
        if (err) {
          console.log(err)
          return res.sendStatus(401);
        }
    
        const userRole = user.Role;
        let result = await EtiquetteService.getEtiquetteVerif(user)
        
    
        res.send(result);
    
      });
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
  };

  async function getEtiquetteandNumserie(req, res) {
    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
        if (err) {
          console.log(err)
          return res.sendStatus(401);
        }
    
        const userRole = user.Role;
        let result = await EtiquetteService.getEtiquetteandNumserie(user)
        
    
        res.send(result);
    
      });
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
  };
      
    
  async function CompareMatEt(req,res) {  
    try{
    let table = []
    let allEtiquettes =  await Etiquette.find({}) 
    let allMaterials = await Material.find({}).populate({path :"Etiquette" , model: Etiquette })
    console.log(allMaterials,"allMaterials")
    allEtiquettes.map((item) => {
      
      
     let foundmaterialWithEtiquette =  allMaterials.find( (element ) => element.Etiquette.Identifiant == item.Identifiant )
     console.log(foundmaterialWithEtiquette,"foundmaterialWithEtiquette")
     console.log("-----")
     table.push({  etiquette : item , material: foundmaterialWithEtiquette ? foundmaterialWithEtiquette: "null"  })
     
     
    })
    console.log(table,"table")
    res.json({table})
    } catch(error){
      console.log(error)
    }
  
    
  
}


  async function deleteEtiquette(req,res) {

    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
    
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
        if (err) {
          console.log(err)
          return res.sendStatus(401);
        }
    
        const userRole = user.Role;
    
    
        await EtiquetteService.deleteEtiquette(req.params.id) ;
        let newListOfEtiquettes = await EtiquetteService.getEtiquette(user);
        res.send({Etiquettes: newListOfEtiquettes});
    
      });
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
   
  
  
  
  };


  async function updateEtiquette(req,res) {

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
      
  
        let Etiquette_id = req.params.id;
        let Etiquette_info = {
          Identifiant : req.body.Identifiant,
       }
  
        let result = await EtiquetteService.updateEtiquette(Etiquette_id, Etiquette_info);
        let newListOfEtiquettes = await EtiquetteService.getEtiquette(user);
        
        res.send({Etiquettes: newListOfEtiquettes});
      });
    }catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
  
    
  };
    

  module.exports = {
    createEtiquette ,
    getEtiquette ,
    deleteEtiquette ,
    updateEtiquette ,
    getEtiquetteVerif ,
    getEtiquetteandNumserie ,
    CompareMatEt
   
      
  }