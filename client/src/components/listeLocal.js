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


import AjoutLocal from './ajoutLocal';
import DropTab from './dropTab';
import Navbar from './Navbar';


function ListeLocal() {
  
  const [openPop, setopenPop] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

  
 
    const [listOflocal, setListlistOflocal] = useState([]);
    const [nameLocal,setnameLocal] = useState("")
    const [type,settype] = useState("")
    const [Description,setDescription] = useState("")

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
      
async function handleDeleteLocal(id) {
    let token = localStorage.getItem("token");

    let response = await Axios.delete(
      "http://localhost:4000/Local/Local/" + id,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setListlistOflocal(response.data.Locals);
  }


const [states,setStates]=useState([])
const [filtre,setfiltre]=useState({fn : items => {return items}})
    const headcells = [
        {id:'Nom du local', label:'Nom du Local'},
        {id:'type de local', label:'type de local'},
        {id:'decription', label:'decription',disableSorting : true},
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
                            listOflocal.map((Local,index) => 
                            (<TableRow key={index}>
                            <TableCell>{Local.nameLocal}</TableCell>
                            <TableCell>{Local.type}</TableCell>
                            <TableCell>{Local.Description}</TableCell>
                           
                            <TableCell>
                            <ActionButton 
                                color='primary'
                                onClick={() => { openInPopup(Local) }}>
                                    <EditOutlinedIcon fontSize='small'/>
                                </ActionButton>
                                <ActionButton 
                                color='secondary'
                                onClick={() => {
                                    handleDeleteLocal(Local._id);
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

export default ListeLocal



