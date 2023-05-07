
import React , {useState,useEffect} from "react";
import "./table.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Axios from "axios";

import Navbar from "./Navbar";
import MenuPopupState from "./materialdrop"
import DropTab from "./dropTab";
import Search from "./search";

const connectedUserRole = localStorage.getItem('connectedUserRole') ;

const NmaterialTable = () => {


  const [listOfMaterial, setListOfMaterial] = useState([]);
  const [des_article, setdes_article] = useState("");
  const [type, settype] = useState("");
  const [N_Serie, setN_Serie] = useState("");
  const [N_inventaire, setN_inventaire] = useState("");
  const [Etat, setEtat] = useState("");
  const [caractéristique, setcaractéristique] = useState("");
  const [Etiquette,setEtiquette] = useState("")
  const [localisation,setlocalisation] = useState("")
  const [adresse_Mac,setadresse_Mac] = useState("")
  
 
  let navigate = useNavigate();

  
  useEffect(async() => {
    let token = localStorage.getItem('token')
      await Axios.get("http://localhost:4000/Materials/GetMaterial",  { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
        setListOfMaterial(response.data); 
    });
  }, [])
//Search function
  const [value,setvalue]=useState("");
 const [tableFilter,setTablefilter]=useState([]);


  const filterData =(e) => {
   if (e.target.value !="") {
    setvalue(e.target.value);
      const filterTable = listOfMaterial.filter(o=> Object.keys(o).some(k=> String(o[k]).toLowerCase().includes(e.target.value.toLowerCase() )

     ));
      setTablefilter([...filterTable])
   }else {
     setvalue(e.target.value);
      listOfMaterial([...listOfMaterial])
    }
  }

//Delete function
 async function handleDeleteMaterial(id) {
    let token = localStorage.getItem('token')
    console.log(token,"********")
    let response = await  Axios.delete("http://localhost:4000/Materials/Material/"+id ,  { headers: {"Authorization" : `Bearer ${token}`} });
    setListOfMaterial(response.data.Materials)
  }
 //update function 
  async function handleUpdateMaterial(Material) {
    console.log(Material)
    let token = localStorage.getItem('token')
    let response = await  Axios.put("http://localhost:4000/Materials/Material/"+Material._id ,  Material , { headers: {"Authorization" : `Bearer ${token}`} });
   
    setListOfMaterial(response.data.Materials)

  }

  
  
 


  
  return (
    <>
      
      <Navbar />
       <h1 className="titretab">Table de Matériels :</h1>
    
      <div className="dessustab">
     
      <div className="rechercher">
      <TextField id="filled-basic" label="search" variant="filled" value={value}
        onChange={filterData}
      />

      </div>
      
      
      <DropTab />
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
            {connectedUserRole !=="Employe"  && <th scope="col">Actions</th> }
            

            
          </tr>
        </thead>
        <tbody>
          {value.length > 0 && tableFilter.length > 0 ?  tableFilter.map((Material) => {
          return ( 
          <tr>
          
            <td>{Material.des_article}</td>
            <td>{Material.type}</td>
            <td>{Material.N_Serie}</td>
            <td>{Material.N_inventaire}</td>
            <td>{Material.Etat}</td>
            <td>{Material.caractéristique}</td>
            <td>{Material.Etiquette}</td>
            <td>{Material.localisation}</td>
            <td>{Material.adresse_Mac}</td>
            <td>
            <button className="add">update</button>
              <button className="del">Delete</button>
            </td>
         </tr>
          )
          })
          :listOfMaterial.map((Material) => {
          return ( 
          <tr>
          <td> 
          {Material.des_article} 
          </td>
            <td>
            {Material.type} 
            </td>
            <td> 
          {connectedUserRole !=="Employe" ?
            <TextField 
              id="standard-basic" 
              defaultValue={Material.N_Serie} 
              variant="standard" 
              onChange={(e) => Material.N_Serie = e.target.value }
            />  :
              Material.N_Serie
          }
            </td>
            
            <td> 
          <TextField id="standard-basic" defaultValue={Material.N_inventaire} variant="standard" onChange={(e) =>
          {
            Material.N_inventaire = e.target.value
          }
            }> </TextField> 
            </td>
          
            <td> 
          <TextField id="standard-basic" defaultValue={Material.Etat} variant="standard" onChange={(e) =>
          {
            Material.Etat = e.target.value
          }
            }> </TextField> 
            </td>
            
            <td> 
          <TextField id="standard-basic" defaultValue={Material.caractéristique} variant="standard" onChange={(e) =>
          {
            Material.caractéristique = e.target.value
          }
            }> </TextField> 
            </td>
            
            <td> 
          <TextField id="standard-basic" defaultValue={Material.Etiquette} variant="standard" onChange={(e) =>
          {
            Material.Etiquette = e.target.value
          }
            }> </TextField> 
            </td>
           
            <td> 
          <TextField id="standard-basic" defaultValue={Material.localisation} variant="standard" onChange={(e) =>
          {
            Material.localisation = e.target.value
          }
            }> </TextField> 
            </td>
            
            <td> 
          <TextField id="standard-basic" defaultValue={Material.adresse_Mac} variant="standard" onChange={(e) =>
          {
            Material.adresse_Mac = e.target.value
          }
            }> </TextField> 
             </td> 
             {connectedUserRole !=="Employe"  &&  
             <td>
              <button className="add" onClick={()=> {handleUpdateMaterial(Material)}}>update</button>
              <button className="del" onClick={()=> {handleDeleteMaterial(Material._id)}}>Delete</button>
            </td>
          }
         </tr>
          )})} 

        </tbody>
      </table>

    </>
  );
};

export default NmaterialTable;


