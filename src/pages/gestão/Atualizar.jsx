import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  ModalRoot,
  Slider,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { apiget, apiput } from "../../Services/api";

import "../../style/File.css";

const Atualizar = () => {
  const [numeroSerieBat, setNumeroSerieBat] = useState([]);
  const [numeroSerieEq, setNumeroSerieEq] = useState([]);
  const [equipamento_status, setEquipamento_status] = useState("");
  const [nome, setNome] = useState("");
  const [bateria_status, setBateria_status] = useState("");
  const [carga, setCarga] = useState("0");
  const [numero_serie_equipamento, setNumero_serie_equipamento] = useState("");
  const [n_serie_equipamento, setN_serie_equipamento] = useState("");
  const [numero_serie_bateria, setNumero_serie_bateria] = useState("");
  const [status_eq_sel, setStatus_eq_sel] = useState([]);

  const [status, setStatus] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const response = await apiget('/status')
    setStatus(response);

  };

  useEffect(() => {
    getStatusEq();
  }, []);


  const getStatusEq = async () => {
    const response = await apiget(`/equipamento?${n_serie_equipamento}`)
    setStatus_eq_sel(response);

  };

  const handleOnHover = (result) => {
  };

  const handleOnFocus = () => {
  };

  const handleOnSearchEquipamento = (string, results) => {
    setNumero_serie_equipamento(string);
  };

  const handleOnSelectEquipamento = (item) => {
    setNumero_serie_equipamento(item.numero_serie_equipamento);
    setNome(item.nome);
    setEquipamento_status(item.equipamento_status)
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
    setBateria_status(item.bateria_status)
    setCarga(item.carga)
  };

  const handleOnClearBateria = () => {
    setNumero_serie_bateria('');
  };

  useEffect(() => {
    getBateria();
    getEquipamento();
  }, []);

  const getBateria = async () => {
    const response = await apiget('/bateria')
    setNumeroSerieBat(response);

  };
  const getEquipamento = async () => {
    const response = await apiget('/equipamento')
    setNumeroSerieEq(response);

  };
  // EXEMPLO
  const navigate = useNavigate();

  const handleSubmitEq = async (e) => {
    e.preventDefault();
    console.log(numero_serie_equipamento)
    const equipamento = { numero_serie_equipamento, equipamento_status };
    if (!equipamento.numero_serie_equipamento)
      alert("Erro: preencha o número de série do equipamento")
    else if (!equipamento.equipamento_status)
      alert("Erro: preencha o status do equipamento")
    else {
      await apiput('/equipamento', equipamento)
      alert("Equipamento Móvel Atualizado Com Sucesso!");
      window.location.reload();

    }
  };

  const handleSubmitBat = async (e) => {
    e.preventDefault();
    console.log(numero_serie_bateria)
    const bateria = { numero_serie_bateria, bateria_status, carga };
    if (!bateria.numero_serie_bateria)
      alert("Erro: preencha o número de série da bateria")
    else if (!bateria.bateria_status)
      alert("Erro: preencha o stauts da bateria")
    else if (!bateria.carga)
      alert("Erro: preencha a carga da bateria")
    else {
      await apiput('/bateria', bateria)
      alert("Bateria Atualizado Com Sucesso!");
      window.location.reload();

    }
  };

  const [motor_cabo_motor, setMotor_cabo_motor] = useState(false);
  const [bateria_carregador_plug, setBateria_carregador_plug] = useState(false);
  const [modulo_cabos, setModulo_cabos] = useState(false);
  const [display, setDisplay] = useState(false);
  const [acelerador, setAcelerador] = useState(false);
  const [suporte_acoplamento, setSuporte_acoplamento] = useState(false);
  const [guidao, setGuidao] = useState(false);
  const [barra_direcao, setBarra_direcao] = useState(false);
  const [suspensao, setSuspensao] = useState(false);
  const [roda_dianteira, setRoda_dianteira] = useState(false);
  const [pneus, setPneus] = useState(false);
  const [cavalete, setCavalete] = useState(false);
  const [acoplamento, setAcoplamento] = useState(false);

  const Motor_cabo_motor = (event) => {
    setMotor_cabo_motor(event.target.checked);
  };

  const Bateria_carregador_plug = (event) => {
    setBateria_carregador_plug(event.target.checked);
  };

  const Modulo_cabos = (event) => {
    setModulo_cabos(event.target.checked);
  };

  const Display = (event) => {
    setDisplay(event.target.checked);
  };

  const Acelerador = (event) => {
    setAcelerador(event.target.checked);
  };

  const Suporte_acoplamento = (event) => {
    setSuporte_acoplamento(event.target.checked);
  };

  const Guidao = (event) => {
    setGuidao(event.target.checked);
  };

  const Barra_direcao = (event) => {
    setBarra_direcao(event.target.checked);
  };

  const Suspensao = (event) => {
    setSuspensao(event.target.checked);
  };

  const Roda_dianteira = (event) => {
    setRoda_dianteira(event.target.checked);
  };

  const Pneus = (event) => {
    setPneus(event.target.checked);
  };

  const Cavalete = (event) => {
    setCavalete(event.target.checked);
  };

  const Acoplamento = (event) => {
    setAcoplamento(event.target.checked);
  };

  const handleSubmitList = async (e) => {
    e.preventDefault();
    const list = {
      motor_cabo_motor,
      bateria_carregador_plug,
      modulo_cabos,
      display,
      acelerador,
      suporte_acoplamento,
      guidao,
      barra_direcao,
      suspensao,
      roda_dianteira,
      pneus,
      cavalete,
      acoplamento
    };
    await apiput('/estoque-check', list)
    alert("Checklist de defeitos atualizado com sucesso!");
    window.location.reload();
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
        > Atualizar conjunto
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
          <Typography
            sx={{
              marginTop: '2%',
              marginBottom: '3%',
              marginLeft: '3%',
              color: '#052D6A',
              fontSize: '28px',
              fontWeight: '400'
            }} align='left'
          >Atualizar equipamento</Typography>

          <Box marginTop='2%'>
            <FormControl
              style={{
                marginRight: '13%'
              }}>
              <Typography sx={{
                width: "459px",
                fontSize: '15px',
                fontWeight: "bold",
                color: "#373737",
              }} align='left'>Nº de série do equipamento
                <ReactSearchAutocomplete
                  items={status_eq_sel}
                  fuseOptions={{ keys: ["numero_serie_equipamento"] }} // Search on both fields
                  resultStringKeyName="numero_serie_equipamento" // String to display in the results
                  onSearch={handleOnSearchEquipamento}
                  onHover={handleOnHover}
                  onSelect={handleOnSelectEquipamento}
                  onFocus={handleOnFocus}
                  onClear={handleOnClearEquipamento}
                  placeholder="Nº de série do equipamento"
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
                    marginBottom: "5%",
                    // height: "48.24px",
                    width: "459px",
                    marginLeft: "2%",
                    padding: '3px',
                    zIndex: 2,
                  }} fontFamily='Poppins' />
              </Typography>
            </FormControl>
            <FormControl variant="standard"
              sx={{ marginTop: '0.5%' }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  marginLeft: '1vh'
                }}
                // align='left'
                fontFamily='Poppins'
              >Nome
              </InputLabel>
              <Input
                disabled
                placeholder="Nome"
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
              marginRight: '14%'
            }}>
              <InputLabel
                shrink htmlFor="bootstrap-input"
                sx={{
                  fontSize: '19px',
                  fontWeight: "bold",
                  color: "#373737",
                  // marginLeft: '2%',
                  marginTop: '-3%',
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
                  width: "463px",
                  marginLeft: "2%",
                  padding: '3px',
                }} fontFamily='Poppins'
                value={equipamento_status}
                onChange={(e) => setEquipamento_status(e.target.value)}
              >
                <option value="" disabled hidden>
                  Status
                </option>
                {status.map((option) => (
                  <option key={option?.id} value={option?.tipo}>
                    {option?.tipo}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormControl style={{
              marginTop: '-1%',
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
                  borderRadius: '5px'
                }}
                  onClick={handleSubmitEq}>
                  Confirmar
                </button>
              </Link>
            </FormControl>
          </Box>

          <Typography
            sx={{
              marginTop: '2%',
              marginBottom: '3%',
              marginLeft: '3%',
              color: '#052D6A',
              fontSize: '28px',
              fontWeight: '400'
            }} align='left'
          >Atualizar bateria</Typography>
          <Box marginTop='2%'>
            <FormControl style={{ marginRight: '13%' }}>
              <Typography sx={{
                width: "459px",
                fontSize: '15px',
                fontWeight: "bold",
                color: "#373737",
              }} align='left'>Nº de série da bateria
                <ReactSearchAutocomplete
                  placeholder="Nº de série da bateria"
                  items={numeroSerieBat}
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
                    zIndex: 2,
                  }} fontFamily='Poppins' />
              </Typography>
            </FormControl>
            <FormControl variant="standard" sx={{ marginTop: '2%' }}>
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
                  width: "64px",
                  marginLeft: "4%",
                  marginTop: '-1%'
                }} fontFamily='Poppins'
                InputProps={{
                  endAdornment: (
                    <InputAdornment >
                      %
                    </InputAdornment>
                  ),
                  sx: { fontSize: 21, },
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
              <Link to="/Cadastrar-usuario"
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

          <Typography
            sx={{
              marginTop: '2%',
              marginBottom: '3%',
              marginLeft: '3%',
              color: '#052D6A',
              fontSize: '28px',
              fontWeight: '400'
            }} align='left'
          >Checklist de defeitos</Typography>

          <Box marginTop='2%' marginBottom='2%'>
            <FormGroup style={{
              marginLeft: '3vw',
              width: '42.%'
            }}>
              <FormControlLabel style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={motor_cabo_motor}
                  onChange={Motor_cabo_motor}
                />} label="Motor / cabo de Motor" />
              <FormControlLabel l style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
                backgroundColor: '#EBF1FB'
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={bateria_carregador_plug}
                  onChange={Bateria_carregador_plug}
                />} label="Bateria / carregador / caixa plug" />
              <FormControlLabel style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={modulo_cabos}
                  onChange={Modulo_cabos}
                />} label="Módulo / cabos" />
              <FormControlLabel l style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
                backgroundColor: '#EBF1FB'
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={display}
                  onChange={Display}
                />} label="Display" />
              <FormControlLabel style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={acelerador}
                  onChange={Acelerador}
                />} label="Acelerador" />
              <FormControlLabel l style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
                backgroundColor: '#EBF1FB'
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={suporte_acoplamento}
                  onChange={Suporte_acoplamento}
                />} label="Suporte de acoplamento" />
              <FormControlLabel style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={guidao}
                  onChange={Guidao}
                />} label="Guidão" />
            </FormGroup>

            <FormGroup style={{
              marginLeft: '43vw',
              marginTop: '-22%',
              width: '42.%'
            }}>
              <FormControlLabel style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={barra_direcao}
                  onChange={Barra_direcao}
                />} label="Barra de direção" />
              <FormControlLabel l style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
                backgroundColor: '#EBF1FB'
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={suspensao}
                  onChange={Suspensao}
                />} label="Suspensão" />
              <FormControlLabel style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={roda_dianteira}
                  onChange={Roda_dianteira}
                />} label="Roda dianteira" />
              <FormControlLabel l style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
                backgroundColor: '#EBF1FB'
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={pneus}
                  onChange={Pneus}
                />} label="Pneus" />
              <FormControlLabel style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={cavalete}
                  onChange={Cavalete}
                />} label="Cavalete" />
              <FormControlLabel l style={{
                color: '#373737',
                fontWeight: 'bold',
                fontSize: '19px',
                backgroundColor: '#EBF1FB'
              }}
                control={<Checkbox style={{
                  color: '#052D6A'
                }}
                  checked={acoplamento}
                  onChange={Acoplamento}
                />} label="Acoplamento" />
            </FormGroup>
          </Box>

          <Box
            marginRight={'55%'}
            marginBottom='1%'
            marginTop={'7%'}
          >
            <button
              onClick={handleSubmitList}
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
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default Atualizar;