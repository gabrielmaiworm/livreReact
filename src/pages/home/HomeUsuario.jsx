import { Box } from "@mui/material";
import React, { useState }  from "react";
import { Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoginMaster from "../login/LoginMaster";


import { MenuLivre } from "./components/Menu-lateral";
import { MenuSuperior } from "./components/Menu-superior";



function HomeUsuario() {
 
  const location = useLocation();
  
  const { pathname } = location;
 return(
    <Row style={{display:'flex',width:'100%'}}> 
{pathname != '/' ? (
  <>
  <MenuLivre/>
  <MenuSuperior/> 
  </>
)
    :<LoginMaster/>}
    </Row>
  );
  
  
  }
export default HomeUsuario;
