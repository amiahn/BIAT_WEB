import React , {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Axios from "axios";
import "./table.css";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Navbar from "./Navbar";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ActionButton  from './actionbutton';
import CloseIcon from '@mui/icons-material/Close';

function TablePaginationActions(props) {

  

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(_id,nom, Prenom, Email,Password,Num_Bureau,Role) {
  return { _id,nom, Prenom, Email,Password,Num_Bureau,Role };
}



export default function Tableau() {
  const [listOflocal, setListlistOflocal] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [nom, setName] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Num_Bureau, setNum_Bureau] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const [Password, setPassword] = useState("");
  const [badel,setBadel] = useState("")
  
  useEffect(() => {
    let token = localStorage.getItem('token')

      Axios.get("http://localhost:4000/users/usersList",  { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
      setListOfUsers(response.data);
    });
  }, [])
  


  // la liste des locaux 
  {useEffect(async () => {
    let token = localStorage.getItem("token");
    await Axios.get("http://localhost:4000/Local/listLocal", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setListlistOflocal(response.data);
      if (listOflocal && listOflocal.length > 0)
        console.log(listOflocal, "///////////");
    });
  }, []);}
  
  // Delete function 
  async function handleDeleteUser(id) {
    let token = localStorage.getItem('token')
    let response = await  Axios.delete("http://localhost:4000/users/user/"+id ,  { headers: {"Authorization" : `Bearer ${token}`} });
    setListOfUsers(response.data.users)
  }

  // Update function 
  async function handleUpdateUser(user) {
    let token = localStorage.getItem('token')
    console.log(user,"USER")
    let response = await  Axios.put("http://localhost:4000/users/user/"+ user._id ,  user, { headers: {"Authorization" : `Bearer ${token}`} });
    setListOfUsers(response.data.users)
    console.log(response.data.users,"response.data.users")
    
  }

  let rows = []

 
    
    
  listOfUsers.map( (user) => {rows.push(createData( user._id,user.nom,user.Prenom,user.Email,user.Password,user.Num_Bureau,user.Role))
     
    })


    
   

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
     <>
      <Navbar />
    
      <div className='allTables'>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
          
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Num bureau</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
           
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, i) => (
            
            <TableRow key={row._id}>
            {console.log(row,"row")}
              <TableCell component="th" scope="row">
              {row.nom}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Prenom}
              </TableCell>
              <TableCell component="th" scope="row">
              {row.Email}
              </TableCell>
              <TableCell component="th" scope="row" >
              <TextField id="standard-basic" defaultValue={"****"} variant="standard" onChange={(e) =>
              row.Password = e.target.value}
            > </TextField> 
              </TableCell>
              <TableCell component="th" scope="row">
              <Box sx={{ minWidth: 120 }}>
                      <FormControl>
                      <NativeSelect 
                      
                      defaultValue={row.Num_Bureau && row.Num_Bureau._id ? row.Num_Bureau._id : null } onChange={(e) =>
             row.Num_Bureau = e.target.value
           }>
                      {console.log( row.Num_Bureau ," row.Num_Bureau._id ")}
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
              
              </TableCell>
              <TableCell component="th" scope="row">
              <NativeSelect
              defaultValue={row.Role}
              onChange={(event) => {
                
              row.Role= event.target.value;
              
          }}
          >
            
            <option value={"Administrateur"}>Administrateur</option>
            <option value={"Magazinier"}>Magazinier</option>
            <option value={"technicien"}>technicien</option>
            <option value={"Employe"}>Employé</option>
          </NativeSelect>
              </TableCell>
              <TableCell>
              <ActionButton 
                                color='primary'
                                onClick={()=> {handleUpdateUser(row)}}>
                                    <EditOutlinedIcon fontSize='small'/>
                                </ActionButton>
               <ActionButton 
                                color='secondary'
                                onClick={() => { handleDeleteUser(row._id) ;
                          }}
                                >
                                    <CloseIcon fontSize='small'/>
                                </ActionButton>
                                </TableCell>
            </TableRow>
           
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <div className='footer'>
        <TableFooter>
          <TableRow >
            <TablePagination
            
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </div>
      </Table>
    </TableContainer>
    
    </div>
    </>
  );
}