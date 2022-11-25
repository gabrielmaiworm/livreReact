import { Box, Input, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoMdReturnRight } from "react-icons/io";
import logo from "../../../images/Logo.png";
import { ButtonMenu, ButtonUser } from "../HomeUsuario.style";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Routes, Routeslogin } from "../../../App";

export const MenuSuperior = () => {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/")
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = JSON.parse(localStorage.getItem("funcionario_info"));
  console.log(user?.funcionario_nome);
  return (
    <Col style={{ width: "80%", height: "80%" }}>
      <Row
        style={{
          backgroundColor: "#f1f1f1",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "15vh",
          alignItems: "center",
          paddingRight: "10vw",
          paddingLeft: '5vw'
        }}
      >

        <img
          src={logo}
          style={{}}
          align="center"
          width='50vh'
          height='50vh'
          alt="Logo livre"
        />
          <h2 style={{ color: '#052D6A', fontFamily: 'Poppins' }}>
          Movimente a liberdade com seu KIT LIVRE®</h2>


        <ButtonUser onClick={handleClick}> Olá, {user?.funcionario_nome}
          <IoPersonCircleOutline style={{ width: "50px", heigth: "50px" }} />
        </ButtonUser>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem sx={{
            width:'12vw',
            textAlign:'center'
          }}
        
          >
            Editar perfil</MenuItem>
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </Row>
      <Container fluid style={{ width: "94vw", height: "90vh" }}>
        {/*  colocar aqui rotas */}
        {/* <Geolocalizacao/> */}
        <Routes />
      </Container>
    </Col >
  );
};
