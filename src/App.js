
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './App.css';
// import AtualizarEquipamento from './pages/equipamentos/AtualizarEquipamento';
// import Geolocalizacao from './pages/geolocalizacao/Geolocalizacao';
import HomeUsuario from './pages/home/HomeUsuario';
import LoginMaster from './pages/login/LoginMaster';
import CadastrarUsuario from './pages/cadastros/CadastrarUsuario';
import CadastrarEquipamento from './pages/equipamentos/CadastrarEquipamento';
import CadastrarBateria from './pages/equipamentos/CadastrarBateria';
import Estoque from './pages/equipamentos/Estoque';
import Solicitar from './pages/gestão/Solicitar';
import ListaEspera from './pages/gestão/ListaEspera';
import SolicitarUsuarioLista from './pages/gestão/SolicitarUsuarioLista';
import Devolver from './pages/gestão/Devolver';
import Atualizar from './pages/gestão/Atualizar';
import AtualizarSelecionado from './pages/gestão/AtualizarSelecionado';
import RequireAuth from "./Utils/RequireAuth";
import PrimeiraPagina from './pages/PrimeiraPagina';

export const Routes = () => {

  const routes = useRoutes([


    { path: "/", element: <LoginMaster /> },
    { path: "/home", element:<RequireAuth><PrimeiraPagina /></RequireAuth>},
    // { path: "/login", element:<RequireAuth><Login /></RequireAuth>},
    // { path: "/editar-master", element:<RequireAuth><EditarMaster /></RequireAuth>  },
    // { path: "/esqueci-senha", element: <RecuperarSenha /> },
    // { path: "/primeiro-acesso", element:<PrimeiroAcesso /> },
    // { path: "/trocar-senha", element: <RequireAuth><TrocarSenha /></RequireAuth> },
    // { path: "/home", element:<RequireAuth><Home/></RequireAuth>  },
    // { path: "/home-operador", element: <RequireAuth><HomeOperador /></RequireAuth> },
    // { path: "/perfis", element: <RequireAuth><MenuPerfis /></RequireAuth> },
    // { path: "/equipamentos", element: <RequireAuth><MenuEquipamentos /></RequireAuth> },
    // { path: "/equipamentos-operador", element: <RequireAuth><MenuEquipamentosOperador /></RequireAuth> },
    // { path: "/gestao-equipamentos", element: <RequireAuth><GestaoEquipamentos /></RequireAuth> },
    // { path: "/gestao-financeira", element: <RequireAuth><GestaoFinanceira /></RequireAuth> },
    // { path: "/gestao-equipamentos-operador", element:<RequireAuth> <GestaoEquipamentosOperador /></RequireAuth> },
    { path: "/cadastrar-usuario", element: <RequireAuth><CadastrarUsuario /></RequireAuth> },
    // { path: '/activate-user/:documento', element:<RequireAuth><AtivarEmail /></RequireAuth>  },
    // { path: '/conta-ativada', element:<RequireAuth> <ContaAtivada /></RequireAuth> },
    // { path: "/cadastrar-usuario-operador", element: <RequireAuth><CadastrarUsuarioOperador /></RequireAuth> },
    // { path: "/editar-usuario", element: <RequireAuth><EditarUsuario /></RequireAuth> },
    // { path: "/cadastrar-operador", element:<RequireAuth><CadastrarOperador /></RequireAuth>  },
    // { path: "/editar-operador", element: <RequireAuth><EditarOperador /></RequireAuth> },
    { path: "/cadastrar-equipamento", element: <RequireAuth><CadastrarEquipamento /></RequireAuth> },
    // { path: "/cadastrar-equipamento-operador", element: <RequireAuth><CadastraEquipamentoOperador /></RequireAuth> },
    { path: "/cadastrar-bateria", element: <RequireAuth><CadastrarBateria /></RequireAuth> },
    // { path: "/cadastrar-bateria-operador", element:<RequireAuth><CadastrarBateriaOperador /></RequireAuth>  },
    { path: "/solicita-equipamento", element: <RequireAuth><Solicitar /></RequireAuth> },
    { path: "/lista-espera", element: <RequireAuth><ListaEspera /></RequireAuth> },
    // { path: "/solicita-equipamento-usuario", element: <RequireAuth><SolicitaEquipamentoUsuario /></RequireAuth> },
    // { path: "/solicita-equipamento-operador", element:<RequireAuth><SolicitaEquipamentoOperador /></RequireAuth>  },
    { path: "/devolver-equipamento", element: <RequireAuth><Devolver /></RequireAuth> },
    // { path: "/devolver-equipamento-usuario", element: <RequireAuth><DevolverEquipamentoUsuario /></RequireAuth> },
    // { path: "/devolver-equipamento-operador", element:<RequireAuth><DevolverEquipamentoOperador /></RequireAuth>  },
    { path: "/atualizar-equipamento", element: <RequireAuth><Atualizar /></RequireAuth> },
    { path: "/atualizar-equipamento/:kit", element: <RequireAuth><AtualizarSelecionado/></RequireAuth> },
    { path: "/solicitar-equipamento/:documento", element: <RequireAuth><SolicitarUsuarioLista/></RequireAuth> },
    // { path: "/atualizar-equipamento-emergencia/:kit", element:<RequireAuth><AtualizarEquipamentoEmergencia/></RequireAuth>  },
    // { path: "/atualizar-equipamento-operador", element: <RequireAuth><AtualizarEquipamentoOperador /></RequireAuth> },
    { path: "/estoque", element: <RequireAuth><Estoque /></RequireAuth> },
    // { path: "/estoque-operador", element:<RequireAuth><EstoqueEquipamentoOperador /></RequireAuth>  },
    // { path: "/aparelhos", element:<RequireAuth><AparelhosDesktop /></RequireAuth>  },
    // { path: "/geolocalizacao", element:<RequireAuth><Geolocalizacao /></RequireAuth>  },
    // { path: "/geolocalizacao-operador", element:<RequireAuth><GeolocalizacaoOperador /></RequireAuth>  },
    // { path: "/aparelhos-operador", element: <RequireAuth><AparelhosDesktopOperador /></RequireAuth> },
    // { path: "/senha-cadastro", element:<RequireAuth><SenhaMaster /></RequireAuth>  },
    // { path: "/cadastrar-parceiro", element:<RequireAuth><CadastrarParceiro /></RequireAuth> },
    // { path: "/pesquisar", element:<RequireAuth><Pesquisar /></RequireAuth> },
    // { path: "/gestaoParceiro", element:<RequireAuth><GestaoParceiro /></RequireAuth> },

  ]);

  return routes;
};





function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <HomeUsuario />
        </BrowserRouter>
      </header>
    </div>

  );
}

export default App;
