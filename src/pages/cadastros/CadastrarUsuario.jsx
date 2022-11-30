import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FormControl, Input, InputLabel, Select, Stack, TextField,IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { cpf } from 'cpf-cnpj-validator';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Link, useNavigate } from "react-router-dom";
import api, { apiget, apipost } from "../../Services/api";
import { InputCadastro } from "../../style/Cadastro";
import "../../style/File.css";
import getUploadParams from "../../config/configUpload";
import Dropzone from "react-dropzone-uploader";
import { maxHeight } from "@mui/system";
import { IoPersonCircleSharp } from 'react-icons/io5';
import { AiOutlineFileText } from 'react-icons/ai';
import { MultilineChart } from "@mui/icons-material";

const maxSize = 10 * 1024 * 1024;
var foto_documento64 = "";
var foto_com_documento64 = "";

const setFoto_documento64 = ({ meta, jpg, xhr }, status) => {
  console.log(status, meta, jpg);
  if (status === "done") {
    foto_documento64 = JSON.parse(xhr.response);
  }
};

const setFoto_com_documento64 = ({ meta, file, xhr }, status) => {
  console.log(status, meta, file);
  if (status === "done") {
    foto_com_documento64 = JSON.parse(xhr.response);
  }
};

const handleOnDrop = (files, reject) => {
  console.log(files);
  if (reject && reject.length > 0) {
    const currentReject = reject[0];
    const currentRejectSize = currentReject.size;
    if (currentRejectSize > maxSize) {
      alert("Arquivo muito grande");
    }
  }

  if (files && files.length > 0) {
    const currentFiles = reject[0];
    const currentFilesSize = currentFiles.size;
    if (currentFilesSize > maxSize) {
      alert("Arquivo muito grande");
    }
  }
};

const CadastrarUsuario = () => {

  const { register, setValue, setFocus } = useForm();

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`http://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json()).then(data => {
        setValue('logradouro', data.logradouro);
        setLogradouro(data.logradouro);
        setValue('bairro', data.bairro);
        setBairro(data.bairro);
        setValue('cidade', data.localidade);
        setCidade(data.localidade);
        setValue('estado', data.uf);
        setEstado(data.uf);
        setFocus('numero');
      })
  }


  const [lesaoSelecionada, setLesaoSelecionada] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const response = await apiget('/lesao')
      setLesaoSelecionada(response);
    
  };

  const [valido, setValido] = useState(false);

  const [foto_documento64, setFoto_documento64] = useState("");
  const [foto_com_documento64, setFoto_com_documento64] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [documento, setDocumento] = useState("");
  const [data_de_nascicmento, setData_de_nascicmento] = useState("");
  const [situacao_lesao, setSituacao_lesao] = useState("");
  const [nivel_lesao, setNivel_lesao] = useState("");
  const [detalhe_lesao, setDetalhe_lesao] = useState("");
  const [senha, setSenha] = useState("@K17l1vr3");
  const [data, setData] = React.useState(null);

  
  const fotoPerfil = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64)
    setFoto_documento64(base64);
    ;
  }

  const fotoDocumento = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64)
    setFoto_com_documento64(base64);
    ;
  }

  const convertBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);


      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

    });

  };

  const navigate = useNavigate();

  const cadastrar = async (e) => {
    e.preventDefault();
    const usuario = {
      nome,
      sobrenome,
      email,
      documento,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      telefone,
      data_de_nascicmento,
      situacao_lesao,
      nivel_lesao,
      detalhe_lesao,
      foto_documento64,
      foto_com_documento64,
      senha
    };

    console.log(usuario);
    if (!cpf.isValid(usuario.documento)) alert("Erro: CPF inválido");
    if (!usuario.nome) alert("Erro: preencha o seu nome");
    else if (!usuario.sobrenome) alert("Erro: preencha o seu sobrenome");
    else if (!usuario.email) alert("Erro: preencha o seu email");
    else if (!usuario.documento) alert("Erro: preencha o seu documento");
    else if (!usuario.telefone) alert("Erro: preencha o seu telefone");
    else if (!usuario.data_de_nascicmento) alert("Erro: preencha a sua data de nascimento");


    else {
      try {
        await apipost("/usuario", usuario)
        alert("Usuário Cadastrado Com Sucesso!");
        navigate(`/perfis`);
      } catch (error) {
        
        return alert((error) ||
          (error.response))
      }

     
    
      
    }
  }

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setValido(true);
    } else {
      setValido(false);
      alert('Insira um email válido');
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
        > Cadastrar usuário
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
              >Nome
              </InputLabel>
              <Input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value.replace(/[^a-z]/gi, ' '))}
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
            <FormControl>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                }}
                align='left'
                fontFamily='Poppins'
              >Sobrenome
              </InputLabel>
              <Input
                placeholder="Sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value.replace(/[^a-z]/gi, ' '))}
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
          </Box>

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
              >E-mail
              </InputLabel>
              <Input
                onBlur={validateEmail}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <FormControl >
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                }}
                align='left'
                fontFamily='Poppins'
              >Telefone
              </InputLabel>
              <InputMask
                placeholder="(xx)xxxxxxxxxx"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                mask='(99) 99999-9999'
              >{(inputProps: Props & TextFieldProps) => (
                <Input style={{
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
                  {...inputProps}
                />
              )}</InputMask>
            </FormControl>
          </Box>

          <Box marginTop='2%' marginRight='51%'>
            <FormControl style={{ marginRight: '3.5%', }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '-8px'
                }}
                fontFamily='Poppins'
              >CPF
              </InputLabel>
              <Input inputProps={{ maxLength: 11 }}
                id="documento"
                placeholder="_ _ _._ _ _._ _ _-_ _"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                onBlur={(e) => {
                  if (cpf.isValid(e.target.value)) { setDocumento(cpf.format(e.target.value)) }
                  else { alert("CPF invalido") }
                }}
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
                  width: "218px",
                  marginLeft: "2%",
                  padding: '3px'
                }} fontFamily='Poppins' />
            </FormControl>
            <FormControl>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '-8px'
                }}
                align='left'
                fontFamily='Poppins'
              >Data de Nascimento
              </InputLabel>
              <InputMask
                value={data_de_nascicmento}
                onChange={(e) => setData_de_nascicmento(e.target.value)}
                mask='99/99/9999'
                placeholder="_ _/_ _/_ _ _ _"
              >{(inputProps: Props & InputProps) => (
                <Input sx={{
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
                  width: "218px",
                  marginLeft: "2%",
                  padding: '3px',
                }} fontFamily='Poppins'
                  {...inputProps}
                />
              )}</InputMask>
            </FormControl>
          </Box>

          <Typography
            sx={{
              marginTop: '2%',
              marginBottom: '3%',
              marginRight: '78%',
              color: '#052D6A',
              fontSize: '28px',
              fontWeight: '400'
            }}>Endereço</Typography>
          <Box marginTop='2%'>
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
                >CEP
                </InputLabel>
                <InputMask
                  placeholder="CEP"
                  mask='99.999-999'
                  id='cep'
                  {...register('cep')}
                  onBlur={checkCEP}
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                >{(inputProps: Props & TextFieldProps) => (
                  <Input style={{
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
                    {...inputProps}
                  />
                )}</InputMask>
              </FormControl>
              <FormControl>
                <InputLabel
                  shrink htmlFor="bootstrap-input"
                  sx={{
                    fontSize: '19px',
                    fontWeight: "bold",
                    color: "#373737",
                  }}
                  align='left'
                  fontFamily='Poppins'
                >Logradouro
                </InputLabel>
                <Input
                  {...register("logradouro")}
                  id="logradouro"
                  placeholder="Logradouro"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value.replace(/[^a-z]/gi, ' '))}
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
            </Box>
          </Box>

          <Box marginTop='2%'>
            <FormControl style={{ marginRight: '2%' }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '-6px'
                }}
                fontFamily='Poppins'
              >Número
              </InputLabel>
              <Input
                placeholder="Nº"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
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
                  width: "218px",
                  marginLeft: "2%",
                  padding: '3px'
                }} fontFamily='Poppins' />
            </FormControl>
            <FormControl style={{ marginRight: '13%' }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '-6px'
                }}
                align='left'
                fontFamily='Poppins'
              >Complemento
              </InputLabel>
              <Input
                placeholder="Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                sx={{
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
                  width: "218px",
                  marginLeft: "2%",
                  padding: '3px',
                }} fontFamily='Poppins'
              />
            </FormControl>
            <FormControl >
              <InputLabel
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                }}
                shrink htmlFor="bootstrap-input"
                align='left'
                fontFamily='Poppins'
              >Bairro
              </InputLabel>
              <Input
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
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
              />
            </FormControl>
          </Box>

          <Box marginTop='2%' marginRight='52%'>
            <FormControl style={{ marginRight: '3.5%', }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '-8px'
                }}
                fontFamily='Poppins'
              >Cidade
              </InputLabel>
              <Input
                {...register("cidade")}
                onBlur={checkCEP}
                id="cidade"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value.replace(/[^a-z]/gi, ' '))}
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
                  width: "300px",
                  marginLeft: "2%",
                  padding: '3px'
                }} fontFamily='Poppins' />
            </FormControl>
            <FormControl>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '-8px'
                }}
                align='left'
                fontFamily='Poppins'
              >Estado
              </InputLabel>
              <Input
                {...register("estado")}
                onBlur={checkCEP}
                placeholder="Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value.replace(/[^a-z]/gi, ' '))}
                sx={{
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
                  width: "140px",
                  marginLeft: "2%",
                  padding: '3px',
                }} fontFamily='Poppins'
              />
            </FormControl>
          </Box>

          <Box marginTop='2%'>
            <FormControl style={{
              // marginRight: '40vw',
            }}>
              <Typography
                sx={{
                  marginLeft: '-61vw',
                  color: '#052D6A',
                  fontSize: '28px',
                  fontWeight: '400'
                }}> Foto perfil
              </Typography>
            </FormControl>
            <FormControl style={{
              // marginRight: '19%',
            }}>
              <Typography
                sx={{
                  marginRight: '-25vw',
                  color: '#052D6A',
                  fontSize: '28px',
                  fontWeight: '400'
                }}> Foto documento
              </Typography>
            </FormControl>
          </Box>


          <Box marginTop='2%'>
            <FormControl>
              <Typography sx={{
                marginLeft: '-48vw',
                marginRight: '-15vw'
              }}>
                <Box>
                  <label htmlFor="foto">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      style={{
                        marginRight: '23vw',
                        marginBottom: '-4vh'
                      }}>
                      <Input sx={{
                        display: 'none',
                      }}
                        id="foto"
                        variant="outlined"
                        type="file"
                        onChange={(e) => { fotoPerfil(e); }} />
                      <IoPersonCircleSharp color='#052D6A' size={'36'} />
                    </IconButton>
                    <Typography
                      style={{
                        marginTop: '-4vh',
                        marginLeft: '13.5vw',
                        backgroundColor: 'white',
                        width: '459px',
                        height: '54px',
                        color: '#052D6A',
                        fontFamily: 'Poppins',
                        fontSize: '20px',
                        fontWeight: '600',
                        borderRadius: '5px',
                        border: '2px solid',
                        borderColor: '#052D6A',
                        paddingTop: '15px'
                      }}>Anexar foto do perfil</Typography>
                  </label>
                </Box>
                <img style={{
                  marginTop: '2vh',
                  marginRight: '4vw'
                }}
                  src={foto_documento64}
                  alt="foto"
                  width="80vw"
                  height="80vh" />
              </Typography>
            </FormControl>
            <FormControl>
              <Typography sx={{
                marginLeft: '-8vw',
                marginRight: '-65vw'
              }}>
                <Box>
                  <label htmlFor="fotoDocumento">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      style={{
                        marginRight: '38vw',
                        marginBottom: '-4vh'
                      }}>
                      <Input sx={{
                        display: 'none',
                      }}
                        id="fotoDocumento"
                        variant="outlined"
                        type="file"
                        onChange={(e) => { fotoDocumento(e); }} />
                      <AiOutlineFileText color='#052D6A' size={'36'} />
                    </IconButton>
                    <Typography
                      style={{
                        marginTop: '-4vh',
                        marginLeft: '13.5vw',
                        backgroundColor: 'white',
                        width: '459px',
                        height: '54px',
                        color: '#052D6A',
                        fontFamily: 'Poppins',
                        fontSize: '20px',
                        fontWeight: '600',
                        borderRadius: '5px',
                        border: '2px solid',
                        borderColor: '#052D6A',
                        paddingTop: '15px'
                      }}>Anexar foto com documento</Typography>
                  </label>
                </Box>
                <img style={{
                  marginTop: '2vh',
                  marginRight: '14vw'
                }}
                  src={foto_com_documento64}
                  alt="foto"
                  width="80vw"
                  height="80vh" />
              </Typography>
            </FormControl>
          </Box>

          <Typography
            sx={{
              marginTop: '5%',
              marginBottom: '3%',
              marginLeft: '-79%',
              color: '#052D6A',
              fontSize: '28px',
              fontWeight: '400'
            }}
          > Situação
          </Typography>

          <Box marginTop='2%' marginRight='50%'>
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
              >Nível da lesão
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
                id="outlined-select-lesao"
                value={nivel_lesao}
                onChange={(e) => setNivel_lesao(e.target.value)}
              >
                <option value="" disabled hidden>
                  Nível da lesão
                </option>
                {lesaoSelecionada.map((option) => (
                  <option style={{ width: "370px" }} key={option.id} value={option.tipo}>
                    {option.tipo}
                  </option>
                ))}
              </select>
            </FormControl>
          </Box>

          <Box marginLeft={'53%'}
            marginTop={'-8.2%'}
          >
            <RadioGroup
              aria-labelledby="situacao"
              defaultValue=""
              name="situacao"
            >
              <Box>
                <FormControlLabel
                  value="permanente"
                  control={<Radio sx={{
                    color: '#062e61',
                    '&.Mui-checked': {
                      color: '#062e61',
                    },
                  }} style={{ maskBorderWidth: '300px' }}
                    onClick={(e) => setSituacao_lesao(e.target.value)} />}
                  label="Permanente"
                  style={{
                    color: 'black',
                    fontSize: '21px',
                    fontWeight: "bold",
                    color: "#373737",
                    backgroundColor: '#EBF1FB',
                    width: '419px'
                  }}
                />
              </Box>
              <Box>
                <FormControlLabel
                  value="temporaria"
                  control={<Radio sx={{
                    color: '#062e61',
                    '&.Mui-checked': {
                      color: '#062e61',
                    }
                  }} onClick={(e) => setSituacao_lesao(e.target.value)} />}
                  label="Temporária"
                  style={{
                    color: 'black',
                    fontSize: '21px',
                    fontWeight: "bold",
                    color: "#373737",
                    width: '419px'
                  }}
                />
              </Box>
            </RadioGroup>
          </Box>

          <Box marginTop={'2%'}>
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
              >Detalhes da lesão
              </InputLabel>
              <Input
                id="detalhes lesão"
                multiline
                placeholder='Detalhes da lesão'
                minRows={3}
                value={detalhe_lesao}
                onChange={(e) => setDetalhe_lesao(e.target.value)}
                sx={{
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
                  width: "459px",
                  marginLeft: "2%",
                  padding: '3px',
                }} fontFamily='Poppins'
              />
            </FormControl>
            <FormControl style={{ marginRight: '-2%', marginTop: '4%' }}>
              <Link to="/Cadastrar-usuario"
                style={{ textDecoration: "none" }}>
                <button style={{
                  backgroundColor: '#052D6A',
                  width: '459px',
                  height: '54px',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '23px',
                  fontWeight: '600'
                }}
                  onClick={cadastrar}>
                  Cadastrar
                </button>
              </Link>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};


export default CadastrarUsuario;