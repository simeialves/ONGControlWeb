import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PessoaPage from "../pages/PessoasPage";
import TipoDoacaoPage from "../pages/TipoDoacaoPage";
import TipoColaboradorPage from "../pages/TipoColaboradorPage";
import Evento from "../pages/EventoPage";
import LocalEvento from "../pages/LocalEventoPage";
import UsuarioPage from "../pages/UsuariosPage";
import NewClientePage from "../pages/ClientePage/newCliente";
import EditClientePage from "../pages/ClientePage/editCliente";

import { AuthProvider, AuthContext } from "../shared/contexts/auth";
import React, { useContext } from "react";

const AppRouters = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/usuarios"
            element={
              <Private>
                <UsuarioPage />
              </Private>
            }
          />
          <Route
            exact
            path="/pessoas"
            element={
              <Private>
                <PessoaPage />
              </Private>
            }
          />
          <Route
            exact
            path="/tipodoacoes"
            element={
              <Private>
                <TipoDoacaoPage />
              </Private>
            }
          />
          <Route
            exact
            path="/tipocolaboradores"
            element={
              <Private>
                <TipoColaboradorPage />
              </Private>
            }
          />
          <Route
            exact
            path="/eventos"
            element={
              <Private>
                <Evento />
              </Private>
            }
          />
          <Route
            exact
            path="/localeventos"
            element={
              <Private>
                <LocalEvento />
              </Private>
            }
          />
          <Route
            exact
            path="/newcliente"
            element={
              <Private>
                <NewClientePage />
              </Private>
            }
          />
          <Route
            exact
            path="/clientes/editcliente/:id"
            element={
              <Private>
                <EditClientePage />
              </Private>
            }
          />
          <Route
            exact
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouters;
