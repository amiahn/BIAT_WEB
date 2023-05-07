import React , {useState,useEffect} from "react";
import "./table.css";
import styled from "styled-components";
import { Link, renderMatches, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Axios from "axios";

import Navbar from "./Navbar";

const connectedUserRole = localStorage.getItem('connectedUserRole') ;

function RfidList() {

  const [listOfMaterial, setListOfMaterial] = useState([]);
  
  const [tableFilter,setTablefilter]=useState([]);

  const [value, setvalue] = useState("");
 
  const filterBureau =(e) => {
    setvalue(e.target.value);
    if (e.target.value !="") {
      const filterTable = listOfMaterial[e.target.value]
       setTablefilter([...filterTable])
    }else {
      setListOfMaterial([...listOfMaterial])
     }
   }
  
    

    useEffect(async() => {
        let token = localStorage.getItem('token')
          await Axios.get("http://localhost:4000/Materials/RFIDMaterial",  { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
            setListOfMaterial(response.data); 
            
            
        });
      }, [])


      let nbOfKeys = Object.keys(listOfMaterial).length;
      
          return (

            
     
            <>
            
          <Navbar />
          <h1 className="titretab">liste des Matériel par Local: </h1>
          <div className="rechercher">
      <TextField id="filled-basic" label="Rechercher par Num de Bureau" variant="filled" value={value}
        onChange={filterBureau}
      />
      
      </div>

          
          <table class="table table-hover table-bordered container1">
            <thead>
                <tr>
                  <th scope="col">Désignation Article</th>
                  <th scope="col">type</th>
                  <th scope="col">N° Série</th>
                  <th scope="col">N° inventaire</th>
                  <th scope="col">Etat</th>
                  <th scope="col">localisation</th>
                  <th scope="col">caractéristiques</th>
      
                  <th scope="col">Etiquettes Associée</th>
                  <th scope="col">Adresse Mac</th>
                </tr>
              </thead>  
               

            {value && tableFilter && tableFilter.length > 0 ? tableFilter.map((Material) => {
            
            return ( 
            <tr>
            
              <td>{Material.des_article}</td>
              <td>{Material.type}</td>
              <td>{Material.N_Serie}</td>
              <td>{Material.N_inventaire}</td>
              <td>{Material.Etat}</td>
              <td>{Material.localisation}</td>
              <td>{Material.caractéristique}</td>
              <td>{Material.Etiquette}</td>
              <td>{Material.adresse_Mac}</td>
              
           </tr>
            )
            })


            :
        
            nbOfKeys > 0 && Object.keys(listOfMaterial).map(key =>{
            return (


            <tbody>
            
            <tr className="nomtab" >
              bureau Numero :{key}
              </tr>
            


                  { listOfMaterial[key].map(element => {
                      return(
                        <tr>

                          <td>{element.des_article}</td>
                          <td>{element.type}</td>
                          <td>{element.N_Serie}</td>
                          <td>{element.N_inventaire}</td>
                          <td>{element.Etat}</td>
                          <td>{element.caractéristique}</td>
                          <td>{element.Etiquette}</td>
                          <td>{element.localisation}</td>
                          <td>{element.adresse_Mac}</td>

                        </tr>
                        )
                    })
                    }
                    
                    </tbody>

                  


                ) 
                    
                  })
              }
            </table>
          </>
          )}   


export default RfidList ;