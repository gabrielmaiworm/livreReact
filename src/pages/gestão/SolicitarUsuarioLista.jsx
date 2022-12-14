import {
  FormControl,
  Input,
  InputLabel
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cpf } from 'cpf-cnpj-validator';
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import { apiget, apipost } from "../../Services/api";
import "../../style/File.css";
import getUploadParams from "../../config/configUpload";
import { Stack } from "react-bootstrap";

const maxSize = 10 * 1024 * 1024;
var foto64 = "";

const setFoto64 = ({ meta, jpg, xhr }, status) => {
  console.log(status, meta, jpg);
  if (status === "done") {
    foto64 = JSON.parse(xhr.response);
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


const SolicitarUsuarioLista = () => {

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

  const { documento, setDocumento } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const valorInicial = documento ? '' : null;
  // const [documento, setDocumento] = useState("");
  const [numero_serie_equipamento, setNumero_serie_equipamento] = useState("");
  const [numero_serie_bateria, setNumero_serie_bateria] = useState("");
  const [conjunto, setConjunto] = useState([]);
  const [nome, setNome] = useState(valorInicial);
  const [kit, setKit] = useState("");

  const handleOnHover = (result) => {
  };

  const handleOnFocus = () => {
  };

  const handleOnSearchEquipamento = (string, results) => {
    setNumero_serie_equipamento(string);
  };

  const handleOnSelectEquipamento = (item) => {
    setKit(item.kit)
    setNumero_serie_equipamento(item.numero_serie_equipamento);
    setNumero_serie_bateria(item.numero_serie_bateria)
  };

  const handleOnClearEquipamento = () => {
    setNumero_serie_equipamento('');
  };

  useEffect(() => {
    getUsuario()
  }, []);

  const getUsuario = async () => {
    const response = await apiget(`usuario?documento=${documento}`)
      setNome(response[0].nome);
    
  };

  useEffect(() => {
    getKit();
  }, []);


  const getKit = async () => {
    const kit = await apiget('/estoque-completo')
    console.log(kit, 'kit');
    setConjunto(kit);
  };

  const navigate = useNavigate();

  const Submit = async (ev) => {
    ev.preventDefault();
    const solicitar = {
      documento,
      numero_serie_equipamento,
      numero_serie_bateria,
      kit
    };
    if (!solicitar.documento) alert("Erro: preencha o n??mero de documento");
    else if (!solicitar.numero_serie_equipamento)
      alert("Erro: preencha o n??mero de s??rie do equipamento");
    else if (!solicitar.numero_serie_bateria)
      alert("Erro: preencha o n??mero de s??rie da bateria");
    else {
      try {
        const solicitacao = await apipost("/solicitacao", solicitar);
        alert("Solicita????o registrada com Sucesso!");
        window.location.reload();
        
      } catch (response) {
        alert(response.error);
      }

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
        > Solicitar equipamento
        </Typography>
        <Box sx={{
          border: '1px solid',
          borderRadius: '5px',
          borderColor: '#7396CA',
          marginRight: '2%',
          marginLeft: '2%',
          minHeight: '500px',
          overflowY: "scroll",
        }}>
          <Box marginTop='2%'>
            <FormControl variant="standard" sx={{
              marginTop: '1%',
              marginRight: '13%',
            }}>
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
              >CPF
              </InputLabel>
              <Input
                disabled
                placeholder="CPF"
                value={documento}
                onChange={(e) => setDocumento(cpf.format(e.target.value))}
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
              >Nome
              </InputLabel>
              <Input
                placeholder="Nome"
                disabled
                {...register("nome")}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
            <FormControl style={{
              marginRight: '13%',
              marginTop: '2%'
            }}>
              <Typography sx={{
                marginLeft: '2%',
                marginBottom: '2%',
                width: "458px",
                fontSize: '16px',
                fontWeight: "bold",
                color: "#373737",
              }} align='left'>
                <InputLabel
                  shrink htmlFor="bootstrap-input"
                  sx={{
                    fontSize: '19px',
                    fontWeight: "bold",
                    color: "#373737",
                    // marginLeft: '2%',
                    marginTop: '-6%',
                  }}
                  fontFamily='Poppins'>
                  N?? de s??rie do equipamento</InputLabel>
                <ReactSearchAutocomplete
                  placeholder="N??mero de s??rie equipamento"
                  items={conjunto}
                  fuseOptions={{ keys: ["numero_serie_equipamento"] }} // Search on both fields
                  resultStringKeyName="numero_serie_equipamento" // String to display in the results
                  onSearch={handleOnSearchEquipamento}
                  onHover={handleOnHover}
                  onSelect={handleOnSelectEquipamento}
                  onFocus={handleOnFocus}
                  onClear={handleOnClearEquipamento}
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
                  }} />
              </Typography>
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
              >N?? de s??rie da bateria
              </InputLabel>
              <Input
                placeholder="N?? de s??rie da bateria"
                type="number"
                disabled="disabled"
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
          </Box>

          <Box marginTop='2%'>
            <FormControl>
              <Typography
                sx={{
                  marginLeft: '-28vw',
                  marginRight: '-29vw'
                }}>
                <Stack>
                  <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={setFoto64}
                    accept="image/*"
                    maxFiles={1}
                    multiple={false}
                    inputContent="Anexar foto do pertence"
                    maxSizeBytes={maxSize}
                    onDrop={handleOnDrop} />
                </Stack>
              </Typography>
            </FormControl>
            <FormControl sx={{
              marginLeft: '25vw',
              marginRight: '-16vw'
            }}>
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
            </FormControl>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default SolicitarUsuarioLista;