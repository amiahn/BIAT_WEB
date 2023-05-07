const express = require("express");
const localService = require ("../services/localService") ;
const localController = require("../controllers/localController") ;
const permissionController = require ("../permissionController") ;
const localRouter = express.Router();

localRouter.post("/create-Local" ,permissionController.checkRole(["Administrateur","Magasinier","technicien"]),localController.createlocal) ;
localRouter.get("/listLocal" ,permissionController.checkRole(["Administrateur","Magasinier","technicien"]),localController.getLocals) ;  
localRouter.delete(
    "/Local/:id",
    permissionController.checkRole([
      "Administrateur",
      "Magasinier",
      "technicien",
    ]),
    localController.deleteLocal 
  );

  localRouter.put(
    "/Local/:id",
    permissionController.checkRole([
      "Administrateur",
      "Magasinier",
      "technicien" ,
    ]),
    localController.updateLocal
  );

  
module.exports = localRouter ;