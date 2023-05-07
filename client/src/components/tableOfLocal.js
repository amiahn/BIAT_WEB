
import React , {useState,useEffect} from "react";
import "./table.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Axios from "axios";

import Navbar from "./Navbar";
import MenuPopupState from "./materialdrop"
import DropTab from "./dropTab";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const connectedUserRole = localStorage.getItem('connectedUserRole') ;

function tableOfLocal() {
    
    const [listOflocal, setListlistOflocal] = useState([]);
    {useEffect(async() => {
        let token = localStorage.getItem('token')
          await Axios.get("http://localhost:4000/Local/listLocal",  { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
            setListlistOflocal(response.data);
             if (listOflocal && listOflocal.length() > 0 ) 
             console.log(listOflocal ,"///////////") 
        });
      }, [])}
    
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
          
            
            <th scope="col">type du local</th>
            <th scope="col">nom de local</th>
           
            {connectedUserRole !=="Employe"  && <th scope="col">Actions</th> }
            

            
          </tr>
        </thead>
        <tbody>
          {value.length > 0 && tableFilter.length > 0 ?  tableFilter.map((Material) => {
          return ( 
          <tr>
          
            <td>{Material.des_article}</td>
            <td>{Material.type}</td>
            
            <td>
            <button className="add">update</button>
              <button className="del">Delete</button>
            </td>
         </tr>
          )
          })
          :listOflocal.map((local) => {
          return ( 
          <tr>
          <td> 
          {local.nameLocal} 
          </td>
            <td>
            {Material.type} 
            </td>
            <td> 
          
            <TextField 
              id="standard-basic" 
              defaultValue={Material.N_Serie} 
              variant="standard" 
              onChange={(e) => Material.N_Serie = e.target.value }
            />  
          
           
             <td>
              <button className="add" onClick={()=> {handleUpdateMaterial(Material)}}>update</button>
              <button className="del" onClick={()=> {handleDeleteMaterial(Material._id)}}>Delete</button>
            </td>
          </td>
         </tr>
          )})} 

        </tbody>
      </table>

    </>
  )
}

export default tableOfLocal