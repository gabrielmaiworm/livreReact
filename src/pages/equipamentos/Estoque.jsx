import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Box,
  InputAdornment,
  Table,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material/styles";
import Tab from '@mui/material/Tab';
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbArrowBigUpLine, TbTrashX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import "../../style/File.css";
import "../../App.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api, { apiget, apipost, apiput } from '../../Services/api';
import { responsiveProperty } from '@mui/material/styles/cssUtils';

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


const Estoque = () => {
  const [numeroEquipamentos, setNumeroEquipamentos] = useState([]);
  const [numeroBaterias, setNumeroBaterias] = useState([]);
  const [numero_serie_bateria, setNumero_serie_bateria] = useState("");
  const [numero_serie_equipamento, setNumero_serie_equipamento] = useState("");
  const [parceiro, setParceiro] = useState("");
  const [razao_social, setRazao_social] = useState("");
  const [parceiros, setParceiros] = useState([]);
  const [query, setQuery] = useState("");

  const handleOnHoverParceiro = (result) => {
  };

  const handleOnFocusParceiro = () => {
  };

  const handleOnSearchParceiro = (string, results) => {
    setParceiro(string);
  };

  const handleOnSelectParceiro = (item) => {
    setParceiro(item.documento);
    setRazao_social(item.razao_social);
  };

  const handleOnClearParceiro = () => {
    setParceiro('');
  };

  const handleOnHoverEquipamento = (result) => {
  };

  const handleOnFocusEquipamento = () => {
  };

  const handleOnSearchEquipamento = (string, results) => {
    setNumero_serie_equipamento(string);
  };

  const handleOnSelectEquipamento = (item) => {
    setNumero_serie_equipamento(item.numero_serie_equipamento);
  };

  const handleOnClearEquipamento = () => {
    setNumero_serie_equipamento('');
  };

  const handleOnHoverBateria = (result) => {
  };

  const handleOnFocusBateria = () => {
  };

  const handleOnSearchBateria = (string, results) => {
    setNumero_serie_bateria(string);
  };

  const handleOnSelectBateria = (item) => {
    setNumero_serie_bateria(item.numero_serie_bateria);
  };

  const handleOnClearBateria = () => {
    setNumero_serie_bateria('');
  };

  useEffect(() => {
    getEquipamento();
  }, []);


  useEffect(() => {
    getBateria();
  }, []);

  useEffect(() => {
    getParceiro();
  }, []);

  const getBateria = async () => {
  const response = await apiget('/bateria-liberado')
      setNumeroBaterias(response);
    
  };
  const getEquipamento = async () => {
    const response = await apiget('/equipamento-liberado')
      setNumeroEquipamentos(response);
    
  };

  const getParceiro = async  () => {
    const response = await apiget('/parceiro')
      setParceiros(response);
    
  };
  // EXEMPLO
  const navigateSolicita = useNavigate();

  const Submit = (ev) => {
    ev.preventDefault();
    const estoque = { numero_serie_equipamento, numero_serie_bateria, razao_social };

    if (!estoque.numero_serie_equipamento)
      alert("Erro: preencha o número de série do equipamento");
    else if (!estoque.numero_serie_bateria)
      alert("Erro: preencha o número de série da bateria");
    else {
      apipost("/estoque", estoque).then((res) => {
        alert("Kit montado com Sucesso!");
        navigateSolicita("/estoque");
        window.location.reload();
      }).catch((err) => {
        alert('Equipamento ou bateria já fazem parte de um conjunto');
      })
    }
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    getEstoque();
  }, []);

  const getEstoque = async () => {
    const response = await apiget('/estoque')
      setEstoque(response);
    
  };

  const navigate = useNavigate();

  const atualizar = (estoque) => {
    navigate(`/atualizar-equipamento`)
  };

  function handleOnChangeQuery(event) {
    setQuery(event.target.value);
    console.log(event.target.value);
  }

  //DESMONTAR CONJUNTO
  const [openDelete, setOpenDelete] = React.useState(false);
  const [equipamento, setEquipamento] = useState('');

  const Submitkit = async (estoque) => {

    try {
      const desmonta = { kit: estoque.kit };
      console.log('value', desmonta)
      await api.put('/estoque', desmonta)
        alert("Conjunto Desmontado Com Sucesso!");
        setOpenDelete(false);
        window.location.reload();
    } catch (error) {
      
    }

      // <TabPanel value='2' accessKey=''/>
     
      // <TabPanel value='2'/>
    
  }



  const handleClickOpen = async (estoque) => {
    setEquipamento(estoque);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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
        > Montar/Desmontar conjunto
        </Typography>
        <Box sx={{
          border: '1px solid',
          borderRadius: '5px',
          borderColor: '#7396CA',
          marginRight: '2%',
          marginLeft: '2%',
          minHeight:'70vh',
          maxHeight: '70vh',
          overflowY: "scroll",
        }}>
          <Box marginTop='2%'>
            <TabContext value={value}>
              <Box>
                <TabList centered
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    borderBottom: '1px solid',
                    borderBottomColor: '#7396CA',
                  }}>
                  <Tab sx={{
                    fontWeight: '500',
                    fontSize: '20px',
                    fontFamily: 'Poppins',
                    marginRight: '20vh',
                    color: '#373737'
                  }}
                    label='Montar Conjunto'
                    value="1" />
                  <Tab sx={{
                    fontWeight: '500',
                    fontSize: '20px',
                    fontFamily: 'Poppins',
                    color: '#373737'
                  }}
                    label="Desmontar Conjunto"
                    value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box marginTop='2%'>
                  <Typography sx={{
                    marginLeft: '2%',
                    marginBottom: '2%',
                    width: "459px",
                    fontSize: '19px',
                    fontWeight: "bold",
                    color: "#373737",
                  }} align='left' > Nº de série do equipamento
                    <ReactSearchAutocomplete
                      placeholder="Número de série equipamento"
                      items={numeroEquipamentos}
                      fuseOptions={{ keys: ["numero_serie_equipamento"] }} // Search on both fields
                      resultStringKeyName="numero_serie_equipamento" // String to display in the results
                      onSearch={handleOnSearchEquipamento}
                      onHover={handleOnHoverEquipamento}
                      onSelect={handleOnSelectEquipamento}
                      onFocus={handleOnFocusEquipamento}
                      onClear={handleOnClearEquipamento}
                      showIcon={true}
                      styling={{
                        color: '#9F9F9F',
                        fontSize: '18px',
                        fontWeight: '500',
                        backgroundColor: "#EBF1FB",
                        borderRadius: "5px",
                        border: 'solid',
                        color: "#062e61",
                        fontSize: "17px",
                        iconColor: "black",
                        lineColor: "black",
                        placeholderColor: "white-smoke",
                        clearIconMargin: "3px 8px 0 0",
                        zIndex: 3,
                      }} />
                  </Typography>

                  <Typography sx={{
                    marginLeft: '55%',
                    marginTop: '-8.5%',
                    width: "459px",
                    fontSize: '19px',
                    fontWeight: "bold",
                    color: "#373737",
                  }} align='left'> Nº de série da bateria
                    <ReactSearchAutocomplete
                      placeholder="Número de série bateria"
                      items={numeroBaterias}
                      fuseOptions={{ keys: ["numero_serie_bateria"] }} // Search on both fields
                      resultStringKeyName="numero_serie_bateria" // String to display in the results
                      onSearch={handleOnSearchBateria}
                      onHover={handleOnHoverBateria}
                      onSelect={handleOnSelectBateria}
                      onFocus={handleOnFocusBateria}
                      onClear={handleOnClearBateria}
                      showIcon={true}
                      styling={{
                        color: '#9F9F9F',
                        fontSize: '18px',
                        fontWeight: '500',
                        backgroundColor: "#EBF1FB",
                        borderRadius: "5px",
                        border: 'solid',
                        color: "#062e61",
                        fontSize: "17px",
                        iconColor: "black",
                        lineColor: "black",
                        placeholderColor: "white-smoke",
                        clearIconMargin: "3px 8px 0 0",
                        zIndex: 2,
                      }}
                    />
                  </Typography>
                </Box>
                <Box marginTop='2%'>
                  <Typography sx={{
                    marginLeft: '2%',
                    marginBottom: '2%',
                    width: "459px",
                    fontSize: '19px',
                    fontWeight: "bold",
                    color: "#373737",
                  }} align='left' >Razão social do parceiro
                    <ReactSearchAutocomplete
                      placeholder="Razão social do parceiro"
                      items={parceiros}
                      fuseOptions={{ keys: ["razao_social"] }}// Search on both fields
                      resultStringKeyName="razao_social" // String to display in the results
                      onSearch={handleOnSearchParceiro}
                      onHover={handleOnHoverParceiro}
                      onSelect={handleOnSelectParceiro}
                      onFocus={handleOnFocusParceiro}
                      onClear={handleOnClearParceiro}
                      showIcon={true}
                      styling={{
                        color: '#9F9F9F',
                        fontSize: '18px',
                        fontWeight: '500',
                        backgroundColor: "#EBF1FB",
                        borderRadius: "5px",
                        border: 'solid',
                        color: "#062e61",
                        fontSize: "17px",
                        iconColor: "black",
                        lineColor: "black",
                        placeholderColor: "white-smoke",
                        clearIconMargin: "3px 8px 0 0",
                        zIndex: 1,
                      }} />
                  </Typography>

                  <Typography sx={{
                    marginLeft: '55%',
                    marginTop: '-6.5%',
                    width: "459px",
                    fontSize: '19px',
                    fontWeight: "bold",
                    color: "#373737",
                  }} >
                    <button onClick={Submit}
                      style={{
                        borderRadius: '5px',
                        backgroundColor: '#052D6A',
                        width: '459px',
                        height: '54px',
                        color: 'white',
                        fontFamily: 'Poppins',
                        fontSize: '23px',
                        fontWeight: '600'
                      }}
                    >Confirmar
                    </button>
                  </Typography>
                </Box>

              </TabPanel>
              <TabPanel value="2">
                <div style={{ marginBottom: '2%' }}>
                  <TextField
                    style={{
                      color: '#9F9F9F',
                      fontWeight: 'bold',
                      backgroundColor: "#EBF1FB",
                      borderBottom: "1px solid",
                      borderBottomColor: "#1D4F9A",
                      borderRadius: "5px",
                      height: "40px",
                      width: "449px"
                    }}
                    variant="standard"
                    name="query"
                    value={query}
                    onChange={handleOnChangeQuery}
                    placeholder='Filtrar por número de série'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AiOutlineSearch />
                        </InputAdornment>
                      ),
                      sx: { fontSize: 21 },
                    }}
                  />
                </div>
                <Paper sx={{ width: '100%' }}>
                  <TableContainer
                    component={Grid}
                    sx={{
                      marginBottom: "1%",
                      border: "1px solid",
                      borderRadius: "5px",
                      maxHeight: 300,
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
                            Equipamento
                          </StyledTableCell>
                          <StyledTableCell style={{
                            borderBottom: '1px solid'
                          }} align='center' >
                            Bateria
                          </StyledTableCell>
                          <StyledTableCell style={{
                            borderBottom: '1px solid'
                          }} align='center' >
                            Status equipamento
                          </StyledTableCell>
                          <StyledTableCell style={{
                            borderBottom: '1px solid'
                          }} align="center">
                            Status bateria</StyledTableCell>
                          <StyledTableCell style={{
                            borderBottom: '1px solid'
                          }} align='center'>
                            Ações </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {estoque.map(estoque => {
                          if (query.length == 0) {
                            return (
                              <StyledTableRow key={estoque.id}>
                                <StyledTableCell>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {estoque.numero_serie_equipamento}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {estoque.numero_serie_bateria}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {estoque.equipamento_status}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {estoque.bateria_status}
                                </StyledTableCell>
                                <StyledTableCell align='center'>
                                  {/* <QRCode size={100} value={estoque.numero_serie_equipamento} /> */}
                                  {/* <IconButton
                                    sx={{
                                      backgroundColor: "white",
                                      color: "white",
                                      marginRight: "1vw",
                                    }}
                                    size="medium"
                                  // onClick={(e) => Submitkit(estoque.kit)}
                                  >
                                    <MdQrCode2
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",
                                        borderRadius: "30px",
                                      }}
                                    /> */}
                                  {/* </IconButton> */}
                                  <IconButton
                                    size="medium"
                                    onClick={() => atualizar(estoque)}
                                  >
                                    <TbArrowBigUpLine
                                      style={{
                                        backgroundColor: "white",
                                        color: "#052D6A",
                                        borderRadius: "30px",
                                        border: '2px solid',
                                        borderColor: '#052D6A'
                                      }}
                                    />
                                  </IconButton>
                                  <IconButton
                                    size="medium"
                                    onClick={() => handleClickOpen(estoque)}
                                  >
                                    <TbTrashX
                                      style={{
                                        backgroundColor: "#FFCFCF",
                                        color: "#FB3C3C",
                                        borderRadius: "30px",
                                      }}
                                    />
                                  </IconButton>
                                  <Dialog
                                    open={openDelete}
                                    onClose={handleCloseDelete}
                                    BackdropProps={{ invisible: true }}
                                    sx={{
                                      top: '-30%',
                                      left: '-15%',
                                      width: '40%',
                                      height: '65%',
                                      transform: "translate(120%, 80%)",
                                      bgcolor: "background.paper",
                                      boxShadow: "2px 2px 5px #6666",
                                      borderRadius: "21px",
                                    }}
                                    PaperProps={{
                                      style: {
                                        boxShadow: 'none',
                                      },
                                    }}
                                  >
                                    <DialogTitle align='center'
                                      style={{
                                        color: '#052D6A',
                                        fontWeight: '600',
                                        fontSize: '32px'
                                      }} fontFamily='Poppins'>
                                      {"Desmontar Conjunto"}
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText align='center'
                                        style={{
                                          color: '##373737',
                                          fontWeight: '500',
                                          fontSize: '19px'
                                        }} fontFamily='Poppins'>
                                        Deseja realmente desmontar o conjunto {equipamento?.kit} ?
                                      </DialogContentText>
                                      <Typography align='center'>
                                        <RiErrorWarningLine
                                          style={{
                                            align: 'center',
                                            width: '77.56px',
                                            height: '77.56px',
                                            color: '#052D6A'
                                          }} />
                                      </Typography>
                                    </DialogContent>
                                    <DialogActions style={{ alignContent: 'center' }}>
                                      <button onClick={handleCloseDelete}
                                        style={{
                                          backgroundColor: 'white',
                                          color: '#052D6A',
                                          marginRight: '20%',
                                          marginLeft: '10%',
                                          borderColor: '#052D6A',
                                          border: '1px solid',
                                          fontWeight: '700',
                                          fontFamily: 'Poppins',
                                          fontSize: '23px',
                                          width: '225px',
                                          height: '54px',
                                          borderRadius: '12px'
                                        }} fontFamily='Poppins'> Não</button>
                                      <Button onClick={() =>Submitkit(estoque)}
                                        style={{
                                          backgroundColor: '#052D6A',
                                          color: 'white',
                                          marginRight: '10%',
                                          fontWeight: '700',
                                          fontFamily: 'Poppins',
                                          fontSize: '23px',
                                          width: '225px',
                                          height: '54px',
                                          border: 'none',
                                          borderRadius: '12px'
                                        }} fontFamily='Poppins'>Sim</Button>
                                    </DialogActions>
                                  </Dialog>
                                </StyledTableCell>
                              </StyledTableRow>);
                          } else {
                            if (estoque.numero_serie_equipamento.includes(query)
                              || estoque.numero_serie_bateria.includes(query)
                              || estoque.razao_social.toLowerCase().includes(query.toLowerCase())
                            ) {
                              return (
                                <StyledTableRow key={estoque.id}>
                                  <StyledTableCell>
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {estoque.numero_serie_equipamento}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {estoque.numero_serie_bateria}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {estoque.equipamento_status}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {estoque.bateria_status}
                                  </StyledTableCell>
                                  <StyledTableCell align='center'>
                                    <IconButton
                                      size="medium"
                                      onClick={() => atualizar(estoque)}
                                    >
                                      <TbArrowBigUpLine
                                        style={{
                                          backgroundColor: "white",
                                          color: "#052D6A",
                                          borderRadius: "30px",
                                          border: '2px solid',
                                          borderColor: '#052D6A'
                                        }}
                                      />
                                    </IconButton>
                                    <IconButton
                                      size="medium"
                                      onClick={() => handleClickOpen(estoque)}
                                    >
                                      <TbTrashX
                                        style={{
                                          backgroundColor: "#FFCFCF",
                                          color: "#FB3C3C",
                                          borderRadius: "30px",
                                        }}
                                      />
                                    </IconButton>
                                    <Dialog
                                      open={openDelete}
                                      onClose={handleCloseDelete}
                                      BackdropProps={{ invisible: true }}
                                      sx={{
                                        top: '-30%',
                                        left: '-15%',
                                        width: '40%',
                                        height: '65%',
                                        transform: "translate(120%, 80%)",
                                        bgcolor: "background.paper",
                                        boxShadow: "2px 2px 5px #6666",
                                        borderRadius: "21px",
                                      }}
                                      PaperProps={{
                                        style: {
                                          boxShadow: 'none',
                                        },
                                      }}
                                    >
                                      <DialogTitle align='center'
                                        style={{
                                          color: '#052D6A',
                                          fontWeight: '600',
                                          fontSize: '32px'
                                        }} fontFamily='Poppins'>
                                        {"Desmontar Conjunto"}
                                      </DialogTitle>
                                      <DialogContent>
                                        <DialogContentText align='center'
                                          style={{
                                            color: '##373737',
                                            fontWeight: '500',
                                            fontSize: '19px'
                                          }} fontFamily='Poppins'>
                                          Deseja realmente desmontar o conjunto {equipamento?.kit} ?
                                        </DialogContentText>
                                        <Typography align='center'>
                                          <RiErrorWarningLine
                                            style={{
                                              align: 'center',
                                              width: '77.56px',
                                              height: '77.56px',
                                              color: '#052D6A'
                                            }} />
                                        </Typography>
                                      </DialogContent>
                                      <DialogActions style={{ alignContent: 'center' }}>
                                        <button onClick={handleCloseDelete}
                                          style={{
                                            backgroundColor: 'white',
                                            color: '#052D6A',
                                            marginRight: '20%',
                                            marginLeft: '10%',
                                            borderColor: '#052D6A',
                                            border: '1px solid',
                                            fontWeight: '700',
                                            fontFamily: 'Poppins',
                                            fontSize: '23px',
                                            width: '225px',
                                            height: '54px',
                                            borderRadius: '12px'
                                          }} fontFamily='Poppins'> Não</button>
                                        {/* <button onClick={(e) => Submitkit(equipamento.kit)} */}
                                          {/* style={{
                                            backgroundColor: '#052D6A',
                                            color: 'white',
                                            marginRight: '10%',
                                            fontWeight: '700',
                                            fontFamily: 'Poppins',
                                            fontSize: '23px',
                                            width: '225px',
                                            height: '54px',
                                            border: 'none',
                                            borderRadius: '12px'
                                          }} fontFamily='Poppins'>Sim</button> */}
                                      </DialogActions>
                                    </Dialog>
                                  </StyledTableCell>
                                </StyledTableRow>
                              );
                            }
                          }
                        }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Estoque;