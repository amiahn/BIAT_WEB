import React from 'react';
import "./ajout.css";
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useState } from 'react';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

 function AjoutLocal() {
  let navigate = useNavigate();
  const [nameLocal, setnameLocal] = useState("");
  const [type, settype] = useState("Bureau");
  const [Description, setDiscription] = useState("" )


  const createlocal =  (event) => {
    event.preventDefault()
    let token = localStorage.getItem('token')
    
      Axios.post("http://localhost:4000/Local/create-Local", {
        nameLocal , type  , Description
      
      
    } ,{ headers: {"Authorization" : `Bearer ${token}`} } ).then((response => {
     window.location.href = '/listMateriel'
    }))
    .catch(error => { 
      alert("vérifier vos informations")
       
     });
   
  };


  return (
    <div>
   
    <div className='body'>
    
    <div className='container'>
      <div className='title'>
      Ajouter un nouveau Local  
      </div>
      <form >
      <div className='user-datails'>
        <div className='input-box'>
          <span className='details'>
          Nom du local
          </span>
          <input type="text" placeholder='Nom du Local' required 
               onChange={(event) => {
                setnameLocal(event.target.value);
              }}
          />
        </div>
        <div className='input-box'>
          <span className='details'>
          Description
          </span>
          <input type="text" placeholder='Ajouter une Discription' required 
              onChange={(event) => {
                setDiscription(event.target.value);
          }}
          />
        </div>
     
          <div className='user-datails'>
          <Box sx={{ minWidth: 120 }}>
        <FormControl >
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            type
          </InputLabel>
          <NativeSelect
           


              onChange={(event) => {
                settype(event.target.value);
          }}
          >
            <option value={"Bureau"}>Bureau</option>
            <option value={"couloire"}>couloire</option>
            
          </NativeSelect>
        </FormControl>
      </Box>
      </div> 
     
       
      </div>
        <div className='button'>
          <input type="submit" name="" value="Confirmer"  onClick={ createlocal }></input>
        </div>
      </form>
    </div>
    </div>
    </div>
  
  );
};




export default AjoutLocal ;