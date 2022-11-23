import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  Slider,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { apiget, apiput } from "../../Services/api";
import "../../style/File.css";

const AtualizarSelecionado = () => {
  const { kit } = useParams();

  const valorInicial = kit ? '' : null;
  const [nome, setNome] = useState(valorInicial);
  const [numero_serie_equipamento, setNumero_serie_equipamento] = useState(valorInicial);
  const [equipamento_status, setEquipamento_status] = useState(valorInicial);
  const [numero_serie_bateria, setNumero_serie_bateria] = useState(valorInicial);
  const [bateria_status, setBateria_status] = useState(valorInicial);
  const [carga, setCarga] = useState(valorInicial);

  const [status, setStatus] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = () => {
    apiget('/status').then((response) => {
      setStatus(response.data);
    });
  };

  useEffect(() => {
    getEqui()
  }, []);

  const getEqui = async () => {
    await apiget(`/estoque-completo/${kit}`).then((response) => {
      setNome(response.data[0].nome);
      setNumero_serie_equipamento(response.data[0].numero_serie_equipamento);
      setEquipamento_status(response.data[0].equipamento_status);
      setNumero_serie_bateria(response.data[0].numero_serie_bateria);
      setBateria_status(response.data[0].bateria_status);
      setCarga(response.data[0].carga);
    })
  };

  const handleSubmitEq = (e) => {
    e.preventDefault();
    console.log(numero_serie_equipamento)
    const equipamento = { numero_serie_equipamento, equipamento_status };
    if (!equipamento.numero_serie_equipamento)
      alert("Erro: preencha o número de série do equipamento")
    else if (!equipamento.equipamento_status)
      alert("Erro: preencha o status do equipamento")
    else {
      apiput('/equipamento', equipamento).then((res) => {
        alert("Equipamento Móvel Atualizado Com Sucesso!");
        window.location.reload();
      });
    }
  };

  const handleSubmitBat = (e) => {
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
      apiput('/bateria', bateria).then((res) => {
        alert("Bateria Atualizado Com Sucesso!");
        window.location.reload();
      });
    }
  };

  const [motor_cabo_motor, setMotor_cabo_motor] = useState('');
  const [bateria_carregador_plug, setBateria_carregador_plug] = useState('');
  const [modulo_cabos, setModulo_cabos] = useState('');
  const [display, setDisplay] = useState('');
  const [acelerador, setAcelerador] = useState('');
  const [suporte_acoplamento, setSuporte_acoplamento] = useState('');
  const [guidao, setGuidao] = useState('');
  const [barra_direcao, setBarra_direcao] = useState('');
  const [suspensao, setSuspensao] = useState('');
  const [roda_dianteira, setRoda_dianteira] = useState('');
  const [pneus, setPneus] = useState('');
  const [cavalete, setCavalete] = useState('');
  const [acoplamento, setAcoplamento] = useState('');

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
    await apiput('/estoque', list)
    alert("Checklist De Integridade Atualizado Com Sucesso!");
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
                <Input
                  disabled
                  placeholder="Nº de série do equipamento"
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
                  <option key={option.id} value={option.tipo}>
                    {option.tipo}
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
                <Input
                  disabled
                  placeholder="Nº de série da bateria"
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
          >Checklist da integredade</Typography>

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
              marginTop: '-25%',
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
            marginTop={'5%'}
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

export default AtualizarSelecionado;