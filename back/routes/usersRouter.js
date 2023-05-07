const express = require("express");
const usersController = require("../controllers/usersController");
const permissionController = require("../permissionController");
const usersRouter = express.Router();


usersRouter.post("/create-user" , permissionController.checkRole(["Administrateur"]), usersController.createUser); 
usersRouter.get("/usersList", permissionController.checkRole(["Administrateur"]), usersController.authenticateToken, usersController.getUsers) ;
usersRouter.delete("/user/:id",permissionController.checkRole(["Administrateur"]),usersController.authenticateToken, usersController.deleteUser) ;
usersRouter.put("/user/:id",permissionController.checkRole(["Administrateur"]),usersController.authenticateToken, usersController.updateUser) ;

usersRouter.post("/login" ,usersController.loginUser) ; 



module.exports = usersRouter ;


