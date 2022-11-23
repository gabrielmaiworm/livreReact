import { FormControl, Input, InputLabel, Select, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { FaCamera } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

import getUploadParams from "../../config/configUpload";
import  { apiget, apipost } from "../../Services/api";
import "../../style/File.css";

const maxSize = 10 * 1024 * 1024;





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

const CadastrarEquipamento = () => {
  const [foto64, setFoto64] = useState('')

  // setFoto64 = ({ meta, jpg, xhr ,png}, status) => {
  //   console.log(status, meta,png, jpg);
  //   if (status === "done") {
  //     foto64 = JSON.parse(xhr.response);
  //   }
  // };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64)
    setFoto64(base64);
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

  const [nome, setNome] = useState("");
  const [equipamento_status, setEquipamento_status] = useState("");
  const [numero_serie_equipamento, setNumero_serie_equipamento] = useState("");
  const [status, setStatus] = useState([]);
  //const [foto64 , setFoto64] = useState('');

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
     const resp = await apiget('/status')
      setStatus(resp);
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const equipamento = {
      nome,
      equipamento_status,
      numero_serie_equipamento,
      foto64
    };
    if (!equipamento.nome)
      alert("Erro: preencha o nome do equipamento")
    else if (!equipamento.equipamento_status)
      alert("Erro: preencha o status do equipamento")
    else if (!equipamento.numero_serie_equipamento)
      alert("Erro: preencha o número de série do equipamento")

    else {
      apipost('/equipamento', equipamento).then((res) => {
        alert("Equipamento Móvel Cadastrado Com Sucesso!");
        navigate('/equipamentos');
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
        > Cadastrar equipamento
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
            <FormControl variant="standard" sx={{marginTop:'1%'}}>
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
                value={equipamento_status}
                onChange={(e) => setEquipamento_status(e.target.value)}
              >
                <option value="" disabled hidden>
                  Status
                </option>
                {status.map((select) => (
                  <option key={select?.id} value={select?.tipo}>
                    {select?.tipo}
                  </option>
                ))}
              </select>
            </FormControl>
          </Box>

          <Box marginTop='2%'>
            <FormControl style={{ marginRight: '52%' }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                }}
                align='left'
                fontFamily='Poppins'
              >Nº de série
              </InputLabel>
              <Input
                placeholder="Nº de série"
                type="number"
                value={numero_serie_equipamento}
                onChange={(e) => setNumero_serie_equipamento(e.target.value)}
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
            <FormControl style={{
              marginTop: '-1%',
            }}>
              <Typography
                sx={{
                  marginLeft: '-43vw',
                  marginRight: '-14vw'
                }}>
                <FaCamera color='#052D6A' size={'36'}
                  style={{
                    marginRight: '44%',
                    marginBottom: '-55px'
                  }} />
                <Stack style={{
                  // marginTop: '-3%',
                  // marginLeft: '-13%',
                  // width: '68%'
                }}>
                  {/* <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={setFoto64}
                    accept="image/*"
                    maxFiles={1}
                    multiple={false}
                    inputContent="Anexar foto do equipamento"
                    maxSizeBytes={maxSize}
                    onDrop={handleOnDrop} /> */}
                    
                      <Typography>
                    <Box sx={{ marginBottom: '30px' }}>
                       
                        <Input sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#062e61',
                                borderWidth: 'medium',
                            }
                        }
                    }}
                    className="inputRounded"
                    id="foto"
                   
                    variant="outlined"
                         type="file" 
                         onChange = {(e) => {uploadImage(e);}} />
                    </Box>
                    <img src={foto64} alt="foto" width="100px" height="100px"/>
                </Typography> 


                </Stack>
              </Typography>
            </FormControl>
          </Box>

          <Box marginTop={'2%'}>
            <FormControl style={{
              marginBottom: '2%',
              marginRight: '50%',
            }}>
              <Link to="/Cadastrar-equipamento"
                style={{ textDecoration: "none" }}>
                <button style={{
                  backgroundColor: '#052D6A',
                  width: '459px',
                  height: '54px',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '23px',
                  fontWeight: '600',
                  borderRadius:'5px'
                }}
                  onClick={handleSubmit}>
                  Confirmar
                </button>
              </Link>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CadastrarEquipamento;