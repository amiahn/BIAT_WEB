import React from 'react'
import { useState } from 'react';
import Axios from "axios";

function ModifierEtiquette() {
    const [Etiquette, setListlistOfEtiquette] = useState("");
    const [Identifiant, setIdentifiant] = useState("");
  const [Numero, setNumNumero]= useState("");
  const [Matériel, setMatériel] = useState("");

  async function handleUpdateEtiqutte(Etiqutte) {
   

    let token = localStorage.getItem("token");
    let response = await Axios.put(
      "http://localhost:4000/Materials/Material/" + Etiqutte._id,
      Etiqutte,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setListlistOfEtiquette(response.data.Etiquttes);
    alert("materiel bien modifié");
  }
  return (
    <div>
   
    <div className='body'>
    
    <div className='container'>
     
      <form action={handleUpdateEtiqutte}>
      <div className='user-datails'>
        <div className='input-box'>
          <span className='details'>
          Identifiant
          </span>
          <input type="text" placeholder='Identifiant' required 
              onChange={(event) => {
                setIdentifiant(event.target.value);
          }}
          />
        </div>
        <div className='input-box'>
          <span className='details'>
         Numero serie
          </span>
          <input type="text" placeholder='N° inventaire' required 
              onChange={(event) => {
                setNumNumero(event.target.value);
          }}
          />
        </div>
       
       
        <div className='input-box'>
          <span className='details'>
          Matériel associée
          </span>
          <input type="text" placeholder='N° Etiquette' required 
              onChange={(event) => {
                setMatériel(event.target.value);
          }}
          />
        </div>
        
       
       
        
      
      </div>
        <div className='button'>
          <input type="submit" name="" value="Confirmer"  onClick={handleUpdateEtiqutte}></input>
        </div>
      </form>
    </div>
    </div>
    </div>
        
  )
}

export default ModifierEtiquette