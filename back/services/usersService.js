const User = require('../models/user');
const Local = require("../models/local")

async function createUser(userInfo) {
  try{
    const newUser = new User(userInfo) ; 
    await newUser.save(); 
    return newUser
  }catch(error) {
    throw Error (error)
  }
  
}

async function getUsers (req, res)  {
  try{
    let users = await User.find({}).populate({
      path: 'Num_Bureau',
      model: Local
    });
    return users;
  }catch(error) {
    throw Error (error)
  }
    
    };

async function deleteUser(req, res)  {
  try{
    let users = await User.deleteOne({_id:req.params.id});
  return users ;
  } catch(error) {
    throw Error (error)
  }
  };

async function updateUser(user_id,user_info) {
  try{
    let user = await User.updateOne({_id:user_id}, user_info) ;
    return user 
  }catch(error) {
    throw Error (error)
  }
  
};
    
  
  

module.exports = {
  createUser ,
  getUsers ,
  deleteUser ,
  updateUser
  
};