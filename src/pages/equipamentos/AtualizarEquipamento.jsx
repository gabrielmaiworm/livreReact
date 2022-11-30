import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import api from "../../config/configApi";
import { ButtonCadastro, InputCadastro, InputPorcento } from "../../style/Cadastro";
import "../../style/File.css";



const AtualizarEquipamento = () => {

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

  const getStatus = () => {
    api.get('/status').then((response) => {
      setStatus(response.data);
    });
  };

  useEffect(() => {
    getStatusEq();
  }, []);


  const getStatusEq = async () => {
    await api.get(`/equipamento?${n_serie_equipamento}`).then((response) => {
      setStatus_eq_sel(response.data);
    });
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

  const getBateria = () => {
    api.get('/bateria').then((response) => {
      setNumeroSerieBat(response.data);
    });
  };
  const getEquipamento = () => {
    api.get('/equipamento').then((response) => {
      setNumeroSerieEq(response.data);
    });
  };
  // EXEMPLO
  const navigate = useNavigate();

  const handleSubmitEq = (e) => {
    e.preventDefault();
    console.log(numero_serie_equipamento)
    const equipamento = { numero_serie_equipamento, equipamento_status };
    if (!equipamento.numero_serie_equipamento)
      alert("Erro: preencha o número de série do equipamento")
    else if (!equipamento.equipamento_status)
      alert("Erro: preencha o status do equipamento")
    else {
      api.put('/equipamento', equipamento).then((res) => {
        alert("Equipamento móvel atualizado com sucesso!");
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
      api.put('/bateria', bateria).then((res) => {
        alert("Bateria atualizada com sucesso!");
        window.location.reload();
      });
    }
  };



  return (
    <Card
      sx={{
        width: '100vw',
      
        
        backgroundColor: "#fff",
      }}
    >
     
       <Row  style={{
        width: '30%',
        height:'10%',
        backgroundColor: "red",
      }}>
       <Typography
          color="#395071"
          fontWeight="bold"
          fontSize={23}
        >
          Atualizar equipamento
        </Typography>
       </Row>
       
        <CardContent sx={{ backgroundColor: "#fff", width: '80vw',border: '2px solid ',display:'flex', justifyContent:'flex-end',
borderColor: '#1d4f9a',
borderRadius: '15px',
        height: '100%',
         }}>
        {/* <Typography  style={{ width: '300px', marginTop: "25px", marginBottom: "10px" }}>
          <ReactSearchAutocomplete
            placeholder="Número de série equipamento"
            items={status_eq_sel}
            fuseOptions={{ keys: ["numero_serie_equipamento"] }} // Search on both fields
            resultStringKeyName="numero_serie_equipamento" // String to display in the results
            onSearch={handleOnSearchEquipamento}
            onHover={handleOnHover}
            onSelect={handleOnSelectEquipamento}
            onFocus={handleOnFocus}
            onClear={handleOnClearEquipamento}
            styling={{
              height: "55px",
              borderRadius: "30px",
              backgroundColor: "white",
              border: 'solid',
              hoverBackgroundColor: "lightblue",
              color: '#062e61',
              fontSize: "17px",
              iconColor: "black",
              lineColor: "black",
              placeholderColor: "white-smoke",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }} />
        </Typography>
        <Typography align="center">
          <InputCadastro
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#062e61',
                  borderWidth: 'medium'
                }
              },
            }}

            style={{ width: '308px' }}
            className="inputRounded"
            id="outlined-select-lesao"
            select
            label="Status"
            value={equipamento_status}
            onChange={(e) => setEquipamento_status(e.target.value)}
          >
            {status.map((option) => (
              <MenuItem key={option.id} value={option.tipo}>
                {option.tipo}
              </MenuItem>
            ))}
          </InputCadastro>
        </Typography>
        <ButtonCadastro variant="contained" onClick={handleSubmitEq} >Atualizar equipamento</ButtonCadastro>
        <Typography
          component="div"
          align="center"
          marginTop="30px"
          marginBottom="20px"
          color="#3e3a3a"
          fontWeight="bold"
          fontSize={20}
        >
          Atualizar bateria
        </Typography>
        <Typography s style={{ width: '300px', marginLeft: '588px', marginTop: "25px", marginBottom: "10px" }}>
          <ReactSearchAutocomplete
            placeholder="Número de série bateria"
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
              height: "50px",
              borderRadius: "30px",
              backgroundColor: "white",
              border: 'solid',
              hoverBackgroundColor: "lightblue",
              color: "#062e61",
              fontSize: "17px",
              iconColor: "black",
              lineColor: "black",
              placeholderColor: "white-smoke",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }} />
        </Typography>
        <Typography align="center">
          <InputCadastro
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#062e61',
                  borderWidth: 'medium'
                }
              },
            }}
            className="inputRounded"
            style={{ width: '308px' }}
            id="outlined-select-lesao"
            select
            label="Status"
            value={bateria_status}
            onChange={(e) => setBateria_status(e.target.value)}
          >
            {status.map((option) => (
              <MenuItem key={option.id} value={option.tipo}>
                {option.tipo}
              </MenuItem>
            ))}
          </InputCadastro>
        </Typography>
        <Typography sx={{ marginBottom: "30px" }}>
          <Typography
            component="div"
            marginTop="20px"
            marginBottom="0px"
            color="#395071">
            Carga
          </Typography>
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
            s sx={{ color: '#062e61', width: '210px', margin: '5px' }} />
          <InputPorcento
            variant="outlined"
            type="number"
            value={carga}
            label="%"
            min="0"
            max="100"
            onChange={(e) => { if (((e.target.value) <= 100) && ((e.target.value) >= 0)) setCarga(e.target.value) }} />

        </Typography>
        <ButtonCadastro variant="contained" onClick={handleSubmitBat} >Atualizar bateria</ButtonCadastro> */}
      </CardContent>
    </Card>
  );
};

export default AtualizarEquipamento;
