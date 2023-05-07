import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, useNavigate,NavLink } from "react-router-dom";
import "./table.css";
export default function DropTab() {
    let navigate = useNavigate();
    return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
           Ajouter 
          </Button>
          <Menu className='menu'{...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} >  <NavLink to="/ajoutPc"> Pc</NavLink></MenuItem>
            <MenuItem onClick={popupState.close}> <Link to="/AjoutOrdi" > Ordinatuer</Link></MenuItem>
            <MenuItem onClick={popupState.close}> <Link to="/Ajoutimp" > imprimente</Link></MenuItem>
            <MenuItem onClick={popupState.close}> <Link to="/Ajoutscanner" > scanner</Link></MenuItem>
            <MenuItem onClick={popupState.close}> <Link to="/AjoutTel" > téléphone </Link></MenuItem>
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}