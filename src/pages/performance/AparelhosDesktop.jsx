import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Badge, Button, Card, CardContent, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Flexbox from 'flexbox-react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import React, { useEffect, useState } from 'react';
import { BiMap } from 'react-icons/bi';
import { GrDocumentPdf } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';

// import { InputCadastro } from '../../style/Cadastro';
import "../../style/File.css";
import { FiCheckSquare } from 'react-icons/fi';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { BsFillCapslockFill, BsGeoAltFill, BsSearch} from "react-icons/bs";
import { InputCadastro, SearchBox } from "./styles";
import { apiget } from "../../Services/api";
import { Alert } from "bootstrap";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AparelhoDesktop = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffff',
      color: theme.palette.common.black,

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '0.8vw',
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [reservado, setReservado] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [inativos, setInativos] = useState([]);
  const [emergencia, setEmergencia] = useState([]);
  const [manutencao, setManutencao] = useState([]);
  const [inativosEquipamento, setInativosEquipamento] = useState([]);
  const [inativosBateria, setInativosBateria] = useState([]);
  const [query, setQuery] = useState("");
  const [kit, setKit] = useState([]);
  console.log('estoqueinativo',inativos)
  console.log('manutencao',manutencao)
  console.log('estoque',estoque)
  console.log('reserva',reservado)


  const getInativo = async () =>{
    const response = await apiget("/estoque-inativo")
      setInativos(response)
  };
  const getBateriaInativo = async () =>{
    const response = await apiget("/bateria-inativo")
    setInativosBateria(response)
  };
  const getEquipamentoInativo = async () =>{
    const response = await apiget("/equipamento-inativo")
    setInativosEquipamento(response)
  };
  const getEstoqueManutencao = async () =>{
    const response = await apiget("/estoque-manutencao")
    setManutencao(response)
  };
  const getEstoque = async () =>{
    const response = await apiget("/estoque")
    setEstoque(response)
  };
  const getSolicitacao = async () =>{
    const response = await apiget("/solicitacao")
    setSolicitacoes(response)
  };
  const getEstoqueEmergencia = async () =>{
    const response = await apiget("/estoque-emergencia")
    setEmergencia(response)
  };
  const getEstoqueReservado = async () =>{
    const response = await apiget("/estoque-reservado")
    setReservado(response)
  };
  
 

  useEffect( () => {
  getInativo();
  getBateriaInativo();
  getEquipamentoInativo();
  getEstoqueManutencao();
  getEstoque();
  getSolicitacao();
  getEstoqueEmergencia();
  getEstoqueReservado();

  }, []);

 

  


 




  function PdfQrCode() {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const titulo = [{
      text: 'QR code',
      fontSize: 15,
      bold: true,
      margin: [10, 10, 10, 10],
      alignment: 'center'
    }];

    const dados = estoque.map((estoque) => {
      return [
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  stack: [
                    {
                      ul: [
                        {
                          margin: [10, 40, 10, 10],
                          text: 'Número do equipamento',
                          alignment: 'center',
                        },
                        {
                          margin: [10, 10, 10, 40],
                          text: estoque?.numero_serie_equipamento,
                          alignment: 'center'
                        },
                        {
                          margin: [10, 10, 10, 10],
                          qr: estoque?.numero_serie_equipamento,
                          alignment: 'center',
                          fit: '200'
                        }
                      ]
                    }
                  ]
                }
              ]
            ]
          }
        }


      ]
    })
  
    
    const adesivo = {
      pageSize: 'A4',
      pageMargins: [185, 50, 15, 115],

      header: [titulo],
      content: [dados],
    }

    pdfMake.createPdf(adesivo).open();
  }

  const navigate = useNavigate();

  const atualizarEst = (estoque) => {
    // navigate(`/atualizar-equipamento/${estoque?.kit}`)
    navigate(`/atualizar-equipamento`)
  };

  const atualizarEmer = (emergencia) => {
    // navigate(`/atualizar-equipamento-emergencia/${emergencia?.kit}`)
    navigate(`/atualizar-equipamento-emergencia`)
  };

  const atualizarManu = (manutencao) => {
    // navigate(`/atualizar-equipamento/${manutencao?.kit}`)
    navigate(`/atualizar-equipamento`)
  };

  const atualizarIna = (inativo) => {
    // navigate(`/atualizar-equipamento/${inativo?.kit}`)
    navigate(`/atualizar-equipamento`)
  };

  const localizar = (solicitacao) => {
    alert('Função indisponível');
    // navigate(`/geolocalizacao/${solicitacao?.kit}`)
  };

  function handleOnChangeQuery(event) {
    setQuery(event?.target.value);
    console.log(event?.target?.value);
  }

  function shouldShowBadge() {
    return <div style={{ margin: '0px 0px 0px -8px' }}>
      <Badge
        badgeContent={emergencia.length}
        color="warning" overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </div>
  }


  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        
        
      }}>
      <CardContent sx={{ backgroundColor: "#ffffff" }}>
       
        <Typography style={{
          component: "div",
          marginBottom: "50px",
          paddingcenter:'20vw',
          color: "#062e61",
          fontWeight: "bold",
          fontSize: "30px",
          justifySelf:'flex-start',
          display:'flex',
          marginLeft: '15%'
        }}>
          Performance
        </Typography>
        <Box sx={{  typography: 'body1', marginBottom: '29px' }}>
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <TabList  centered onChange={handleChange} aria-label="lab API tabs example">
                <Tab sx={{ fontSize: '0.8vw', fontWeight: 'bold' }} label="Em uso" value="1" />
                {/* <Tab sx={{ fontSize: '0.8vw', fontWeight: 'bold' }} label="Reservado" value="2" /> */}
                <Tab sx={{ fontSize: '0.8vw', fontWeight: 'bold' }} label="Em espera" value="3" />
                {/* <Tab sx={{ fontSize: '0.8vw', fontWeight: 'bold' }} label="Emergência" value="4" /> */}
                {/* {shouldShowBadge()} */}
                <Tab sx={{ fontSize: '0.8vw', fontWeight: 'bold' }} label="Em manutenção" value="5" />
                <Tab sx={{ fontSize: '0.8vw', fontWeight: 'bold' }} label="Inativo" value="6" />
              </TabList>
            </Box>
            <TabPanel style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: "center",
              marginBottom: '93px'
            }} value="1">
              <div style={{ display: 'inline-block', minHeight: '300px' }}>
                <Typography style={{
                  marginBottom: '25px',
                 
                }}>
                  <BsSearch/><InputCadastro
                    onFocus={true}
                    name="query" value={query}
                    onChange={handleOnChangeQuery}
                    placeholder=" Buscar"
                   
                    />
                   
                </Typography>
                
            
                   <TableContainer component={Paper}>
                <Table sx={{ minWidth: '60vw' }} >
                <TableHead >
          <TableRow >
            <StyledTableCell>Usuário</StyledTableCell>
            {/* <StyledTableCell align="center">Status</StyledTableCell> */}
            <StyledTableCell align="center">Equipamento</StyledTableCell>
            <StyledTableCell align="center">Bateria</StyledTableCell>
            <StyledTableCell align="center">Velocidade</StyledTableCell>
            <StyledTableCell align="center">Parceiro</StyledTableCell>
            <StyledTableCell align="center">Localizar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solicitacoes.map(solicitacao => {
               if (query.length == 0) {
                return (
            <StyledTableRow key={solicitacao?.id}>
              <StyledTableCell component="th" scope="solicitacao?">
              {solicitacao?.nome_usuario}
              </StyledTableCell>
              {/* <StyledTableCell align="center">{solicitacao?.equipamento_status}</StyledTableCell> */}
              <StyledTableCell align="center">{solicitacao?.numero_serie_bateria}</StyledTableCell>
              <StyledTableCell align="center">{solicitacao?.carga}%</StyledTableCell>
              <StyledTableCell align="center">{solicitacao?.velocidade ? (`${solicitacao?.velocidade}'km/h'`):('0 km/h')}</StyledTableCell>
              <StyledTableCell align="center">{solicitacao?.razao_social}</StyledTableCell>
              <StyledTableCell align="center">
               <button onClick={() => localizar(solicitacao)}
                             style={{
                              width: "30px",
                              height: '30px',
                              borderRadius:'100px',
                              fontWeight: 'bold',
                              color: '#052d6a',
                              borderColor:'#052d6a'
                            
                             
                            }}>
                            <BsGeoAltFill /></button></StyledTableCell>
          
            </StyledTableRow>)}
else {
    if (solicitacao?.numero_serie_equipamento.includes(query)
  || solicitacao?.nome_usuario.toLowerCase().includes(query.toLowerCase())
  || solicitacao?.numero_serie_bateria.includes(query)
  || solicitacao?.razao_social.toLowerCase().includes(query.toLowerCase())
)  {
    return ( <StyledTableRow key={solicitacao?.id}>
      <StyledTableCell component="th" scope="solicitacao?">
      {solicitacao?.nome_usuario}
      </StyledTableCell>
      {/* <StyledTableCell align="center">{solicitacao?.equipamento_status}</StyledTableCell> */}
      <StyledTableCell align="center">{solicitacao?.numero_serie_bateria}</StyledTableCell>
      <StyledTableCell align="center">{solicitacao?.carga}%</StyledTableCell>
      <StyledTableCell align="center">{solicitacao?.velocidade ? (`${solicitacao?.velocidade}'km/h'`):('0 km/h')}</StyledTableCell>
      <StyledTableCell align="center">{solicitacao?.razao_social}</StyledTableCell>
      <StyledTableCell align="center">
               <button onClick={() => localizar(solicitacao)}
                            style={{
                               width: "30px",
                               height: '30px',
                               borderRadius:'100px',
                               fontWeight: 'bold',
                               color: '#052d6a',
                               borderColor:'#052d6a'
                             
                              
                             }}>
                             <BsGeoAltFill /></button></StyledTableCell>
    
    </StyledTableRow>)}}

          })}

        </TableBody>

                   </Table>
                </TableContainer>
              </div>
            </TabPanel>


            <TabPanel style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: "center"
            }} value="2">
              <div style={{ display: 'inline-block', minHeight: '300px' }}>
                <Typography style={{
                  marginBottom: '25px',
                 marginTop: '-140px'
                 
                }}>
             
                  <BsSearch color="#052d6a"/><InputCadastro
                    onFocus={true}
                    disableUnderline={true}
                    name="query" value={query}
                    onChange={handleOnChangeQuery}
                    placeholder=" Buscar"
                    />
              
               
                   
                </Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: '60vw' }} aria-label="customized table">
                <TableHead>
          <TableRow>
            <StyledTableCell>Usuário</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Equipamento</StyledTableCell>
            <StyledTableCell align="center">Bateria</StyledTableCell>
            <StyledTableCell align="center">Parceiro</StyledTableCell>
            <StyledTableCell align="center">Dt retirada</StyledTableCell>
            <StyledTableCell align="center">Hr retirada</StyledTableCell>
            <StyledTableCell align="center">Status retirada</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservado.map(reservado => {
               if (query.length == 0) {
                return (
            <StyledTableRow key={reservado?.id}>
              <StyledTableCell component="th" scope="reservado?">
              {reservado?.cliente_nome}
              </StyledTableCell>
              <StyledTableCell align="center">{reservado?.equipamento_status}</StyledTableCell>
              <StyledTableCell align="center">{reservado?.numero_serie_bateria}</StyledTableCell>
              <StyledTableCell align="center">{reservado?.carga}%</StyledTableCell>
              <StyledTableCell align="center">{reservado?.razao_social}</StyledTableCell>
              <StyledTableCell align="center"> {reservado?.data_reserva.slice(-24, 10)
                                .split('-').reverse().join('/')}</StyledTableCell>
              <StyledTableCell align="center">{reservado?.data_reserva.slice(11)
                                .split('Z').join('').split('Z')
                                .join('').slice(0, 5)}</StyledTableCell>
                                <StyledTableCell align="center">{reservado?.equipamento_status}</StyledTableCell>
            </StyledTableRow>)}
else {
  if (reservado?.numero_serie_equipamento.includes(query)
    || (reservado?.razao_social != null && reservado?.razao_social.toLowerCase().includes(query.toLowerCase()))
  ) {
    return ( <StyledTableRow key={reservado?.id}>
      <StyledTableCell component="th" scope="reservado?">
      {reservado?.cliente_nome}
      </StyledTableCell>
      <StyledTableCell align="center">{reservado?.equipamento_status}</StyledTableCell>
      <StyledTableCell align="center">{reservado?.numero_serie_bateria}</StyledTableCell>
      <StyledTableCell align="center">{reservado?.carga}%</StyledTableCell>
      <StyledTableCell align="center">{reservado?.razao_social}</StyledTableCell>
      <StyledTableCell align="center"> {reservado?.data_reserva.slice(-24, 10)
                                .split('-').reverse().join('/')}</StyledTableCell>
      <StyledTableCell align="center">{reservado?.data_reserva.slice(11)
                                .split('Z').join('').split('Z')
                                .join('').slice(0, 5)}</StyledTableCell>
      <StyledTableCell align="center">{reservado?.equipamento_status}</StyledTableCell>
    
    </StyledTableRow>)}}

          })}

        </TableBody>

                   </Table>
                </TableContainer>
           
              </div>
            </TabPanel>
            <TabPanel style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} value="3">
              <div style={{ display: 'inline-block', minHeight: '300px' }}>
              <Typography style={{
                  marginBottom: '25px',
                 marginTop: '-190px'
                }}>
                  <BsSearch/><InputCadastro
                    onFocus={true}
                    name="query" value={query}
                    onChange={handleOnChangeQuery}
                    placeholder=" Buscar"
                    />
                   
                </Typography>

                
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: '60vw' }} aria-label="customized table">
                <TableHead>
          <TableRow>
            <StyledTableCell>Equipamento</StyledTableCell>
            <StyledTableCell align="center">Status equipamento</StyledTableCell>
            <StyledTableCell align="center">Bateria</StyledTableCell>
            <StyledTableCell align="center">Status Bateria</StyledTableCell>
            <StyledTableCell align="center">Carga bateria</StyledTableCell>
            <StyledTableCell align="center">Parceiro</StyledTableCell>
            <StyledTableCell align="center">Atualizar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estoque.map(estoque => {
               if (query.length == 0) {
                return (
            <StyledTableRow key={estoque?.id}>
              <StyledTableCell component="th" scope="estoque">
                {estoque?.numero_serie_equipamento}
              </StyledTableCell>
              <StyledTableCell align="center">{estoque?.equipamento_status}</StyledTableCell>
              <StyledTableCell align="center">{estoque?.numero_serie_bateria}</StyledTableCell>
              <StyledTableCell align="center">{estoque?.bateria_status}</StyledTableCell>
              <StyledTableCell align="center">{estoque?.carga}%</StyledTableCell>
             
              <StyledTableCell align="center">{estoque?.razao_social}</StyledTableCell>
              <StyledTableCell align="center"> 
                           
                           <button onClick={() => atualizarManu(estoque)}
                             style={{
                               width: "30px",
                               height: '30px',
                               borderRadius:'100px',
                               fontWeight: 'bold',
                               color: '#052d6a',
                               borderColor:'#052d6a'
                             
                              
                             }}>
                             <BsFillCapslockFill /></button></StyledTableCell>
            </StyledTableRow>)}
else {
  if (estoque?.numero_serie_equipamento.includes(query)
    || (estoque?.razao_social != null && estoque?.razao_social.toLowerCase().includes(query.toLowerCase()))
  ) {
    return ( <StyledTableRow key={estoque?.id}>
      <StyledTableCell component="th" scope="estoque">
        {estoque?.numero_serie_equipamento}
      </StyledTableCell>
      <StyledTableCell align="center">{estoque?.equipamento_status}</StyledTableCell>
      <StyledTableCell align="center">{estoque?.numero_serie_bateria}</StyledTableCell>
      <StyledTableCell align="center">{estoque?.bateria_status}</StyledTableCell>
      <StyledTableCell align="center">{estoque?.carga}%</StyledTableCell>
      <StyledTableCell align="center">{estoque?.razao_social}</StyledTableCell>
      <StyledTableCell align="center"> 
                   
                   <button onClick={() => atualizarManu(estoque)}
                     style={{
                       width: "30px",
                       height: '30px',
                       borderRadius:'100px',
                       fontWeight: 'bold',
                       color: '#052d6a',
                       borderColor:'#052d6a'
                     
                      
                     }}>
                     <BsFillCapslockFill /></button></StyledTableCell>
    </StyledTableRow>)}}

          })}

        </TableBody>

                   </Table>
                </TableContainer>
              </div>
            </TabPanel>
            <TabPanel value="4" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: "center",
              marginBottom: '18px',
              marginTop: '-229px'
            }} >
              <div style={{ display: 'inline-block', minHeight: '300px' }}>
              <Typography style={{
                  marginBottom: '25px',
             
                }}>
                  <BsSearch/><InputCadastro
                    onFocus={true}
                    name="query" value={query}
                    onChange={handleOnChangeQuery}
                    placeholder=" Buscar"
                    />
                   
                </Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: '60vw' }} aria-label="customized table">
                <TableHead>
          <TableRow>
          
            <StyledTableCell align="center">Equipamento</StyledTableCell>
            <StyledTableCell align="center">Bateria</StyledTableCell>
            <StyledTableCell align="center">Carga</StyledTableCell>
            <StyledTableCell align="center">Parceiro</StyledTableCell>
            <StyledTableCell align="center">Motivo emergência</StyledTableCell>
            <StyledTableCell align="center">Remover chamada</StyledTableCell>
            <StyledTableCell align="center">Localizar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emergencia.map(emergencia => {
               if (query.length == 0) {
                return (
            <StyledTableRow key={emergencia?.id}>
              <StyledTableCell component="th" scope="emergencia">
                {emergencia?.numero_serie_equipamento}
              </StyledTableCell>
         
              <StyledTableCell align="center">{emergencia?.numero_serie_bateria}</StyledTableCell>
              <StyledTableCell align="center">{emergencia?.carga}%</StyledTableCell>
              <StyledTableCell align="center">{emergencia?.razao_social}</StyledTableCell>
              <StyledTableCell align="center">{emergencia?.motivo_emergencia}</StyledTableCell>

              <StyledTableCell align="center"> 
                           
                           <button onClick={() => alert('Funcao não disponível')}
                             style={{
                               width: "30px",
                               height: '30px',
                               borderRadius:'100px',
                               fontWeight: 'bold',
                               color: '#052d6a',
                               borderColor:'#052d6a'
                             
                              
                             }}>
                             <FiCheckSquare /></button></StyledTableCell>
                             <StyledTableCell align="center"> 
                           
                           <button onClick={() => alert('Funcao não disponível')}
                             style={{
                               width: "30px",
                               height: '30px',
                               borderRadius:'100px',
                               fontWeight: 'bold',
                               color: '#052d6a',
                               borderColor:'#052d6a'
                             
                              
                             }}>
                             <BsFillCapslockFill /></button></StyledTableCell>
            </StyledTableRow>)}
else {
  if (emergencia?.numero_serie_equipamento.includes(query)
    || (emergencia?.razao_social != null && emergencia?.razao_social.toLowerCase().includes(query.toLowerCase()))
  ) {
    return ( <StyledTableRow key={emergencia?.id}>
      <StyledTableCell component="th" scope="emergencia">
        {emergencia?.numero_serie_equipamento}
      </StyledTableCell>
      <StyledTableCell align="center">{emergencia?.equipamento_status}</StyledTableCell>
      <StyledTableCell align="center">{emergencia?.numero_serie_bateria}</StyledTableCell>
      <StyledTableCell align="center">{emergencia?.carga}%</StyledTableCell>
      <StyledTableCell align="center">{emergencia?.razao_social}</StyledTableCell>
      <StyledTableCell align="center">{emergencia?.motivo_emergencia}</StyledTableCell>
      
      <StyledTableCell align="center"> 
                   
      <button onClick={() => atualizarEmer(emergencia)}
                              style={{
                                width: "175px",
                                height: '30px',
                                fontSize: '14px',
                                borderRadius: "100px",
                                backgroundColor: "#052d6a",
                                fontWeight: 'bold',
                                color: 'white',
                                border: 'none',
                                marginTop: '10px',
                              }}><FiCheckSquare style={{
                                backgroundColor: '#258f6b',
                                fontSize: '16px',
                                marginBottom: '-3px',
                                margincenter: '4px'
                              }}
                              />
                              Resolver chamada</button></StyledTableCell>
    </StyledTableRow>)}}

          })}

        </TableBody>

                   </Table>
                </TableContainer>
           
              </div>
            </TabPanel>
            <TabPanel style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: "center"
            }} value="5">
              <div style={{ display: 'inline-block', minHeight: '300px' }}>
              <Typography style={{
                  marginBottom: '25px',
                  marginTop: '-60px'
             
                }}>

               <SearchBox>
               <BsSearch/><InputCadastro
                    onFocus={true}
                    name="query" value={query}
                    onChange={handleOnChangeQuery}
                    placeholder=" Buscar"
                    />

               </SearchBox>
               
               
                </Typography>

                
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: '60vw' }} aria-label="customized table">
                <TableHead>
          <TableRow>
            <StyledTableCell>Equipamento</StyledTableCell>
            <StyledTableCell align="center">Status equipamento</StyledTableCell>
            <StyledTableCell align="center">Bateria</StyledTableCell>
            <StyledTableCell align="center">Status Bateria</StyledTableCell>
            <StyledTableCell align="center">Carga bateria</StyledTableCell>
            <StyledTableCell align="center">Atualizar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {manutencao.map(manutencao => {
               if (query.length == 0) {
                return (
            <StyledTableRow key={manutencao?.id}>
              <StyledTableCell component="th" scope="manutencao">
                {manutencao?.numero_serie_equipamento}
              </StyledTableCell>
              <StyledTableCell align="center">{manutencao?.equipamento_status}</StyledTableCell>
              <StyledTableCell align="center">{manutencao?.numero_serie_bateria}</StyledTableCell>
              <StyledTableCell align="center">{manutencao?.bateria_status}</StyledTableCell>
              <StyledTableCell align="center">{manutencao?.carga}%</StyledTableCell>
              <StyledTableCell align="center"> 
                           
                           <button onClick={() => atualizarManu(manutencao)}
                             style={{
                               width: "30px",
                               height: '30px',
                               borderRadius:'100px',
                               fontWeight: 'bold',
                               color: '#052d6a',
                               borderColor:'#052d6a'
                             
                              
                             }}>
                             <BsFillCapslockFill /></button></StyledTableCell>
            </StyledTableRow>)}
else {
  if (manutencao?.numero_serie_equipamento.includes(query)
    || (manutencao?.razao_social != null && manutencao?.razao_social.toLowerCase().includes(query.toLowerCase()))
  ) {
    return ( <StyledTableRow key={manutencao?.id}>
      <StyledTableCell component="th" scope="manutencao">
        {manutencao?.numero_serie_equipamento}
      </StyledTableCell>
      <StyledTableCell align="center">{manutencao?.equipamento_status}</StyledTableCell>
      <StyledTableCell align="center">{manutencao?.numero_serie_bateria}</StyledTableCell>
      <StyledTableCell align="center">{manutencao?.bateria_status}</StyledTableCell>
      <StyledTableCell align="center">{manutencao?.carga}%</StyledTableCell>
      <StyledTableCell align="center"> 
                   
                   <button onClick={() => atualizarManu(manutencao)}
                     style={{
                       width: "30px",
                       height: '30px',
                       borderRadius:'100px',
                       fontWeight: 'bold',
                       color: '#052d6a',
                       borderColor:'#052d6a'
                     
                      
                     }}>
                     <BsFillCapslockFill /></button></StyledTableCell>
    </StyledTableRow>)}}

          })}

        </TableBody>

                   </Table>
                </TableContainer>
              </div>



            </TabPanel>
            <TabPanel style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} value="6">
            <div style={{ display: 'inline-block', minHeight: '300px' }}>
            <Typography style={{
                  marginBottom: '25px',
                  marginTop: '-120px'
             
                }}>
                  <BsSearch/><InputCadastro
                    onFocus={true}
                    name="query" value={query}
                    onChange={handleOnChangeQuery}
                    placeholder=" Buscar"
                 
                    />
                   
                </Typography>

                
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: '60vw' }} aria-label="customized table">
                <TableHead>
          <TableRow>
            <StyledTableCell>Equipamento</StyledTableCell>
            <StyledTableCell align="center">Status equipamento</StyledTableCell>
            <StyledTableCell align="center">Bateria</StyledTableCell>
            <StyledTableCell align="center">Status Bateria</StyledTableCell>
            <StyledTableCell align="center">Carga bateria</StyledTableCell>
            <StyledTableCell align="center">Atualizar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inativos.map(inativo => {
               if (query.length == 0) {
                return (
            <StyledTableRow key={inativo?.id}>
              <StyledTableCell component="th" scope="inativo">
                {inativo?.numero_serie_equipamento}
              </StyledTableCell>
              <StyledTableCell align="center">{inativo?.equipamento_status}</StyledTableCell>
              <StyledTableCell align="center">{inativo?.numero_serie_bateria}</StyledTableCell>
              <StyledTableCell align="center">{inativo?.bateria_status}</StyledTableCell>
              <StyledTableCell align="center">{inativo?.carga}%</StyledTableCell>
              <StyledTableCell align="center"> 
                           
                           <button onClick={() => atualizarManu(inativo)}
                             style={{
                               width: "30px",
                               height: '30px',
                               borderRadius:'100px',
                               fontWeight: 'bold',
                               color: '#052d6a',
                               borderColor:'#052d6a'
                             
                              
                             }}>
                             <BsFillCapslockFill /></button></StyledTableCell>
            </StyledTableRow>)}
else {
  if (inativo?.numero_serie_equipamento.includes(query)
    || (inativo?.razao_social != null && inativo?.razao_social.toLowerCase().includes(query.toLowerCase()))
  ) {
    return ( <StyledTableRow key={inativo?.id}>
      <StyledTableCell component="th" scope="inativo">
        {inativo?.numero_serie_equipamento}
      </StyledTableCell>
      <StyledTableCell align="center">{inativo?.equipamento_status}</StyledTableCell>
      <StyledTableCell align="center">{inativo?.numero_serie_bateria}</StyledTableCell>
      <StyledTableCell align="center">{inativo?.bateria_status}</StyledTableCell>
      <StyledTableCell align="center">{inativo?.carga}%</StyledTableCell>
      <StyledTableCell align="center"> 
                   
                   <button onClick={() => atualizarManu(inativo)}
                     style={{
                       width: "30px",
                       height: '30px',
                       borderRadius:'100px',
                       fontWeight: 'bold',
                       color: '#052d6a',
                       borderColor:'#052d6a'
                     
                      
                     }}>
                     <BsFillCapslockFill /></button></StyledTableCell>
    </StyledTableRow>)}}

          })}

        </TableBody>

                   </Table>
                </TableContainer>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card >
  );
}

export default AparelhoDesktop;
