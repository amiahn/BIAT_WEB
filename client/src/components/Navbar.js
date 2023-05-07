import React, { useState } from "react";
import "./Button.css"

import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "../styles/Navbar.style";
//import "./navbar.css"


import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import MenuPopupState from "./materialdrop" ;
import Menuser from "./dropuser"
import { Button } from "@material-ui/core";


//supprimer le token 
function logout() {

  localStorage.removeItem('token') 
  window.location.href = ('/') 
}


const connectedUserRole = localStorage.getItem('connectedUserRole') ;

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [extendNavbar, setExtendNavbar] = useState(false);
  
  return (


    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer >
        <LeftContainer>
          <NavbarLinkContainer>
          
          
       

           
         {connectedUserRole !=="Employe"  && <Button className="btn" onClick={() => {window.location.href = ('/TabPanel') } } >Materials</Button>}
           

           {connectedUserRole =="Administrateur" && <Button className="btn" onClick={() => {window.location.href = ('/users') } } >Users</Button> } 

           

           {(connectedUserRole =="Administrateur" || connectedUserRole =="Magasinier" )&& <Button className="btn" onClick={() => {window.location.href = ('/ListeLocal') } } >locaux</Button> } 
            
           {(connectedUserRole =="Administrateur" || connectedUserRole =="Magasinier" )&& <Button className="btn" onClick={() => {window.location.href = ('/ListeEtiquettes') } } >Etiquettes</Button> } 
            
            <Button className="btn" onClick={() => {logout()} } >LOG OUT</Button>
            
            
            
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
        <Logo src={require('./biat.png')}></Logo>
       
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/Admin"> Products</NavbarLinkExtended>
          <NavbarLinkExtended to="/signin"> Contact Us</NavbarLinkExtended>

        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
