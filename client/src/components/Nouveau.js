import React , {useState,useEffect} from 'react'
import Axios from "axios";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
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

function createData(_id, Identifiant, NumSerie) {
  return { _id,Identifiant,NumSerie};
}



export default function CustomPaginationActionsTable() {

  const [listOfEtiquette, setListlistOfEtiquette] = useState([]);

  let rows = []

  useEffect(async () => {
    let token = localStorage.getItem("token");
    await Axios.get("http://localhost:4000/Etiquette/listEtiquette", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
        setListlistOfEtiquette(response.data);
        
      if (listOfEtiquette && listOfEtiquette.length > 0)
        console.log(listOfEtiquette, "///////////");
    });}, []);
    
    
    listOfEtiquette.map( (etiquette) => {rows.push(createData( etiquette._id,etiquette.Identifiant ,etiquette.NumSerie))
      console.log(etiquette,"etiquette")
    })


    async function handleDeleteEtiquette(id) {
      let token = localStorage.getItem("token");
  
      let response = await Axios.delete(
          "http://localhost:4000/Etiquette//Etiquette/" + id,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setListlistOfEtiquette(response.data.table);
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
           
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            
            <TableRow key={row._id}>
            {console.log(row,"row")}
              <TableCell component="th" scope="row">
              {row.Identifiant}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.NumSerie}
              </TableCell>
              <TableCell>
               <ActionButton 
                                color='secondary'
                                onClick={() => { handleDeleteEtiquette(row._id) ;
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
        <TableFooter>
          <TableRow>
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
      </Table>
    </TableContainer>
  );
}