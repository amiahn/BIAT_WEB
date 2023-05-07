import React, { useState, useEffect } from "react";
import "./ajout.css";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MaterielBureau() {
  const [localisation, setlocalisation] = useState("");
  const [listOflocal, setListlistOflocal] = useState([]);
  const [materials, setListMaterials] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function proData() {
      let token = localStorage.getItem("token");
      await Axios.get("http://localhost:4000/Local/listLocal", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setListlistOflocal(response.data);

        
      });
    }
    proData();

   {/*async function loadData() {
      if (result) {
        await Axios.get(
          `http://localhost:4000/Materials/GetMaterialbyLocal/${result}`
        ).then((response) => {
          
          setListMaterials(response.data);
          
          
        });
      }
    }*/}
    loadData();
  }, []);


  async function loadData(IDlocal) {
    if (IDlocal) {
      await Axios.get(
        `http://localhost:4000/Materials/GetMaterialbyLocal/${IDlocal}`
      ).then((response) => {
        
        setListMaterials(response.data);
        console.log(materials.materials)
        
        
        
      });
    }
  }
  function handleSelectChange(event) {
    setlocalisation(event.target.value);
    loadData(event.target.value);
    const selectedValue = event.target.value;

    //setResult(selectedValue);

    
  }
  return (
    <div className="materielparBureau">
      {" "}
      <h3 > selectionner le numéro de bureau à consulter : </h3>
      <NativeSelect className="selectionner" defaultValue={localisation._id} onChange={handleSelectChange}>
        {listOflocal.map((item) => {
          
          return (
            <option key={item._id} value={item._id}>
              {item.nameLocal}
            </option>
          );
        })}
      </NativeSelect>
      
      {materials.materials && materials.materials.length > 0   && 
        
        materials.materials.map((mat, i) =>{
          {console.log(mat.des_article,"mat")}
            return  <li key={i}>{mat.des_article}</li>
            
      })}
     
      
    </div>
  );
}

export default MaterielBureau;
