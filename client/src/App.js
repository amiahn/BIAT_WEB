import React from "react";


import { useStyles } from "./styles/styles";

import Login from "./components/login"

import Tableau from "./components/table";
import Ajout from "./components/Ajoutuser";
import MenuPopupState from "./components/materialdrop"


import {
 BrowserRouter,
 Routes,
 Route,
 Router,
 
} from "react-router-dom";
import AjoutPc from "./components/ajoutPc";
import Ajoutimp from "./components/Ajoutimp";
import Ajoutscanner from "./components/Ajoutscanner";
import Ajouttel from "./components/Ajoutel";
import Ajoutordi from "./components/Ajoutordi";
import Tablemateriel from "./components/TableMateriel";
import NativeSelectDemo from "./components/jareb";
import Search from "./components/search";
import NmaterialTable from "./components/NmateralTable";
import RfidList from "./components/RfidList";
import AjoutLocal from "./components/ajoutLocal";
import Tabs from "./components/Tabs";
import MaterielBureau from "./components/materielBureau";
import ListeLocal from "./components/listeLocal"
import ListeEtiquettes from "./components/ListeEtiquettes"
import NEWLogin from "./components/Newlogin"
//import Layout from "./components/Layout"
import TabPanel from "./components/NTabs"
import TablePaginationActions from "./components/Nouveau"
import Inventaire from "./components/inventaire"
import TableData from "./components/TableData"
function App() {
  return (
    <BrowserRouter>
  
    <Routes >
    
    <Route path="/Inventaire" element={<Inventaire/>} />
    <Route path="/TabPanel" element={<TabPanel/>} />
    <Route path="/TablePaginationActions" element={<TablePaginationActions/>} />
    <Route path="/" element={<NEWLogin/>} />
    <Route path="/ListeEtiquettes" element={<ListeEtiquettes/>} />
    <Route path="/ListeLocal" element={<ListeLocal/>} />
    <Route path="/MaterielBureau" element={<MaterielBureau/>} />
    <Route path="/Tabs" element={<Tabs/>} />
    <Route path="/locals" element={<AjoutLocal />} />
    <Route path="/search" element={<Search />} />
    <Route path="/jareb" element={<NativeSelectDemo />} />
    <Route path="/RfidList" element={<RfidList />} />
    {/*<Route path="/" element={<Login />} />*/}
    <Route path="/listMateriel" element={<NmaterialTable/>} />
    <Route path="/AjoutTel" element={<Ajouttel/>} />
    <Route path="/Ajoutscanner" element={<Ajoutscanner/>} />
    <Route path="/Ajoutscanner" element={<Ajoutscanner/>} />
    <Route path="/ajoutordi" element={<Ajoutordi/>} />
    <Route path="/ajoutPc" element={<AjoutPc />} />
    <Route path="/ajoutimp" element={<Ajoutimp />} />
    <Route path="/createUser" element={<Ajout />} />
    {/*<Route path="/Layout" element={<Layout />} />*/}
    <Route path="/users" element = {<Tableau />} />
    

    </Routes>

  </BrowserRouter>
  );
};

export default App;
