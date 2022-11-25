import {
  Box, Table,
  TableContainer,
  TableRow, Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { FaFileSignature } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../../App.css";
import api, { apidelete, apiget, apipost, apiput } from "../../Services/api";
import { TbTrashX } from 'react-icons/tb';
import ReactTooltip from "react-tooltip";

import "../../style/File.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#373737",
    fontWeight: "bold",
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const ListaEspera = () => {

  const [usuarioLista, setUsuarioLista] = useState([]);

  useEffect(() => {
    getUsuarioLista();
    getUsuario();
  }, []);

  const getUsuarioLista = async () => {
   const response = await apiget('/lista-espera')
      setUsuarioLista(response);
    
  };

  const cadastrar = (e) => {
    e.preventDefault();
    const espera = {
      nome,
      documento
    };
    if (!espera.nome)
      alert("Erro: preencha o nome ")
  
    else if (!espera.documento)
      alert("Erro: preencha o número do documento")

    else {
      apipost('/lista-espera', espera).then((res) => {
        alert("Adicionado a lista com Sucesso!");
        window.location.reload();
      });
    }
  };
  const navigate = useNavigate();

  const solicitar = (usuarioLista) => {
    navigate(`/solicitar-equipamento/${usuarioLista.documento}`)
  };

  const remover = async (usuarioLista) => {
    const documento =  usuarioLista.documento;
    try {
      console.log('remover', documento)
      const resp = await apiput("/lista-espera",{documento: documento}  )
      alert("Removido da lista com sucesso!!");
      window.location.reload();
    } catch (error) {
      alert("Ops, algo errado aconteceu!");
    }
   
  };

  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [documento, setDocumento] = useState("");

  const getUsuario = async () => {
   const response = await apiget('/usuario')
      setUsuarios(response);
    
  };

  const handleOnHover = (result) => {
  };

  const handleOnFocus = () => {
  };

  const handleOnSearchUsuario = (string, results) => {
    setUsuario(string);
  };

  const handleOnSelectUsuario = (item) => {
    setNome(item.nome);
    setUsuario(item.documento);
    setDocumento(item.documento);

  };

  const handleOnClearUsuario = () => {
    setDocumento('');
  };
  const { register, handleSubmit, setValue } = useForm();
  const checkCPF = async (e) => {
    const cpf = e.target.value;
    try {
      const res = await apiget(`/usuario?documento=${cpf}`)
        if (res.data.length !== 0)
          setValue("nome", res.data[0].nome);
        else
          alert("Erro: cadastro não localizado");
      
    } catch (erro) {
      alert("Erro ao localizar o cadastro");
    }
  }

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
        > Lista de espera
        </Typography>
        <Box sx={{
          border: '1px solid',
          borderRadius: '5px',
          borderColor: '#7396CA',
          marginRight: '2%',
          marginLeft: '2%',
          minHeight: '70vh',
          maxHeight: '70vh',
          overflowY: "scroll",
        }}>
          <Box marginTop='2%'>
            <Typography sx={{
              width: '15vw',
              fontSize: '15px',
              fontWeight: "bold",
              color: "#373737",
              marginLeft: "20%",
              marginBottom: "2%",
            }} align='left'>  CPF
              <ReactSearchAutocomplete
                items={usuarios}
                fuseOptions={{ keys: ["documento"] }} // Search on both fields
                resultStringKeyName="documento" // String to display in the results
                onSearch={handleOnSearchUsuario}
                onHover={handleOnHover}
                onSelect={handleOnSelectUsuario}
                onFocus={handleOnFocus}
                onClear={handleOnClearUsuario}
                onBlur={checkCPF}
                placeholder="CPF"
                styling={{
                  color: '#9F9F9F',
                  fontSize: '15px',
                  fontWeight: '500',
                  backgroundColor: "#EBF1FB",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid",
                  borderBottomColor: "#1D4F9A",
                  borderRadius: "5px",
                  padding: '3px',
                  zIndex: 3,
                }} fontFamily='Poppins' />
            </Typography>

            <Typography style={{
              marginTop: '-12.5vh',
              marginLeft: '10vw'
            }}>
              <Typography style={{
                fontSize: '15px',
                fontWeight: "bold",
                color: "#373737",
                marginRight: '15.2vw'
              }}> Nome
              </Typography>
              <input
                placeholder="Nome"
                disabled
                {...register("nome")}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{
                  width: "18vw",
                  height: '5.5vh',
                  color: '#9F9F9F',
                  fontSize: '15px',
                  fontWeight: '500',
                  backgroundColor: "#EBF1FB",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid",
                  borderBottomColor: "#1D4F9A",
                  borderRadius: "5px",
                }} />
            </Typography>

            <Typography sx={{
              marginLeft: '45vw',
              marginTop: '-5vh',
              marginBottom: '3%',
            }}>
              <button
              onClick={cadastrar}
                style={{
                  backgroundColor: "#052D6A",
                  color: 'white',
                  width: '10vw',
                  height: '2vw',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}> <BsFillPersonPlusFill /> Adicionar a lista</button>
            </Typography>

            <Paper sx={{
              width: '99%',
              marginLeft: '1%',
            }}>
              <TableContainer
                component={Grid}
                sx={{
                  marginBottom: "1%",
                  border: "1px solid",
                  borderRadius: "5px",
                  maxHeight: 350,
                }} >
                <Table stickyHeader aria-label="sticky table"
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                >
                  <TableHead borderBottom='1px solid'>
                    <TableRow>
                      <StyledTableCell style={{ borderBottom: '1px solid' }}>
                      </StyledTableCell>
                      <StyledTableCell style={{
                        borderBottom: '1px solid'
                      }} align='center'>
                        Nome
                      </StyledTableCell>
                      <StyledTableCell style={{
                        borderBottom: '1px solid'
                      }} align='center' >
                        CPF
                      </StyledTableCell>
                      <StyledTableCell style={{
                        borderBottom: '1px solid'
                      }} align='center' >
                        Ações
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usuarioLista.map((usuarioLista) => (
                      <StyledTableRow>
                        <StyledTableCell>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {usuarioLista.nome}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {usuarioLista.documento}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <ReactTooltip id='solicitarTip'
                            place="bottom"
                            effect="solid"
                          >Solicitar equipamento
                          </ReactTooltip>
                          <IconButton data-tip data-for="solicitarTip"
                            size="medium"
                            onClick={() => solicitar(usuarioLista)}
                          >
                            <FaFileSignature
                              style={{
                                backgroundColor: "white",
                                color: "#052D6A",
                                border: '2px solid',
                                borderColor: '#052D6A'
                              }}
                            />
                          </IconButton>
                          <ReactTooltip id='removerTip'
                            place="bottom"
                            effect="solid"
                          >Remover da lista
                          </ReactTooltip>
                          <IconButton data-tip data-for='removerTip'
                            size="medium"
                          onClick={() => remover(usuarioLista)}
                          >
                            <TbTrashX
                              style={{
                                backgroundColor: "#FFCFCF",
                                color: "#FB3C3C",
                                border: '2px solid',
                                borderColor: '#FB3C3C'
                              }}
                            />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </Box >
    </>
  );
};
export default ListaEspera;