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
import "./table.css"
import ModifierEtiquette from './ModifierEtiquette'


import AjoutLocal from './ajoutLocal';
import DropTab from './dropTab';
import Navbar from './Navbar';


function ListeEtiquettes() {
  
  const [openPop, setopenPop] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [IdEtMat, setIdEtMat] = useState([]);

  
 
    const [listOfEtiquette, setListlistOfEtiquette] = useState([]);
    const [nameLocal,setnameLocal] = useState("")
    const [type,settype] = useState("")
    const [Description,setDescription] = useState("")
    const [Dispo,setDispo] = useState(true)
    useEffect(async () => {
        let token = localStorage.getItem("token");
        await Axios.get("http://localhost:4000/Etiquette/listEtiquette", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setListlistOfEtiquette(response.data);
          if (listOfEtiquette && listOfEtiquette.length > 0)
            console.log(listOfEtiquette, "///////////");
        });
        await Axios.get("http://localhost:4000/Materials/GetMaterial", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
          setIdEtMat(response.data);
          if (IdEtMat && IdEtMat.length > 0){
            IdEtMat.map((Etiquette) => {
              console.log("EtiquetteEtiquette",Etiquette)
            })
          }});
          compareId()
      }, []);
  

   
      
 async  function compareId(){
  const dataOneSession =IdEtMat.map((item,i) => item.Etiquette[i]?._id);
  const dataTwoSession = listOfEtiquette.map((item,i) => item[i]._id);
  const dataOneSessions =IdEtMat.map((item,i) => item.Etiquette);
  const dataTwoSessions = listOfEtiquette.map((item,i) => item);
  

  console.log(dataOneSessions,dataTwoSessions)
  let isAllValueMatched = true;
  
  dataOneSession.forEach((value, i) => {
    if(value !== dataTwoSession[i]) {
      isAllValueMatched = false;
    }
  });
  
  if(isAllValueMatched) {
  console.log("Already Taken");
  setDispo(true)
}else console.log(false);
setDispo(false)
   }   
async function handleDeleteEtiquette(id) {
    let token = localStorage.getItem("token");

    let response = await Axios.delete(
        "http://localhost:4000/Etiquette//Etiquette/" + id,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setListlistOfEtiquette(response.data.Etiquettes);
  }
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

const [states,setStates]=useState([])
const [filtre,setfiltre]=useState({fn : items => {return items}})
    const headcells = [
        {id:'Identifiant', label:'Identifiant'},
        {id:'Num de Serie', label:'Num de Serie'},
        {id:'Article Associé', label:'Article Associé'},
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
      <Navbar /> 
      <div className='tableocal'>
      <Button 
                    className=""
                    text='Add new'
                    variant='outlined'
                    startIcon= {<AddIcon/>}
                    onClick={() => { setopenPop(true); setRecordForEdit(null); }}
                    /> 
    
    <Tblcontainer>
                    <Tblheader/>
                    <TableBody>
                        {
                            listOfEtiquette.map((Etiquette,index) => 
                            (<TableRow key={index}>
                            <TableCell>{Etiquette.Identifiant}</TableCell>
                            <TableCell>{Etiquette.NumSerie}</TableCell>
                            <TableCell> {Etiquette._id}</TableCell>
                           
                           
                            <TableCell>
                            <ActionButton 
                                color='primary'
                                onClick={() => { openInPopup(Etiquette) }}>
                                    <EditOutlinedIcon fontSize='small'
                                        onClick={() => {
                                            handleUpdateEtiqutte(Etiquette._id);}}
                                    />
                                </ActionButton>
                                <ActionButton 
                                color='secondary'
                                onClick={() => { handleDeleteEtiquette(Etiquette._id) ;
                          }}
                                >
                                    <CloseIcon fontSize='small'/>
                                </ActionButton>
                            </TableCell>
                        </TableRow>)
                        ) } 
                    
                    </TableBody>
                </Tblcontainer>
                <TblPagination/>
                <PopUp
            title='Ajouter Un Local'
            openPop={openPop}
            setopenPop={setopenPop}
            >
               <AjoutLocal 
                recordForEdit={recordForEdit}/>
            </PopUp>
            </div>
                </>
  )
}

export default ListeEtiquettes



