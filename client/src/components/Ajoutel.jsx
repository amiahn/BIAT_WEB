import React, { useState, useEffect } from "react";
import "./ajout.css";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Ajouttel() {
  let navigate = useNavigate();
  const [listOfEtiquette, setListlistOfEtiquette] = useState([]);
  const [N_Serie, setNum_Serie] = useState("");
  const [N_inventaire, setNum_inventaire] = useState("");
  const [adresse_Mac, set_AdresseMac] = useState("");
  const [Identifiant, setIdentifiant] = useState(""); 
  
  const [localisation, setlocalisation] = useState("");
  const [Etiquette, setEtiquette] = useState([]);
  const [Etat, setEtat] = useState("Actif");

  //pour la liste déroulante des locaux
  const [listOflocal, setListlistOflocal] = useState([]);

  const createMaterial = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    Axios.post(
      "http://localhost:4000/Materials/create-Material",
      {
        des_article: "Telephone",
        type: "Telephone",
        N_Serie :N_Serie ,
        N_inventaire : N_inventaire,
        adresse_Mac : adresse_Mac,
        Etiquette : Etiquette,
        localisation : localisation,
        Etat : Etat ,
      },
      
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        window.location.href = "/listMateriel";
        
      })
      .catch((error) => {
        alert("vérifier vos informations");
      });
  };
  

 {/* async function UpdateEtiquette  (Etiquette)  {
    let token = localStorage.getItem("token");
    let response = await Axios.put(
      "http://localhost:4000/Etiquette//Etiquette/" + Etiquette._id,
      Etiquette,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setListlistOfEtiquette(response.data.Etiquettes);
    alert("materiel bien modifié");
  }
*/}


//pour la liste deroulante des etiquette non utilsé 
  useEffect(async () => {
    let token = localStorage.getItem("token");
    await Axios.get("http://localhost:4000/Etiquette/listee", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
        setListlistOfEtiquette(response.data);
      if (listOfEtiquette && listOfEtiquette.length > 0)
        console.log(listOfEtiquette, "///////////");
    });
  }, []);
 
  const [local, setLocal] = React.useState("");
  const handleChange = (e) => setLocal(e.target.value);

  //pour la liste déroulante des locaux
  {
    useEffect(async () => {
      let token = localStorage.getItem("token");
      await Axios.get("http://localhost:4000/Local/listLocal", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setListlistOflocal(response.data);
        if (listOflocal && listOflocal.length > 0)
          console.log(listOflocal, "///////////");
      });
    }, []);
    console.log(listOflocal, "List");
  }
  function handleSelectChange(event) {
    setlocalisation(event.target.value);
}
function handleSelectEtiquette(event) {
  setEtiquette(event.target.value);
}
  return (
    <div>
      <div className="body">
        <div className="container">
          <div className="title">Ajouter un téléphone</div>
          <form>
            <div className="user-datails">
              <div className="input-box">
                <span className="details">Numéro série</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(event) => {
                    setNum_Serie(event.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details">Numéro inventaire</span>
                <input
                  type="text"
                  placeholder="Enter username"
                  required
                  onChange={(event) => {
                    setNum_inventaire(event.target.value);
                  }}
                />
              </div>

              <div className="input-box">
                <span className="details">adresse MAC</span>
                <input
                  type="text"
                  placeholder="Enter email"
                  required
                  onChange={(event) => {
                    set_AdresseMac(event.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details">étiquettes associée</span>
                <NativeSelect 
                     
                     defaultValue={Etiquette._id}
                     onChange={handleSelectEtiquette}>
                   
                   {listOfEtiquette && listOfEtiquette.length > 0 && listOfEtiquette.map((item) => {
                   
                     return (
                       <option
                         key={item._id}
                         value={item._id}
                       >
                         {item.Identifiant}
                       </option>
                     );
                   })}
                 </NativeSelect> 
              </div>
              <div className="input-box">
              <span className="details">Localisation</span>
                
                  
                   
                    <NativeSelect value={localisation} onChange={handleSelectChange}>
                      {listOflocal && listOflocal.length > 0 && listOflocal.map((item) => {
                        {
                          console.log(item._id,"itemID");
                        }
                        return (
                          <option
                            key={item._id}
                            value={item._id}
                           
                          >
                            {item.nameLocal}
                          </option>
                        );
                      })}
                    </NativeSelect>
                  
                
              </div>
            </div>

            <div className="gender-details">
              <Box sx={{ minWidth: 120 }}>
                <FormControl>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Etat
                  </InputLabel>
                  <NativeSelect
                    defaultValue={"Actif"}
                    onChange={(event) => {
                      setEtat(event.target.value);
                    }}
                  >
                    <option value={"Actif"}>Actif</option>
                    <option value={"En Panne"}>En Panne</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </div>
            <div className="button">
              <input
                type="submit"
                name=""
                value="Confirmer"
                onClick={createMaterial}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ajouttel;
