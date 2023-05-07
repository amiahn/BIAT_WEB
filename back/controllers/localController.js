const Local = require("../models/local") ;
const jwt = require('jsonwebtoken') ;
const localService = require("../services/localService") ;


async function createlocal (req, res) {
    try {
      const localInfo = req.body;
     
      let result = await localService.createlocal(localInfo)
      res.send(result) ;
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
  }
  

  async function getLocals(req, res) {
    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
        if (err) {
          console.log(err)
          return res.sendStatus(401);
        }
    
        const userRole = user.Role;
        let result = await localService.getLocals(user)
        
    
        res.send(result);
    
      });
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
    
  
  
  };

  async function deleteLocal(req,res) {

    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
    
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) =>  {
        if (err) {
          console.log(err)
          return res.sendStatus(401);
        }
    
        const userRole = user.Role;
    
    
        await localService.deleteLocal(req.params.id) ;
        let newListOfLocals = await localService.getLocals(user);
        res.send({Locals: newListOfLocals});
    
      });
    } catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
   
  
  
  
  };


  async function updateLocal(req,res) {

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
      
  
        let Local_id = req.params.id;
        let Local_info = {
          nameLocal : req.body.nameLocal,
          type : req.body.type,
          Description : req.body.Description,
      
       }
  
        let result = await localService.updateLocal(Local_id, Local_info);
        let newListOfLocals = await localService.getLocals(user);
        
        res.send({Locals: newListOfLocals});
      });
    }catch(error) {
      console.error(error)
      res.status(500).json(error) ;
    }
  
    
  };
    

  module.exports = {
      createlocal ,
      getLocals ,
      deleteLocal ,
      updateLocal
      
  }