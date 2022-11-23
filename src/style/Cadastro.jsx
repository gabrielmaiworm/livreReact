import styled from "styled-components";
import { OutlinedInput, TextField } from "@mui/material";
import Button from "@mui/material/Button";

const InputCadastro = styled(TextField)`
  width: 450px;
  height: 50px;
  margin: 15px auto;
  border-radius: 100;
`;

const InputCadastroNum = styled(TextField)`
  width: 200px;
  height: 50px;
  margin: 15px auto;
  border-radius: 50;  
`;
const InputSenha = styled(OutlinedInput)`
  width: 450px;
  border: 3px solid;
  border-color: #062e61;  
  margin: 15px auto;
`;

const InputParceiro = styled(TextField)`
  width: 410px;
  height: 50px;
  margin: 15px auto;
  border-radius: 100;  
  align-items: "center";
`;


const InputPorcento = styled(TextField)`
  width: 70px;
  margin: 0 auto;
  border-radius: 100;
  color: #062e61;
  align-items: "rigth";
`;

const ButtonCadastro = styled(Button)`
  margin: 10px auto;
  width: 325px;
  border-radius: 100px;
  background-color: #062e61;
  color: white;
  
`;

const InputCampo = styled(TextField)`
  width: 300px;
  margin: 5px auto;
  border-radius: 100;
  align-items: "center";
`;

const ButtonSubmeter = styled(Button)`
  margin: 10px auto;
  width: 325px;
  border-radius: 100px;
  background-color: #062e61;
  color: white;
  
`;
export {
  InputCadastro,
  InputSenha,
  InputCadastroNum,
  InputParceiro,
  ButtonCadastro,
  InputCampo,
  ButtonSubmeter,
  InputPorcento,
};
