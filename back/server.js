const express = require('express')
const app = express() 
const dotenv = require("dotenv") ;
const cors = require('cors') ;
const jwt = require('jsonwebtoken') ;

const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser') 
const Local = require("./models/local") ;
const Material = require ("./models/Material") ;
const User = require ("./models/user");
const Etiquette = require ('./models/Etiquette');

const usersRouter = require("./routes/usersRouter") ;
const materialRouter = require("./routes/MaterialsRouter") ;
const localRouter = require('./routes/LocalRouters');
const EtiquetteRouter = require("./routes/EtiquetteRouter")



dotenv.config({path:"config.env"});
const PORT = process.env.PORT || 8080 ;

process.env.ACCESS_TOKEN_SECRET; 



mongoose.connect("mongodb+srv://admin:admin@cluster0.devri.mongodb.net/BiatUser?retryWrites=true&w=majority",(err) =>{
    if(!err) console.log('db connected')
    else console.log('db error')
})


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:true}))
//app.set('view engine', 'ejs')

app.use('/users', usersRouter);
app.use('/Materials', materialRouter );
app.use("/Local",localRouter) ;
app.use("/Etiquette",EtiquetteRouter) ;



  
 
  
  function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
  }
  
app.listen('4000', () => {
    console.log(`server is running on port ${PORT}`)
})