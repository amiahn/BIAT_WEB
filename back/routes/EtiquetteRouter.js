const express = require("express");
const EtiquetteService = require ("../services/EtiquetteService") ;
const EtiquetteController = require("../controllers/EtiquetteController") ;
const permissionController = require ("../permissionController") ;
const EtiquetteRouter = express.Router();

EtiquetteRouter.post("/create-Etiquette" ,permissionController.checkRole(["Administrateur","Magasinier","technicien"]),EtiquetteController.createEtiquette) ;
EtiquetteRouter.get("/listEtiquette" ,permissionController.checkRole(["Administrateur","Magasinier","technicien"]),EtiquetteController.getEtiquette) ;
EtiquetteRouter.get("/listee" ,permissionController.checkRole(["Administrateur","Magasinier","technicien"]),EtiquetteController.getEtiquetteVerif) ;  
EtiquetteRouter.get("/ea" ,permissionController.checkRole(["Administrateur","Magasinier","technicien"]),EtiquetteController.getEtiquetteandNumserie) ;
EtiquetteRouter.get("/listeDesEtiquette" ,permissionController.checkRole(["Administrateur","Magasinier","technicien"]),EtiquetteController.CompareMatEt)
//EtiquetteRouter.get("/IOT1" ,EtiquetteController.getEtiquette1);

EtiquetteRouter.delete(
    "/Etiquette/:id",
    permissionController.checkRole([
      "Administrateur",
      "Magasinier",
      "technicien",
    ]),
    EtiquetteController.deleteEtiquette 
  );

  EtiquetteRouter.put(
    "/Etiquette/:id",
    permissionController.checkRole([
      "Administrateur",
      "Magasinier",
      "technicien" ,
    ]),
    EtiquetteController.updateEtiquette
  );

  
module.exports = EtiquetteRouter ;