import {
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  InputLabel
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import Dropzone from "react-dropzone-uploader";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import "../../style/File.css";
import getUploadParams from "../../config/configUpload";
import { apiget, apiput } from "../../Services/api";
import logo from '../../images/Logo.png'
import { cpf } from 'cpf-cnpj-validator';

const maxSize = 50 * 1024 * 1024;
var allowedMimes =
  "image/pjpeg, image/png, image/gif, image/webp, image/tiff, ";
allowedMimes += "image/tif, image/bmp, image/jpeg, image/jpg, ";
allowedMimes += "video/ogg, video/x-msvideo, video/mpeg, video/x-ms-wmv, ";
allowedMimes += "video/mp4, video/3gpp, video/x-ms-asf, video/webm, ";
allowedMimes += "video/x-ms-asf, video/x-ms-wm, video/x-ms-wmx, video/divx, ";
allowedMimes += "video/x-flv, video/quicktime, video/x-matroska, video/3gpp2";
var foto = "";

const setFoto = ({ meta, file, xhr }, status) => {
  console.log(status, meta, file);
  if (status === "done") {
    foto = JSON.parse(xhr.response);
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

const Devolver = () => {
  const [documento, setDocumento] = useState("");
  const [nome, setNome] = useState("");
  const [numero_serie_equipamento, setNumero_serie_equipamento] = useState("");
  const [numero_serie_bateria, setNumero_serie_bateria] = useState("");

  const [equip, setEquip] = useState("");
  const [foto64, setFoto64] = useState("");

  const [sugestao, setSugestao] = useState("");
  const [status, setStatus] = useState("");
  const [avaliacao, setAvaliacao] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  const { register, handleSubmit, setValue } = useForm();

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
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64)
    setFoto64(base64);
    ;
  }

  const onSubmit = (e) => {
    console.log(e);
  }

  const checkCPF = async (e) => {
    
    const cpf = e.target.value;
    try {
      const res = await apiget(`/usuario?documento=${cpf}`)

           setValue("nome", res[0].nome);
         
     } catch (erro) {
       alert("Erro ao localizar o cadastro");
     }
    try {
      const res = await apiget(`/solicitacao?documento=${documento}`)

        setValue('nome_equipamento', res[0].nome_equipamento);
        setValue('carga', res[0].carga);
        setEquip(res.data);
        setFoto64(equip[0]?.foto64);
      
    } catch (erro) {
      alert('N??o h?? loca????o associada a este equipamento')
    }
  }

  const labels = {
    0.5: "Horrivel",
    1: "Pessimo",
    1.5: "Ruim",
    2: "Um pouco ruim",
    2.5: "Ok",
    3: "Bom",
    3.5: "Muito Bom",
    4: "Otimo",
    4.5: "Excelente",
    5: "Perfeito",
  };

  const navigate = useNavigate();

  const Submit = async (ev) => {
    ev.preventDefault();
    const devolve = { documento, status, sugestao, avaliacao, foto };
    if (!devolve.documento) alert("Erro: preencha o n??mero de documento");
    else if (!devolve.status) alert("Erro: preencha as condi????es da devolu????o");
    else if (!devolve.avaliacao)
      alert("Erro: preencha o n??mero de estrelas conforme a sua avalia????o");
    // else if (!devolve.foto)
    //   alert("Erro: envie uma foto ou v??deo do equipamento");
    else {
      await apiput("/solicitacao", devolve).then((res) => {
        alert("Devolu????o registrada com Sucesso!");
        navigate("/gestao-equipamentos");
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
        > Devolver equipamento
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="CPF"
                  {...register("cpf")}
                  onBlur={checkCPF}
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
                  disabled
                  placeholder="Nome"
                  {...register("nome")}
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
          </form>

          <Box marginTop='2%'>
            <Typography
              sx={{
                marginBottom: '3%',
                marginRight: '58%',
                color: '#052D6A',
                fontSize: '28px',
                fontWeight: '400'
              }}>Informa????es do Equipamento</Typography>
          </Box>

          <Box marginTop='2%' marginRight='52%'>
            <FormControl style={{ marginRight: '3.5%' }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '-6px'
                }}
                fontFamily='Poppins'
              >Nome do equipamento
              </InputLabel>
              <Input
                placeholder="Nome do equipamento"
                disabled="disabled"
                {...register("nome_equipamento")}
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
            <FormControl
            // style={{ marginRight: '13%' }}
            >
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
              >Carga
              </InputLabel>
              <Input
                placeholder="Carga"
                disabled="disabled"
                {...register("carga")}
                sx={{
                  color: '#9F9F9F',
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      %
                    </InputAdornment>
                  ),
                  sx: { fontSize: 18, },
                }}
              />
            </FormControl>
            <FormControl>
              <Typography
                sx={{
                  marginLeft: '-3.2vw',
                  marginRight: '-65vw'
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
                        onChange={(e) => { uploadImage(e); }} />
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
                      }}>Anexar foto/v??deo do equipamento</Typography>
                  </label>
                </Box>
                <img style={{
                  marginTop: '2vh',
                  marginRight: '10vw'
                }}
                  src={foto64}
                  alt="foto"
                  width="80vw"
                  height="80vh" />
                {/* <Stack style={{
                  marginTop: '1%',
                  marginLeft: '7%',
                  width: '78%'
                }}>
                  <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={setFoto}
                    accept={allowedMimes}
                    maxFiles={1}
                    multiple={false}
                    inputContent="Anexar foto/video do equipamento"
                    maxSizeBytes={maxSize}
                    onDrop={handleOnDrop}
                  />
                </Stack> */}
              </Typography>
            </FormControl>
          </Box>

          <Box marginTop={'2%'}>
            <FormControl style={{
              marginRight: '13%',
              marginLeft: '2%'
            }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                }}
                align='left'
                fontFamily='Poppins'
              >Condi????es da devolu????o
              </InputLabel>
              <Input
                multiline
                placeholder='Condi????es da devolu????o'
                minRows={3}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
            <FormControl style={{
              marginRight: '3%'
            }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                }}
                align='left'
                fontFamily='Poppins'
              >Sugest??es
              </InputLabel>
              <Input
                multiline
                placeholder='Sugest??es'
                minRows={3}
                value={sugestao}
                onChange={(e) => setSugestao(e.target.value)}
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
          </Box>

          <Box marginRight={'52%'} marginBottom='1%' >
            {/* <FormControl style={{
              marginRight: '13%',
              marginLeft: '2%',
              margiTop: '1%'
            }}>
              <img
                width={'100vw'}
                height={'100vh'}
                src={logo}
              />
            </FormControl> */}
            <FormControl style={{
              marginLeft: '43.5vw',
              marginTop: '5vh'
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

export default Devolver;


// import {
//   FormControl,
//   Input,
//   InputAdornment,
//   IconButton,
//   InputLabel
// } from "@mui/material";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import React, { useState, useEffect } from "react";
// import { Stack } from "react-bootstrap";
// import Dropzone from "react-dropzone-uploader";
// import { useForm } from 'react-hook-form';
// import { useNavigate } from "react-router-dom";
// import "../../style/File.css";
// import getUploadParams from "../../config/configUpload";
// import { apiget, apiput } from "../../Services/api";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import logo from '../../images/Logo.png'
// import { cpf } from 'cpf-cnpj-validator';

// const maxSize = 50 * 1024 * 1024;
// var allowedMimes =
//   "image/pjpeg, image/png, image/gif, image/webp, image/tiff, ";
// allowedMimes += "image/tif, image/bmp, image/jpeg, image/jpg, ";
// allowedMimes += "video/ogg, video/x-msvideo, video/mpeg, video/x-ms-wmv, ";
// allowedMimes += "video/mp4, video/3gpp, video/x-ms-asf, video/webm, ";
// allowedMimes += "video/x-ms-asf, video/x-ms-wm, video/x-ms-wmx, video/divx, ";
// allowedMimes += "video/x-flv, video/quicktime, video/x-matroska, video/3gpp2";
// var foto = "";

// const setFoto = ({ meta, file, xhr }, status) => {
//   console.log(status, meta, file);
//   if (status === "done") {
//     foto = JSON.parse(xhr.response);
//   }
// };

// const handleOnDrop = (files, reject) => {
//   console.log(files);
//   if (reject && reject.length > 0) {
//     const currentReject = reject[0];
//     const currentRejectSize = currentReject.size;
//     if (currentRejectSize > maxSize) {
//       alert("Arquivo muito grande");
//     }
//   }

//   if (files && files.length > 0) {
//     const currentFiles = reject[0];
//     const currentFilesSize = currentFiles.size;
//     if (currentFilesSize > maxSize) {
//       alert("Arquivo muito grande");
//     }
//   }
// };

// const Devolver = () => {
//   const [documento, setDocumento] = useState("");
//   const [nome, setNome] = useState("");
//   const [numero_serie_equipamento, setNumero_serie_equipamento] = useState("");
//   const [numero_serie_bateria, setNumero_serie_bateria] = useState("");
//   const [usuario, setUsuario] = useState("");
//   const [usuarios, setUsuarios] = useState([]);
//   const [equip, setEquip] = useState("");
//   const [foto64, setFoto64] = useState("");
//   const [sugestao, setSugestao] = useState("");
//   const [status, setStatus] = useState("");
//   const [avaliacao, setAvaliacao] = React.useState(3);
//   const [hover, setHover] = React.useState(-1);
//   const { register, handleSubmit, setValue } = useForm();

//   const convertBase64 = (file) => {

//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);


//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };

//       fileReader.onerror = (error) => {
//         reject(error);
//       };

//     });

//   };
//   const getUsuario = async () => {
//     const response = await apiget('/usuario')
//        setUsuarios(response);
     
//    };
 
//    useEffect(() => {
//      getUsuario();
//    }, []);

//    const handleOnClearUsuario = () => {
//     setDocumento('');
//   };

//   const handleOnSearchUsuario = (string, results) => {
//     setUsuario(string);
//   };

//   const handleOnHover = (result) => {
//   };

//   const handleOnFocus = () => {
//   };

//   const handleOnSelectUsuario = (item) => {
//     setNome(item.nome);
//     setUsuario(item.documento);
//     setDocumento(item.documento);
//   };

//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     const base64 = await convertBase64(file);
//     console.log(base64)
//     setFoto64(base64);
//     ;
//   }

//   const onSubmit = (e) => {
//     console.log(e);
//   }

//   const checkCPF = async (e) => {
    
   

//       const res = await apiget(`/solicitacao?documento=${documento}`)

//         setValue('nome_equipamento', res[0].nome_equipamento);
//         setValue('carga', res[0].carga);
//         setEquip(res.data);
//         setFoto64(equip[0]?.foto64);

//   }

//   const labels = {
//     0.5: "Horrivel",
//     1: "Pessimo",
//     1.5: "Ruim",
//     2: "Um pouco ruim",
//     2.5: "Ok",
//     3: "Bom",
//     3.5: "Muito Bom",
//     4: "Otimo",
//     4.5: "Excelente",
//     5: "Perfeito",
//   };

//   const navigate = useNavigate();

//   const Submit = async (ev) => {
//     ev.preventDefault();
//     const devolve = { documento, status, sugestao, avaliacao, foto };
//     if (!devolve.documento) alert("Erro: preencha o n??mero de documento");
//     else if (!devolve.status) alert("Erro: preencha as condi????es da devolu????o");
//     else if (!devolve.avaliacao)
//       alert("Erro: preencha o n??mero de estrelas conforme a sua avalia????o");
//     // else if (!devolve.foto)
//     //   alert("Erro: envie uma foto ou v??deo do equipamento");
//     else {
//       await apiput("/solicitacao", devolve).then((res) => {
//         alert("Devolu????o registrada com Sucesso!");
//         navigate("/gestao-equipamentos");
//       });
//     }
//   };

//   return (
//     <>
//       <Box marginLeft='14%' marginTop='1%'>
//         <Typography
//           align='left'
//           marginLeft='2%'
//           component="div"
//           color="#052D6A"
//           fontWeight="600"
//           fontSize={28}
//           fontFamily='Poppins'
//         > Devolver equipamento
//         </Typography>
//         <Box sx={{
//           border: '1px solid',
//           borderRadius: '5px',
//           borderColor: '#7396CA',
//           marginRight: '2%',
//           marginLeft: '2%',
//           minHeight: '500px',
//           overflowY: "scroll",
//         }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Box marginTop='2%'>
//               <FormControl variant="standard" sx={{
//                 marginTop: '1%',
//                 marginRight: '13%',
//               }}>
//                 <Typography sx={{
//               width: '25vw',
//               fontSize: '15px',
//               fontWeight: "bold",
//               color: "#373737",
//               marginBottom: "2%",
//             }} align='left'>  CPF
//               <ReactSearchAutocomplete
//                 items={usuarios}
//                 fuseOptions={{ keys: ["documento"] }} // Search on both fields
//                 resultStringKeyName="documento" // String to display in the results
//                 onSearch={handleOnSearchUsuario}
//                 onHover={handleOnHover}
//                 onSelect={handleOnSelectUsuario}
//                 onFocus={handleOnFocus}
//                 onClear={handleOnClearUsuario}
//                 onBlur={checkCPF}
//                 placeholder="CPF"
//                 styling={{
//                   color: '#9F9F9F',
//                   fontSize: '18px',
//                   fontWeight: '500',
//                   backgroundColor: "#EBF1FB",
//                   borderRadius: "5px",
//                   border: "1px solid",
//                   borderBottomColor: "#1D4F9A",
//                   color: "#062e61",
//                   fontSize: "17px",
//                   iconColor: "black",
//                   lineColor: "black",
//                   placeholderColor: "white-smoke",
//                   clearIconMargin: "3px 8px 0 0",
//                   zIndex: 2,
//                 }} />
//                 </Typography>
//               </FormControl>
//               <FormControl variant="standard" sx={{ marginTop: '1%' }}>
//                 <InputLabel
//                   shrink htmlFor="bootstrap-input"
//                   sx={{
//                     fontSize: '19px',
//                     fontWeight: "bold",
//                     color: "#373737",
//                     marginLeft: '2%',
//                     marginTop: '-5%',
//                   }}
//                   fontFamily='Poppins'
//                 >Nome
//                 </InputLabel>
//                 <Input
//                   disabled
//                   placeholder="Nome"
//                   {...register("nome")}
//                   value={nome}
//                   style={{
//                     color: '#9F9F9F',
//                     fontSize: '18px',
//                     fontWeight: '500',
//                     backgroundColor: "#EBF1FB",
//                     borderTop: "none",
//                     borderLeft: "none",
//                     borderRight: "none",
//                     borderBottom: "1px solid",
//                     borderBottomColor: "#1D4F9A",
//                     borderRadius: "5px",
//                     marginBottom: "5%",
//                     height: "49.24px",
//                     width: "459px",
//                     marginLeft: "2%",
//                     padding: '3px'
//                   }} fontFamily='Poppins' />
//               </FormControl>
//             </Box>
//           </form>

//           <Box marginTop='2%'>
//             <Typography
//               sx={{
//                 marginBottom: '3%',
//                 marginRight: '58%',
//                 color: '#052D6A',
//                 fontSize: '28px',
//                 fontWeight: '400'
//               }}>Informa????es do Equipamento</Typography>
//           </Box>

//           <Box marginTop='2%' marginRight='52%'>
//             <FormControl style={{ marginRight: '3.5%' }}>
//               <InputLabel
//                 shrink htmlFor="bootstrap-input"
//                 sx={{
//                   fontSize: '19px',
//                   fontWeight: "bold",
//                   color: "#373737",
//                   marginLeft: '-6px'
//                 }}
//                 fontFamily='Poppins'
//               >Nome do equipamento
//               </InputLabel>
//               <Input
//                 placeholder="Nome do equipamento"
//                 disabled="disabled"
//                 {...register("nome_equipamento")}
//                 style={{
//                   color: '#9F9F9F',
//                   fontSize: '18px',
//                   fontWeight: '500',
//                   backgroundColor: "#EBF1FB",
//                   borderTop: "none",
//                   borderLeft: "none",
//                   borderRight: "none",
//                   borderBottom: "1px solid",
//                   borderBottomColor: "#1D4F9A",
//                   borderRadius: "5px",
//                   marginBottom: "5%",
//                   height: "49.24px",
//                   width: "300px",
//                   marginLeft: "2%",
//                   padding: '3px'
//                 }} fontFamily='Poppins' />
//             </FormControl>
//             <FormControl
//             // style={{ marginRight: '13%' }}
//             >
//               <InputLabel
//                 shrink htmlFor="bootstrap-input"
//                 sx={{
//                   fontSize: '19px',
//                   fontWeight: "bold",
//                   color: "#373737",
//                   marginLeft: '-8px'
//                 }}
//                 align='left'
//                 fontFamily='Poppins'
//               >Carga
//               </InputLabel>
//               <Input
//                 placeholder="Carga"
//                 disabled="disabled"
//                 {...register("carga")}
//                 sx={{
//                   color: '#9F9F9F',
//                   fontWeight: '500',
//                   backgroundColor: "#EBF1FB",
//                   borderTop: "none",
//                   borderLeft: "none",
//                   borderRight: "none",
//                   borderBottom: "1px solid",
//                   borderBottomColor: "#1D4F9A",
//                   borderRadius: "5px",
//                   marginBottom: "5%",
//                   height: "49.24px",
//                   width: "140px",
//                   marginLeft: "2%",
//                   padding: '3px',
//                 }} fontFamily='Poppins'
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment>
//                       %
//                     </InputAdornment>
//                   ),
//                   sx: { fontSize: 18, },
//                 }}
//               />
//             </FormControl>
//             <FormControl>
//               <Typography
//                 sx={{
//                   marginLeft: '-3.2vw',
//                   marginRight: '-65vw'
//                 }}>
//                 <Box>
//                   <label htmlFor="foto">
//                     <IconButton
//                       color="primary"
//                       aria-label="upload picture"
//                       component="span"
//                       style={{
//                         marginRight: '23vw',
//                         marginBottom: '-4vh'
//                       }}>
//                       <Input sx={{
//                         display: 'none',
//                       }}
//                         id="foto"
//                         variant="outlined"
//                         type="file"
//                         onChange={(e) => { uploadImage(e); }} />
//                     </IconButton>
//                     <Typography
//                       style={{
//                         marginTop: '-4vh',
//                         marginLeft: '13.5vw',
//                         backgroundColor: 'white',
//                         width: '459px',
//                         height: '54px',
//                         color: '#052D6A',
//                         fontFamily: 'Poppins',
//                         fontSize: '20px',
//                         fontWeight: '600',
//                         borderRadius: '5px',
//                         border: '2px solid',
//                         borderColor: '#052D6A',
//                         paddingTop: '15px'
//                       }}>Anexar foto/v??deo do equipamento</Typography>
//                   </label>
//                 </Box>
//                 <img style={{
//                   marginTop: '2vh',
//                   marginRight: '10vw'
//                 }}
//                   src={foto64}
//                   alt="foto"
//                   width="80vw"
//                   height="80vh" />
//                 {/* <Stack style={{
//                   marginTop: '1%',
//                   marginLeft: '7%',
//                   width: '78%'
//                 }}>
//                   <Dropzone
//                     getUploadParams={getUploadParams}
//                     onChangeStatus={setFoto}
//                     accept={allowedMimes}
//                     maxFiles={1}
//                     multiple={false}
//                     inputContent="Anexar foto/video do equipamento"
//                     maxSizeBytes={maxSize}
//                     onDrop={handleOnDrop}
//                   />
//                 </Stack> */}
//               </Typography>
//             </FormControl>
//           </Box>

//           <Box marginTop={'2%'}>
//             <FormControl style={{
//               marginRight: '13%',
//               marginLeft: '2%'
//             }}>
//               <InputLabel
//                 shrink htmlFor="bootstrap-input"
//                 sx={{
//                   fontSize: '19px',
//                   fontWeight: "bold",
//                   color: "#373737",
//                 }}
//                 align='left'
//                 fontFamily='Poppins'
//               >Condi????es da devolu????o
//               </InputLabel>
//               <Input
//                 multiline
//                 placeholder='Condi????es da devolu????o'
//                 minRows={3}
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 sx={{
//                   color: '#9F9F9F',
//                   fontSize: '18px',
//                   fontWeight: '500',
//                   backgroundColor: "#EBF1FB",
//                   borderTop: "none",
//                   borderLeft: "none",
//                   borderRight: "none",
//                   borderBottom: "1px solid",
//                   borderBottomColor: "#1D4F9A",
//                   borderRadius: "5px",
//                   marginBottom: "5%",
//                   width: "459px",
//                   marginLeft: "2%",
//                   padding: '3px',
//                 }} fontFamily='Poppins'
//               />
//             </FormControl>
//             <FormControl style={{
//               marginRight: '3%'
//             }}>
//               <InputLabel
//                 shrink htmlFor="bootstrap-input"
//                 sx={{
//                   fontSize: '19px',
//                   fontWeight: "bold",
//                   color: "#373737",
//                 }}
//                 align='left'
//                 fontFamily='Poppins'
//               >Sugest??es
//               </InputLabel>
//               <Input
//                 multiline
//                 placeholder='Sugest??es'
//                 minRows={3}
//                 value={sugestao}
//                 onChange={(e) => setSugestao(e.target.value)}
//                 sx={{
//                   color: '#9F9F9F',
//                   fontSize: '18px',
//                   fontWeight: '500',
//                   backgroundColor: "#EBF1FB",
//                   borderTop: "none",
//                   borderLeft: "none",
//                   borderRight: "none",
//                   borderBottom: "1px solid",
//                   borderBottomColor: "#1D4F9A",
//                   borderRadius: "5px",
//                   marginBottom: "5%",
//                   width: "459px",
//                   marginLeft: "2%",
//                   padding: '3px',
//                 }} fontFamily='Poppins'
//               />
//             </FormControl>
//           </Box>

//           <Box marginRight={'52%'} marginBottom='1%' >
//             <FormControl style={{
//               marginRight: '13%',
//               marginLeft: '2%',
//               margiTop: '1%'
//             }}>
//               <img
//                 width={'100vw'}
//                 height={'100vh'}
//                 src={logo}
//               />
//             </FormControl>
//             <FormControl style={{
//               marginLeft: '43.5vw',
//               marginTop: '-10vh'
//             }}>
//               <button onClick={Submit}
//                 style={{
//                   borderRadius: '5px',
//                   backgroundColor: '#052D6A',
//                   width: '459px',
//                   height: '54px',
//                   color: 'white',
//                   fontFamily: 'Poppins',
//                   fontSize: '23px',
//                   fontWeight: '600'
//                 }}
//               >Confirmar
//               </button>
//             </FormControl>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Devolver;