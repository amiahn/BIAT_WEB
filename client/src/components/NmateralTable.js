import React, { useState, useEffect } from "react";
import "./table.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Axios from "axios";


import MenuPopupState from "./materialdrop";
import DropTab from "./dropTab";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

import Navbar from "./Navbar"

const connectedUserRole = localStorage.getItem("connectedUserRole");

const NmaterialTable = () => {
  const [listOflocal, setListlistOflocal] = useState([]);
  const [listOfMaterial, setListOfMaterial] = useState([]);
  const [des_article, setdes_article] = useState("");
  const [type, settype] = useState("");
  const [N_Serie, setN_Serie] = useState("");
  const [N_inventaire, setN_inventaire] = useState("");
  const [Etat, setEtat] = useState("");
  const [caractéristique, setcaractéristique] = useState({
    Ram: "",
    Processeur: "",
    carte_Graphique: "",
  });
  const [Etiquette, setEtiquette] = useState("");
  const [localisation, setlocalisation] = useState([]);
  const [adresse_Mac, setadresse_Mac] = useState("");

  let navigate = useNavigate();

  useEffect(async () => {
    let token = localStorage.getItem("token");
    await Axios.get("http://localhost:4000/Materials/GetMaterial", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setListOfMaterial(response.data);
      if (listOfMaterial && listOfMaterial.length > 0)
        console.log(listOfMaterial, "///////////");
    });
  }, []);

  const [local, setLocal] = React.useState("");
  const [listOfEtiquette, setListlistOfEtiquette] = useState([]);
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
    }, [local]);
    console.log(listOflocal, "List");
  }
  useEffect(async () => {
    let token = localStorage.getItem("token");
    await Axios.get("http://localhost:4000/Etiquette/listEtiquette", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
        setListlistOfEtiquette(response.data);
      if (listOfEtiquette && listOfEtiquette.length > 0)
        console.log(listOfEtiquette, "///////////");
    });
  }, []);
  //function handleSelectChange(event) {
   // setlocalisation(event.target.value);
//}

  //Search function
  const [value, setvalue] = useState("");
  const [tableFilter, setTablefilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setvalue(e.target.value);
      const filterTable = listOfMaterial.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTablefilter([...filterTable]);
    } else {
      setvalue(e.target.value);
      listOfMaterial([...listOfMaterial]);
    }
  };

  //Delete function
  async function handleDeleteMaterial(id) {
    let token = localStorage.getItem("token");

    let response = await Axios.delete(
      "http://localhost:4000/Materials/Material/" + id,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setListOfMaterial(response.data.Materials);
  }
  //update function
  async function handleUpdateMaterial(Material) {
    console.log(Material, "----");

    let token = localStorage.getItem("token");
    let response = await Axios.put(
      "http://localhost:4000/Materials/Material/" + Material._id,
      Material,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setListOfMaterial(response.data.Materials);
    alert("materiel bien modifié");
  }

  return (
    <>
    
    
      <div className="tableContainer">
      <h1 className="titretab">Table de Matériels :</h1>

      <div className="dessustab">
        <div className="rechercher1">
          <TextField
            id="filled-basic"
            label="search"
            variant="filled"
            value={value}
            onChange={filterData}
          />
        </div>

        {connectedUserRole !== "Employe" && <DropTab />}
      </div>

      <table className="table table-hover table-bordered container1">
        <thead>
          {connectedUserRole !== "Employe" ? (
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
              <th scope="col">Actions</th>
            </tr>
          ) : (
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
          )}
        </thead>
        <tbody>
          {value.length > 0 && tableFilter.length > 0
            ? tableFilter.map((Material) => {
                return (
                  <tr key={Material._id}>
                    <td>{Material.des_article}</td>
                    <td>{Material.type}</td>
                    <td>{Material.N_Serie}</td>
                    <td>{Material.N_inventaire}</td>
                    <td>{Material.Etat}</td>
                    <td>{Material.localisation.nameLocal}</td>
                    <td>{Material.caracteristique}</td>
                    <td>{Material.Etiquette }</td>
                    
                    <td>{Material.adresse_Mac}</td>
                  </tr>
                );
              })
            : listOfMaterial.map((Material) => {
                if (
                  connectedUserRole == "Administrateur" ||
                  connectedUserRole == "Magasinier"
                ) {
                  return (
                    <tr key={Material._id}>
                      <td>{Material.des_article}</td>
                      <td>{Material.type}</td>
                      <td>
                        <TextField
                          id="standard-basic"
                          defaultValue={Material.N_Serie}
                          variant="standard"
                          onChange={(e) => (Material.N_Serie = e.target.value)}
                        />
                      </td>

                      <td>
                        <TextField
                          id="standard-basic"
                          defaultValue={Material.N_inventaire}
                          variant="standard"
                          onChange={(e) => {
                            Material.N_inventaire = e.target.value;
                          }}
                        >
                          {" "}
                        </TextField>
                      </td>

                      <td>
                        {/*  <TextField id="standard-basic" defaultValue={Material.Etat} variant="standard" onChange={(e) =>
          {
            Material.Etat = e.target.value
          }
            }> </TextField> */}
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl>
                            <NativeSelect
                              defaultValue={Material.Etat}
                              onChange={(e) => {
                                Material.Etat = e.target.value;
                              }}
                            >
                              <option value={"Actif"}>Actif</option>
                              <option value={"En Panne"}>En Panne</option>
                            </NativeSelect>
                          </FormControl>
                        </Box>
                      </td>

                      <td>
                      
                       <Box sx={{ minWidth: 120 }}>
                      <FormControl>
                    
                     <NativeSelect 
                     
                        defaultValue={Material.localisation && Material.localisation._id ? Material.localisation._id : null }
                        onChange={(e) => {
                        
                                Material.localisation = e.target.value ;
                               
                              }}>
                      
                      {listOflocal.map((item) => {
                      
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
                    </FormControl>
                    </Box>
                      </td>

                      <td>
                        {Material.des_article == "Ordinateur" ||
                        Material.des_article == "Pc" ? (
                          <div>
                            Ram:{" "}
                            <TextField
                              id="standard-basic"
                              defaultValue={
                                Material &&
                                Material.carateristque &&
                                Material.carateristque.Ram
                              }
                              variant="standard"
                              onChange={(e) =>
                                (Material.carateristque.Ram = e.target.value)
                              }
                            >
                              {" "}
                            </TextField>
                            Processeur:{" "}
                            <TextField
                              id="standard-basic"
                              defaultValue={
                                Material &&
                                Material.carateristque &&
                                Material.carateristque.Processeur
                              }
                              variant="standard"
                              onChange={(e) =>
                                (Material.carateristque.Processeur =
                                  e.target.value)
                              }
                            >
                              {" "}
                            </TextField>
                            carte_Graphique:{" "}
                            <TextField
                              id="standard-basic"
                              defaultValue={
                                Material &&
                                Material.carateristque &&
                                Material.carateristque.carte_Graphique
                              }
                              variant="standard"
                              onChange={(e) =>
                                (Material.carateristque.carte_Graphique =
                                  e.target.value)
                              }
                            >
                              {" "}
                            </TextField>
                          </div>
                        ) : (
                          "aucune"
                        )}
                      </td>

                      <td>
                      <Box sx={{ minWidth: 120 }}>
                      <FormControl>
                    
                     <NativeSelect 
                     
                        defaultValue={Material.Etiquette && Material.Etiquette._id ?Material.Etiquette._id  : null }
                        onChange={(e) => {
                        
                                Material.Etiquette = e.target.value ;
                               
                              }}>
                      
                      {listOfEtiquette.map((item) => {
                      
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
                    </FormControl>
                    </Box>
                        
                      </td>

                      <td>
                        {Material.des_article == "Telephone" ? (
                          <TextField
                            id="standard-basic"
                            defaultValue={Material.adresse_Mac}
                            variant="standard"
                            onChange={(e) =>
                              (Material.adresse_Mac = e.target.value)
                            }
                          ></TextField>
                        ) : (
                          "aucune"
                        )}
                      </td>

                      <td>
                        <button
                          className="add"
                          onClick={() => {
                            handleUpdateMaterial(Material);
                          }}
                        >
                          update
                        </button>
                        <button
                          className="del"
                          onClick={() => {
                            handleDeleteMaterial(Material._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                } else if (connectedUserRole == "Employe") {
                  return (
                    <tr>
                      <td>{Material.des_article}</td>
                      <td>{Material.type}</td>
                      <td>{Material.N_Serie}</td>
                      <td>{Material.N_inventaire}</td>
                      <td>{Material.Etat}</td>
                      <td>{Material.localisation.nameLocal}</td>
                      <td> RAM :{ Material.carateristque.carte_Graphique } <br/>
                      Processeur : {Material.carateristque.Processeur}<br/>
                        Carte graphique {Material.carateristque.Ram}
                      </td>
                      <td>{Material.Etiquette.Identifiant}</td>
                      <td>{Material.adresse_Mac}</td>
                    </tr>
                  );
                } else if (connectedUserRole == "technicien") {
                  return (
                    <tr>
                      <td>{Material.des_article}</td>
                      <td>{Material.type}</td>
                      <td>{Material.N_Serie}</td>
                      <td>{Material.N_inventaire}</td>
                      <td>
                      <Box sx={{ minWidth: 120 }}>
                          <FormControl>
                            <NativeSelect
                              defaultValue={Material.Etat}
                              onChange={(e) => {
                                Material.Etat = e.target.value;
                              }}
                            >
                              <option value={"Actif"}>Actif</option>
                              <option value={"En Panne"}>En Panne</option>
                            </NativeSelect>
                          </FormControl>
                        </Box>
                      </td>
                      <td>{Material.localisation.nameLocal}</td>
                      {/*<td>{Material.caractéristique}</td>*/}
                      <td>
                        {Material.des_article == "Ordinateur" ||
                        Material.des_article == "Pc" ? (
                          <div>
                            Ram:{" "}
                            {Material &&
                              Material.carateristque &&
                              Material.carateristque.Ram}
                            Processeur:{" "}
                            {Material &&
                              Material.carateristque &&
                              Material.carateristque.Processeur}
                            carte_Graphique:{" "}
                            {Material &&
                              Material.carateristque &&
                              Material.carateristque.carte_Graphique}
                          </div>
                        ) : (
                          "aucune"
                        )}
                      </td>
                      <td>{Material.Etiquette}</td>

                      <td>{Material.adresse_Mac}</td>
                      <td>
                        <button
                          className="add"
                          onClick={() => {
                            handleUpdateMaterial(Material);
                          }}
                        >
                          update
                        </button>
                        <button
                          className="del"
                          onClick={() => {
                            handleDeleteMaterial(Material._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default NmaterialTable;
