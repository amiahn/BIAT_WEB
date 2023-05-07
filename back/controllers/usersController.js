const User = require('../models/user');
const usersService = require('../services/usersService');
const bcrypt = require("bcrypt") ;
const jwt = require('jsonwebtoken') ;

async function createUser(req, res) {
  try {
		const newPassword = await bcrypt.hash(req.body.Password, 10)
		const userInfo = {
			nom: req.body.nom,
      Prenom:req.body.Prenom,
			Email: req.body.Email,
      Num_Bureau:req.body.Num_Bureau,
      Role:req.body.Role,
			Password: newPassword,
		} ;
    let result = await usersService.createUser(userInfo)
    res.send(result) ;
	 //	res.json({ status: 'ok' })
	} catch (err) {
    console.log(err)
		res.json({ status: 'error', error: err})
	}
 
}

// auth users // 


async function  generateAccessToken(user) {
  return await jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET);
}
//,{expiresIn: '1800s'}

async function loginUser (req, res) {
  
  try{
    const user = await User.findOne({
      Email: req.body.Email,
    })
   
    if (!user) {
     res.json({ status: 'error', error: 'Invalid login' })
     
    }
     
    
    const isPasswordValid = await bcrypt.compare(
      
      req.body.Password,
      user.Password 
      
    )
    
  
    if (isPasswordValid) {
      
      const token = await generateAccessToken(user)
      res.json({ status: 'ok', token: token, connectedUser: user });
      
    }//else {
     // res.json({ status: 'error', error: "invalid credentials"})
    //}
  }catch(error) {
   console.error(error);
    res.status(500).json(error) 
  };
 
	
	} 
    
  async function authenticateToken(req, res, next) {
    try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // car la valeur passer est bearer token

    if (!token) {
      return res.sendStatus(401);
    }
  
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }
      req.user = user;
      next();
    });
  } catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
  }



async function getUsers(req, res) { 
  try{
    let result = await usersService.getUsers(req,res)
  res.send(result) ;
  }catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
  
};

async function deleteUser(req,res) {
  try{
    await usersService.deleteUser(req,res) 
    let newListOfUsers = await usersService.getUsers();
   res.send({users: newListOfUsers});
  }catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
};
async function updateUser(req,res) {

  try{
    console.log(req.body, "body")
    const newPassword = await bcrypt.hash(req.body.Password, 10)
    let user_id = req.params.id;
    let user_info = {
    nom:req.body.nom ,
    Prenom:req.body.Prenom,
    Email:req.body.Email,
    Num_Bureau:req.body.Num_Bureau,
    Role:req.body.Role,
    Password:newPassword
  }
  let result = await usersService.updateUser(user_id, user_info);
  console.log (result,"result")
  let newListOfUsers = await usersService.getUsers();
console.log(newListOfUsers[1],"newList")
 res.send({users: newListOfUsers});
  }catch(error) {
    console.error(error)
    res.status(500).json(error) ;
  }
};
  


module.exports = {
  createUser ,
  getUsers ,
  deleteUser,
  updateUser ,
  loginUser ,
  authenticateToken
};