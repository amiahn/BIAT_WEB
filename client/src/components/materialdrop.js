import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, useNavigate,NavLink } from "react-router-dom";
export default function MenuPopupState() {
    let navigate = useNavigate();
    return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Matériels
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} > <NavLink to="/"> ajouter </NavLink>
            
            </MenuItem>
            <MenuItem onClick={popupState.close}> <Link to="/listMateriel" >  liste </Link></MenuItem>
            
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}