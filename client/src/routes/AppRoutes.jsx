import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Evento from "../pages/EventoPage";
import HomePage from "../pages/HomePage";
import LocalEvento from "../pages/LocalEventoPage";
import LoginPage from "../pages/LoginPage";

import PessoaPage from "../pages/PessoaPage";
import EditPessoaPage from "../pages/PessoaPage/edit";
import NewPessoaPage from "../pages/PessoaPage/new";

import TipoColaboradorPage from "../pages/TipoColaboradorPage";
import TipoDoacaoPage from "../pages/TipoDoacaoPage";

import UsuarioPage from "../pages/UsuariosPage";
import EditUsuarioPage from "../pages/UsuariosPage/edit";
import NewUsuarioPage from "../pages/UsuariosPage/new";

import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../shared/contexts/auth";

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
            path="/usuarios/new"
            element={
              <Private>
                <NewUsuarioPage />
              </Private>
            }
          />
          <Route
            exact
            path="/usuarios/edit"
            element={
              <Private>
                <EditUsuarioPage />
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
            path="/pessoas/new"
            element={
              <Private>
                <NewPessoaPage />
              </Private>
            }
          />
          <Route
            exact
            path="/pessoas/edit/:id"
            element={
              <Private>
                <EditPessoaPage />
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
