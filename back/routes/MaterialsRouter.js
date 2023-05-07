const express = require("express");
const materialsController = require("../controllers/materialsController");
const permissionController = require("../permissionController");
const materialRouter = express.Router();

materialRouter.post(
  "/create-Material",
  permissionController.checkRole([
    "Administrateur",
    "Magasinier",
    "technicien",
  ]),
  materialsController.createMaterial
);
materialRouter.get(
  "/GetMaterial",
  permissionController.checkRole([
    "Administrateur",
    "Magasinier",
    "technicien",
    "Employe",
  ]),
  materialsController.getMaterials
);
materialRouter.get(
  "/GetMaterialbyLocal/:LocId",
  materialsController.getMaterialByLocalisation
);

materialRouter.delete(
  "/Material/:id",
  permissionController.checkRole([
    "Administrateur",
    "Magasinier",
    "technicien",
  ]),
  materialsController.deleteMaterial
);
materialRouter.put(
  "/Material/:id",
  permissionController.checkRole([
    "Administrateur",
    "Magasinier",
    "technicien",
  ]),
  materialsController.updateMaterial
);

//pour l'IOT
materialRouter.get(
  "/RFIDMaterial",
  permissionController.checkRole(["Administrateur"]),
  materialsController.getByRfid
);
//Fin IOT

module.exports = materialRouter;
