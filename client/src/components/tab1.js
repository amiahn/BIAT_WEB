import React , {useState,useEffect} from 'react'
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PreviewIcon from '@mui/icons-material/Preview';
import ActionButton  from './actionbutton';
import UseTable from './tableauUI';
import Axios from "axios";
import Button from './addButton';
import PopUp from './popUP';
import Ajoutord from "./Ajoutordi";

import Ajouttel from './Ajoutel';
import AjoutLocal from './ajoutLocal';
import DropTab from './dropTab';


function Tab1() {
  
  const [openPop, setopenPop] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

  
 
    const [listOfMaterial, setListOfMaterial] = useState([]);
    const [des_article, setdes_article] = useState("");
    const [type, settype] = useState("");
    const [N_Serie, setN_Serie] = useState("");
    const [N_inventaire, setN_inventaire] = useState("");
    const [Etat, setEtat] = useState("");
    const [caractéristique, setcaractéristique] = useState({
      Ram:"",
      Processeur:"",
      carte_Graphique:""
    });
    const [Etiquette,setEtiquette] = useState("")
    const [localisation,setlocalisation] = useState("")
    const [adresse_Mac,setadresse_Mac] = useState("")

    useEffect(async() => {
        let token = localStorage.getItem('token')
          await Axios.get("http://localhost:4000/Materials/GetMaterial",  { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
            setListOfMaterial(response.data);
             if (listOfMaterial && listOfMaterial.length() > 0 ) 
             console.log(listOfMaterial ,"///////////") 
            
          
        });
      }, [])
const [states,setStates]=useState([])
const [filtre,setfiltre]=useState({fn : items => {return items}})
    const headcells = [
        {id:'Désignation Article', label:'Désignation Article'},
        {id:'type', label:'type'},
        {id:'N° Série', label:'N° Série',disableSorting : true},
        {id:'N° inventaire', label:'N° inventaire',disableSorting : true},
        {id:'Etat', label:'Etat',disableSorting : true},
        {id:'localisation', label:'localisation',disableSorting : true},
        {id:'caractéristiques', label:'caractéristiques',disableSorting : true},
        {id:'Etiquettes Associée', label:'Etiquettes Associée',disableSorting : true},
        {id:'Adresse Mac', label:'Adresse Mac',disableSorting : true},
        {id:'Actions', label:'Actions',disableSorting : true} 
    ]
    
    const {
      Tblcontainer,
      Tblheader,
      TblPagination,
      PagingSorting
    } = UseTable(states, headcells, filtre) 

    const openInPopup = item => {
      setRecordForEdit(item)
      setopenPop(true)
  }
  
  
  return (
      <>
      <DropTab />
     {/* <Button 
      
                    className=""
                    text='Add new'
                    variant='outlined'
                    startIcon= {<AddIcon/>}
                    onClick={() => { setopenPop(true); setRecordForEdit(null); }}
                    /> */}
    
    <Tblcontainer>
                    <Tblheader/>
                    <TableBody>
                        {
                            listOfMaterial.map((Material,index) => 
                            (<TableRow key={index}>
                            <TableCell>{Material.des_article}</TableCell>
                            <TableCell>{Material.type}</TableCell>
                            <TableCell>{Material.N_Serie}</TableCell>
                            <TableCell>{Material.N_inventaire}</TableCell>
                            <TableCell>{Material.Etat}</TableCell>
                            <TableCell>{Material.localisation.nameLocal}</TableCell>
                            <TableCell>{"caracteristique"}</TableCell>  
                            <TableCell> {Material.Etiquette} </TableCell> 
                            <TableCell>{"aaaaaaaaaaaaaa"}</TableCell> 
                            <TableCell>
                            <ActionButton 
                                color='primary'
                                onClick={() => { openInPopup(Material) }}>
                                    <EditOutlinedIcon fontSize='small'/>
                                </ActionButton>
                                <ActionButton 
                                color='secondary'
                                >
                                    <CloseIcon fontSize='small'/>
                                </ActionButton>
                                <ActionButton 
                                color='primary'
                                >
                                    <PreviewIcon fontSize='small'/>
                                </ActionButton>
                            </TableCell>
                        </TableRow>)
                        ) } 
                    
                    </TableBody>
                </Tblcontainer>
                <TblPagination/>
                <PopUp
            title='Add Server'
            openPop={openPop}
            setopenPop={setopenPop}
            >
                <Ajoutord/>
            </PopUp>
                </>
  )
}

export default Tab1