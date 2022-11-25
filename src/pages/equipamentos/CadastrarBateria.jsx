import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Slider,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../style/File.css";
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import api, { apiget, apipost } from "../../Services/api";

const CadastrarBateria = () => {

  const [numero_serie_bateria, setNumero_serie_bateria] = useState("");
  const [bateria_status, setBateria_status] = useState("");
  const [carga, setCarga] = useState("0");

  const navigate = useNavigate();

  const [status, setStatus] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
   const response = await apiget('/status')
      setStatus(response);
    
  };

  const handleSubmitBat = (e) => {
    e.preventDefault();
    const bateria = {
      numero_serie_bateria,
      bateria_status,
      carga
    };
    if (!bateria.numero_serie_bateria)
      alert("Erro: preencha o número de série da bateria")
    else if (!bateria.bateria_status)
      alert("Erro: preencha o stauts da bateria")
    else if (!bateria.carga)
      alert("Erro: preencha a carga da bateria")
    else {
     apipost('/bateria', bateria).then((res) => {
        alert("Bateria Cadastrada Com Sucesso!");
        window.location.reload();
      });
    }
  };

  return (
    <>
      <Box marginLeft='14%' marginTop='1%'>
        <Typography
          align='left'
          marginLeft='2%'
          component="div"
          color="#052D6A"
          fontWeight="600"
          fontSize={28}
          fontFamily='Poppins'
        > Cadastrar bateria
        </Typography>
        <Box sx={{
          border: '1px solid',
          borderRadius: '5px',
          borderColor: '#7396CA',
          marginRight: '2%',
          marginLeft: '2%',
          maxHeight: '500px',
          overflowY: "scroll",
        }}>
          <Box marginTop='2%'>
            <FormControl style={{ marginRight: '13%' }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                }}
                align='left'
                fontFamily='Poppins'
              >Nº de série da bateria
              </InputLabel>
              <Input
                placeholder="Nº de série da bateria"
                type="number"
                value={numero_serie_bateria}
                onChange={(e) => setNumero_serie_bateria(e.target.value)}
                style={{
                  color: '#9F9F9F',
                  fontSize: '18px',
                  fontWeight: '500',
                  backgroundColor: "#EBF1FB",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid",
                  borderBottomColor: "#1D4F9A",
                  borderRadius: "5px",
                  marginBottom: "5%",
                  height: "49.24px",
                  width: "459px",
                  marginLeft: "2%",
                  padding: '3px'
                }} fontFamily='Poppins' />
            </FormControl>
            <FormControl variant="standard" sx={{ marginTop: '1%' }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '2%',
                  marginTop: '-5%',
                }}
                fontFamily='Poppins'
              >Status
              </InputLabel>
              <select
                style={{
                  color: '#9F9F9F',
                  fontSize: '18px',
                  fontWeight: '500',
                  backgroundColor: "#EBF1FB",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid",
                  borderBottomColor: "#1D4F9A",
                  borderRadius: "5px",
                  marginBottom: "5%",
                  height: "49.24px",
                  width: "459px",
                  marginLeft: "2%",
                  padding: '3px',
                }} fontFamily='Poppins'
                value={bateria_status}
                onChange={(e) => setBateria_status(e.target.value)}
              >
                <option value="" disabled hidden>
                  Status
                </option>
                {status.map((option) => (
                  <option key={option.id} value={option.tipo}>
                    {option.tipo}
                  </option>
                ))}
              </select>
            </FormControl>
          </Box>

          <Box marginTop={'2%'}>
            <Typography
              sx={{
                fontSize: '19px',
                fontWeight: "bold",
                color: "#373737",
              }}
              marginRight='64vw'
              marginBottom='1vw'
              fontFamily='Poppins'>
              Carga
            </Typography>
            <div style={{
              marginRight: '44vw'
            }}>
              <Slider
                defaultValue={0}
                value={carga}
                id="carga"
                disableSwap
                onChange={(e) => setCarga(e.target.value)}
                aria-label="Default"
                valueLabelDisplay="auto"
                min={0}
                max={100}
                sx={{
                  color: '#062e61',
                  width: '280px',
                }} />

              <TextField
                style={{
                  color: '#9F9F9F',
                  fontWeight: 'bold',
                  backgroundColor: "#EBF1FB",
                  borderBottom: "1px solid",
                  borderBottomColor: "#1D4F9A",
                  borderRadius: "5px",
                  height: "40px",
                  width: "70px",
                  marginLeft: "4%",
                  marginTop:'-1%'
                }} fontFamily='Poppins'
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      %
                    </InputAdornment>
                  ),
                  sx: { fontSize: 21,  },
                }}
                
                variant='standard'
                type="number"
                value={carga}
                min="0"
                max="100"
                onChange={(e) => { if (((e.target.value) <= 100) && ((e.target.value) >= 0)) setCarga(e.target.value) }} />
            </div>
            <div style={{
              marginLeft: '42vw',
              marginTop: '-5%',
              marginBottom: '2%'
            }}>
              <Link to="/Cadastrar-bateria"
                style={{ textDecoration: "none" }}>
                <button style={{
                  borderRadius: '5px',
                  backgroundColor: '#052D6A',
                  width: '459px',
                  height: '54px',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '23px',
                  fontWeight: '600'
                }}
                  onClick={handleSubmitBat}>
                  Confirmar
                </button>
              </Link>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CadastrarBateria;