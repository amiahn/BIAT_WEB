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





function Ajoutimp() {
  let navigate = useNavigate();

  const [N_Serie, setNum_Serie] = useState("");
  const [N_inventaire, setNum_inventaire]= useState("");
  const [Etiquette, setEtiquette] = useState("");
  const [localisation, setlocalisation] = useState("");
  const [Etat, setEtat] = useState("Actif");

  const createMaterial = () => {
    let token = localStorage.getItem('token')
    Axios.post("http://localhost:4000/Materials/create-Material", {
      des_article :"imprimente",  
      type:"imprimente" ,
      N_Serie,
      N_inventaire,
      Etiquette,
      localisation,
      Etat,
      
    } ,{ headers: {"Authorization" : `Bearer ${token}`} } ).then((response) => {
      
    });
  };


  return (
    <div>
   
    <div className='body'>
    <Navbar />
    <div className='container'>
      <div className='title'>
      Ajouter une imprimante : 
      </div>
      <form action={createMaterial}>
      <div className='user-datails'>
        <div className='input-box'>
          <span className='details'>
          Numéro série
          </span>
          <input type="text" placeholder='N° Serie' required 
              onChange={(event) => {
                setNum_Serie(event.target.value);
          }}
          />
        </div>
        <div className='input-box'>
          <span className='details'>
         Numéro inventaire 
          </span>
          <input type="text" placeholder='N° inventaire' required 
              onChange={(event) => {
                setNum_inventaire(event.target.value);
          }}
          />
        </div>
       
       
        <div className='input-box'>
          <span className='details'>
          étiquettes associée
          </span>
          <input type="text" placeholder='N° Etiquette' required 
              onChange={(event) => {
                setEtiquette(event.target.value);
          }}
          />
        </div>
        
        <div className='input-box'>
          <span className='details'>
          localisation
          </span>
          <input type="text" placeholder='Enter num bureau' required 
              onChange={(event) => {
                setlocalisation(event.target.value);
          }}
          />
        </div>
       
        
      </div>
      <div className='gender-details'>
      <Box sx={{ minWidth: 120 }}>
        <FormControl >
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Etat
          </InputLabel>
          <NativeSelect
           


              onChange={(event) => {
              setEtat(event.target.value);
          }}
          >
            <option value={"actif"}>actif</option>
            <option value={"En Panne"}>En Panne</option>
            
          </NativeSelect>
        </FormControl>
      </Box>
      </div>
        <div className='button'>
          <input type="submit" name="" value="Confirmer"  onClick={createMaterial}></input>
        </div>
      </form>
    </div>
    </div>
    </div>
  
  );
};




export default Ajoutimp ;