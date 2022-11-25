import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logoAzul from '../../images/LogoAzul.jpg';
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import load from '../../icones/loading.gif'
import { InputLogin } from "../../style/Styles";
import '../../style/Fontes.css';
import { Container } from "@mui/material";

function LoginMaster() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const entrar = async () => {

        const user = await JSON.parse(localStorage.getItem("funcionario_info"));

        if (user.funcionario_nivel == 2) {

            navigate("/");

        } else if (user.funcionario_nivel == 5) {

            navigate("/home");

        }

    }

    const login = async () => {
        setLoading(true);
        try {
            const token = Buffer.from(`${email}:${senha}`, 'utf8').toString('base64')
            let result = await fetch("http://localhost:3005/autenticacao-funcionario", {
                method: "get",

                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${email}:${senha}`).toString('base64'),
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            result = await result.json();

            localStorage.setItem("jwt", JSON.stringify({ jwt: result.token }));
            localStorage.setItem("funcionario_info", JSON.stringify({

                funcionario_nome: result.result[0].nome,
                funcionario_sobrenome: result.result[0].sobrenome,
                funcionario_nascimento: result.result[0].data_de_nascicmento,
                funcionario_email: result.result[0].email,
                funcionario_doc: result.result[0].documento,
                funcionario_nivel: result.result[0].nivel,
                funcionario_telefone: result.result[0].telefone,
                funcionario_cep: result.result[0].cep,
                funcionario_logradouro: result.result[0].logradouro,
                funcionario_numero: result.result[0].numero,
                funcionario_complemento: result.result[0].complemento,
                funcionario_cidade: result.result[0].cidade,
                funcionario_bairro: result.result[0].bairro,
                funcionario_estado: result.result[0].estado,
                funcionario_foto: result.result[0].foto_documento,
                funcionario_foto_com_documento: result.result[0].foto_com_documento,
                funcionario_foto_reconhecimento: result.result[0].foto_reconhecimento,
                funcionario_foto_documento64: result.result[0].foto_documento64,
                funcionario_foto_com_documento64: result.result[0].foto_com_documento64,
                funcionario_foto_reconhecimento64: result.result[0].foto_reconhecimento64,
                funcionario_telefone: result.result[0].telefone,
                funcionario_senha: result.result[0].senha,
                funcionario_painel_de_gerenciamento: result.result[0].painel_de_gerenciamento,
                funcionario_atualizar_equipamentos: result.result[0].atualizar_equipamentos,
                funcionario_estoque_de_equipamentos: result.result[0].estoque_de_equipamentos,
                funcionario_solicitacao_de_equipamentos: result.result[0].solicitacao_de_equipamentos,
                funcionario_devolucao_de_equipamentos: result.result[0].devolucao_de_equipamentos,

            }));
            setLoading(false);
            if (!result.result[0].email == "") {
                entrar();
                alert(`Bem vindo(a), ${result.result[0].nome}.`);
            } else if (result.result[0].email == "") {
                navigate("/");
                alert("Email ou senha incorretos");
            }
        } catch (error) {
            setLoading(false);
            navigate("/");
            alert("Email ou senha incorretos");
        }
    };


    return (

        <Card
            sx={{
                width: '100vw',
                height: '100vh',
                position: 'position: absolute;',
                backgroundColor: "#052d6a",
            }}>
            <Box>
                <CardContent sx={{ backgroundColor: "#052d6a" }}>
                    <Typography>
                        <img
                            src={logoAzul}
                            style={{
                                marginTop: "45px",
                                marginBottom: '50px'
                            }}
                            align="center"
                            width="130px"
                            alt='Logo livre' />
                    </Typography>
                    <Typography
                        component="div"
                        align="center"
                        marginTop="15px"
                        marginBottom='50px'
                        color="white"
                        fontWeight="bold"
                        fontSize={14}
                    >LIVRE®, movimente sua liberdade
                    </Typography>

                    {loading ? <img src={load} alt="loading" style={{
                        marginTop: "45px",
                        marginBottom: '50px',
                        width: "230px"
                    }} /> :
                        <><Container>
                            <InputLogin
                                sx={{
                                    "& .MuiOutlinedInput-root:hover": {
                                        "& > fieldset": {
                                            borderColor: "#cfe9ff",
                                            fontFamily: 'Poppins',
                                        }
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#cfe9ff',
                                            WebkitPrintColorAdjust: 'white',
                                            fontFamily: 'Poppins',
                                        }
                                    },
                                    input: {
                                        "&:-webkit-autofill": {
                                            backgroundColor: "#052D6A",
                                            backgroundClip: "text",
                                            fontFamily: 'Poppins',
                                        },
                                    },
                                }}
                                className="inputRounded"
                                variant='outlined'
                                label='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Container>
                            <Container>
                                <InputLogin
                                    sx={{
                                        marginTop: '5vh', marginBottom: '5vh',
                                        "& .MuiOutlinedInput-root:hover": {
                                            "& > fieldset": {
                                                borderColor: "#cfe9ff",
                                                fontFamily: 'Poppins'
                                            }
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#cfe9ff',
                                                fontFamily: 'Poppins'
                                            }
                                        }
                                    }}
                                    className="inputRounded"
                                    variant='outlined'
                                    label='Senha'
                                    type='password'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </Container>
                            <Button onClick={login} sx={{
                                marginBottom: '10px',
                                marginTop: '10px',
                                height: "50px",
                                backgroundColor: '#ffffff',
                                color: '#062e61',
                                fontWeight: "bold",
                                borderRadius: '30px',
                                width: '180px'
                            }} variant='contained'
                            >LOGIN</Button>
                            {/* <Link to="/esqueci-senha" >
                                <Typography sx={{
                                    fontSize: '18px',
                                    color: 'white',
                                    // marginBottom: '155px'
                                }}>Esqueceu sua senha?</Typography>
                            </Link>
                            <Link to="/primeiro-acesso" >
                                <Typography sx={{
                                    fontSize: '18px',
                                    color: 'white',
                                    marginBottom: '155px'
                                }}>Primeiro acesso</Typography>
                            </Link> */}

                        </>
                    }

                </CardContent>
            </Box>
        </Card>

    );
}

export default LoginMaster;

