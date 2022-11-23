import styled, { css } from "styled-components";
import { Box, ButtonBase, Card, TextField, Typography } from "@mui/material";
import { Button } from "react-bootstrap";


const MenuLateral2 = styled(Card)`
  width: 6vw;
  border-radius: 100;
  align-items: "center";
  background-color: #052D6A;
  height:100vh;
  padding-top: 5vh;
  
  
`;
const MenuLateral = styled(Card)`
width: 6vw;
border-radius: 100;
align-items: "center";
background-color: #052D6A;
height:100vh;
padding-top: 5vh;

  
  
`;
export const ButtonMenu = styled(Button)`
  background-color: #052D6A ;
  width:12vw;
  text-align: center;
  color: #fff;
  padding:0.6vw;
  font-size:1 rem;
  border-radius: 5px;
  height:6vh;
  border: 0.641096px solid #052D6A;
  
 
  &:hover {
    background-color: #ffff;
    color: #052D6A;
  }
`;
export const ButtonUser = styled(Button)`
  background-color: #052D6A ;
  width:12vw;
  text-align: center;
  color: #fff;
  
  font-size:1rem;
  border-radius: 4px;
  height:5vh;
  justify-content:center;
  font-size:0.9rem;
 
  &:hover {
    background-color: #ffff;
    color: #052D6A;
  }
`;


const MenuParceiros = styled(Card)`
width: 85vw;
margin: 2px auto;
border-radius: 100;
align-items: "center";

background-color: #fff;

`;

const GestaoTarifas = styled(Card)`
  margin: 10px auto;
  width: 325px;
  border-radius: 100px;
  background-color: #052D6A;
  color: white;
  
`;
const IconCard = styled(Box)`
  color: white;
  border-radius:10px;
  background-color: #052d6a;
  padding-top:2vh;
  padding-bottom:2vh;
 
    
  
  &:hover {
    background-color: #7396ca;}
`;


const MenuParceiro = styled(Typography)`
position: absolute;
width: 338px;
height: 54px;
left: 238px;
top: 37px;

font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 36px;
line-height: 54px;
/* identical to box height */


color: #505050;
`;

const InputDevol = styled(TextField)`
  width: 420px;
  margin: 5px auto;
  border-radius: 100;
  align-items: "center";
`;


const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5"
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export { MenuLateral, MenuParceiros, GestaoTarifas, MenuParceiro,  InputDevol , MenuLateral2,IconCard};
