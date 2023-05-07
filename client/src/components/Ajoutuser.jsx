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



function Ajout() {
  let navigate = useNavigate();
  const [nom, setName] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Num_Bureau, setNum_Bureau] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("Administrateur");
  const [Password, setPassword] = useState("");


 

  const createUser = () => {
    let token = localStorage.getItem('token')

     
    Axios.post("http://localhost:4000/users/create-user",  {
      nom,
      Prenom,
      Email,
      Role,
      Password,
      Num_Bureau,
    }, { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
      console.log(response)
    });
  };

  return (
    <div>
   
    <div className='body'>
    <Navbar />
    <div className='container'>
      <div className='title'>
      Ajouter utilisateur : 
      </div>
      <form action={createUser}>
      <div className='user-datails'>
        <div className='input-box'>
          <span className='details'>
          Nom 
          </span>
          <input type="text" placeholder='Enter your name' required 
              onChange={(event) => {
            setName(event.target.value);
          }}
          />
        </div>
        <div className='input-box'>
          <span className='details'>
          Prénom 
          </span>
          <input type="text" placeholder='Enter username' required 
              onChange={(event) => {
                setPrenom(event.target.value);
          }}
          />
        </div>
        <div className='input-box'>
          <span className='details'>
          email
          </span>
          <input type="email" placeholder='Enter email' required 
            onChange={(event) => {
              setEmail(event.target.value);
          }}
          />
        </div>
       
        <div className='input-box'>
          <span className='details'>
         password
          </span>
          <input type="text" placeholder='Enter password' required 
            onChange={(event) => {
              setPassword(event.target.value);
          }}
          />
        </div>
        <div className='input-box'>
          <span className='details'>
          num bureau
          </span>
          <input type="number" placeholder='Enter num bureau' required 
            onChange={(event) => {
              setNum_Bureau(event.target.value);
          }}
          />
        </div>
      </div>
      <div className='gender-details'>
      <Box sx={{ minWidth: 120 }}>
        <FormControl >
          <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
            Role
          </InputLabel>
          <NativeSelect
           
              
              defaultValue={"Administrateur"}
              onChange={(event) => {
              setRole(event.target.value);
          }}
          >
            
            <option value={"Administrateur"}>Administrateur</option>
            <option value={"Magazinier"}>Magazinier</option>
            <option value={"technicien"}>technicien</option>
            <option value={"Employé"}>Employé</option>
          </NativeSelect>
        </FormControl>
      </Box>
      </div>
        <div className='button'>
          <input type="submit" name="" value="confirmer" onClick={createUser}></input>
        </div>
      </form>
    </div>
    </div>
    </div>
  
  );
};




export default Ajout ;