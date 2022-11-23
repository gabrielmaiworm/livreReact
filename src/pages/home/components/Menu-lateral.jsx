import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { AiFillSetting, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Row, Col, Container } from "react-bootstrap";
import { ButtonMenu, IconCard, MenuLateral, MenuLateral2 } from "../HomeUsuario.style";
import logoAzul from '../../../images/LogoAzul.jpg';
import { FaAccessibleIcon } from "react-icons/fa";
import { BsDot, BsJustify, BsTextIndentRight, BsTextIndentLeft, BsFillCapslockFill } from "react-icons/bs";
import { Alert, Box } from "@mui/material";
import { Routes } from "../../../App";
import { FaRegBuilding } from "react-icons/fa";

export const MenuLivre = () => {
    const [openGestaoEquip, setOpenGestaoEquip] = useState(false);
    const [openCadastroEquip, setOpenCadastroEquip] = useState(false);
    const [openCadastroPerfil, setOpenCadastroPerfil] = useState(false);
    const [openMenuKit, setOponMenuKit] = useState(true);
    const [modal, setModal] = useState(false);
    const [gestao, setGestao] = useState(false);
    const [cadastro, setCadastro] = useState(false);
    const [equipamentos, setEquipamentos] = useState(false);

    const openGestao = () => {
        if (openGestaoEquip) {
            setOpenGestaoEquip(false)
        } else {
            setOpenGestaoEquip(true)
        }
    }

    const openPerfil = () => {
        if (openCadastroPerfil) {
            setOpenCadastroPerfil(false)
        } else {
            setOpenCadastroPerfil(true)
        }


    }
    const openEquip = () => {
        if (openCadastroEquip) {
            setOpenCadastroEquip(false)
        } else {
            setOpenCadastroEquip(true)
        }
    }

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/")
    }
    const openMenu = () => {
        if (openMenuKit) {
            setOponMenuKit(false)
        } else {
            setOponMenuKit(true)
        }
    }

    const openMenuGestao = () => {

        if (gestao) {
            setGestao(false)
        } else {

            setGestao(true)
            setCadastro(false)
            setEquipamentos(false)
        }
    }


    const openMenuCadastro = () => {
        if (cadastro) {
            setCadastro(false)
        } else {
            setCadastro(true)
            setGestao(false)
            setEquipamentos(false)
        }
    }

    const openMenuEquipamentos = () => {
        if (equipamentos) {
            setEquipamentos(false)
        } else {
            setEquipamentos(true)
            setGestao(false)
            setCadastro(false)
        }
    }



    return (
        <>
            {openMenuKit ? (
                <>
                    <MenuLateral style={{ backgroundColor: '#052d6a' }} >

                        <Col>
                            <Row><BsTextIndentLeft onClick={openMenu} style={{ paddingTop: "5vh", paddingBottom: "10vh", color: '#fff' }} /></Row>
                            <IconCard>
                                <Row ><IconButton onClick={openMenuGestao} style={{ color: '#fff' }}><AiFillSetting /></IconButton></Row><Typography fontSize={'0.6rem'}>Gestão</Typography>
                            </IconCard>
                            <IconCard>
                                <Row ><IconButton onClick={openMenuCadastro} style={{ color: '#fff' }}><AiOutlineUsergroupAdd /></IconButton></Row><Typography fontSize={'0.6rem'}>Cadastro</Typography>
                            </IconCard>
                            <IconCard>
                                <Row ><IconButton onClick={openMenuEquipamentos} style={{ color: '#fff' }}><FaAccessibleIcon /></IconButton></Row><Typography fontSize={'0.6rem'}>Equipamentos</Typography>
                            </IconCard>
                            <IconCard>
                                <Row ><IconButton onClick={() => { navigate("/home"); alert('Estamos trabalhando nesta funcionalidade! \n Em breve estará disponível!') }} ><FaRegBuilding style={{ color: '#fff', marginRight: '5px' }} /></IconButton></Row><Typography fontSize={'0.6rem'}>Gestão de tarifas</Typography>
                            </IconCard>

                        </Col>

                    </MenuLateral>
                    {gestao &&
                        <Col style={{ width: '0vw', marginTop: '23vh', marginLeft: '0vw', position: 'relative' }}>

                            <Box style={{ padding: '15px', }}>
                                {/* <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/geolocalizacao')}>Geolocalização</ButtonMenu>
                                </Box> */}
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/solicita-equipamento')}>Solicitar Equipamento</ButtonMenu>
                                </Box>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/lista-espera')}>Adicionar a lista de espera</ButtonMenu>
                                </Box>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/devolver-equipamento')}>Devolver Equipamento</ButtonMenu>
                                </Box>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/atualizar-equipamento')}>Atualizar Equipamento</ButtonMenu>
                                </Box>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/aparelhos')}>Performance</ButtonMenu>
                                </Box>
                            </Box>

                        </Col>
                    }
                    {cadastro &&
                        <Col style={{ width: '0vw', marginTop: '23vh', marginLeft: '0vw', position: 'relative' }}>

                            <Box style={{ padding: '15px', }}>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/cadastrar-usuario')}>Cadastro de usuário</ButtonMenu>
                                </Box>
                                {/* <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/')}>Cadastro de operador</ButtonMenu>
                                </Box>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/')}>Cadastro de parceiros</ButtonMenu>
                                </Box> */}
                            </Box>

                        </Col>
                    }

                    {equipamentos &&
                        <Col style={{ width: '0vw', marginTop: '23vh', marginLeft: '0vw', position: 'relative' }}>

                            <Box style={{ padding: '15px', }}>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/cadastrar-equipamento')}>Cadastrar equipamento</ButtonMenu>
                                </Box>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/cadastrar-bateria')}>Cadastrar bateria</ButtonMenu>
                                </Box>
                                <Box style={{ padding: '15px', }}>
                                    <ButtonMenu onClick={() => navigate('/estoque')}>Montar/Desmontar conjunto</ButtonMenu>
                                </Box>
                            </Box>

                        </Col>
                    }
                </>

            ) : (
                <MenuLateral2 style={{ backgroundColor: '#052d6a' }} >
                    <Col>
                        <Row><BsTextIndentRight onClick={openMenu} style={{ paddingTop: "5vh", paddingBottom: "10vh", color: '#fff' }} /></Row>

                        <IconCard>
                            <Row ><IconButton onClick={openMenuGestao} style={{ color: '#fff' }}><AiFillSetting /></IconButton></Row><Typography fontSize={'0.6rem'}>Gestão</Typography>
                        </IconCard>

                        <IconCard>
                            <Row ><IconButton onClick={openMenuCadastro} style={{ color: '#fff' }}><AiOutlineUsergroupAdd /></IconButton></Row><Typography fontSize={'0.6rem'}>Cadastro</Typography>
                        </IconCard>

                        <IconCard>
                            <Row ><IconButton onClick={openMenuEquipamentos} style={{ color: '#fff' }}><FaAccessibleIcon /></IconButton></Row><Typography fontSize={'0.6rem'}>Equipamentos</Typography>
                        </IconCard>

                        <IconCard>
                            <Row ><IconButton onClick={() => { navigate("/home"); alert('Estamos trabalhando nesta funcionalidade! \n Em breve estará disponível!') }} ><FaRegBuilding style={{ color: '#fff', marginRight: '5px' }} /></IconButton></Row><Typography fontSize={'0.6rem'}>Gestão de tarifas</Typography>
                        </IconCard>

                    </Col>
                </MenuLateral2>)}
        </>
    );
}
