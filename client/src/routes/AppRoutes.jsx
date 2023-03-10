import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "../shared/contexts/auth";

import Evento from "../pages/EventoPage";
import EditEventoPage from "../pages/EventoPage/edit";
import NewEventoPage from "../pages/EventoPage/new";

import HomePage from "../pages/HomePage";

import LocalEvento from "../pages/LocalEventoPage";
import EditLocalEventoPage from "../pages/LocalEventoPage/edit";
import NewLocalEventoPage from "../pages/LocalEventoPage/new";

import LoginPage from "../pages/LoginPage";

import ParametroPage from "../pages/ParametroPage";

import PessoaPage from "../pages/PessoaPage";
import EditPessoaPage from "../pages/PessoaPage/edit";
import NewPessoaPage from "../pages/PessoaPage/new";

import TipoColaboradorPage from "../pages/TipoColaboradorPage";
import EditTipoColaboradorPage from "../pages/TipoColaboradorPage/edit";
import NewTipoColaboradorPage from "../pages/TipoColaboradorPage/new";

import TipoDoacaoPage from "../pages/TipoDoacaoPage";
import EditTipoDoacaoPage from "../pages/TipoDoacaoPage/edit";
import NewTipoDoacaoPage from "../pages/TipoDoacaoPage/new";

import UsuarioPage from "../pages/UsuarioPage";
import EditUsuarioPage from "../pages/UsuarioPage/edit";
import NewUsuarioPage from "../pages/UsuarioPage/new";

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
            path="/usuarios/edit/:id"
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
            path="/parametros"
            element={
              <Private>
                <ParametroPage />
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
            path="/tipodoacoes/new"
            element={
              <Private>
                <NewTipoDoacaoPage />
              </Private>
            }
          />
          <Route
            exact
            path="/tipodoacoes/edit/:id"
            element={
              <Private>
                <EditTipoDoacaoPage />
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
            path="/tipocolaboradores/new"
            element={
              <Private>
                <NewTipoColaboradorPage />
              </Private>
            }
          />
          <Route
            exact
            path="/tipocolaboradores/edit/:id"
            element={
              <Private>
                <EditTipoColaboradorPage />
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
            path="/eventos/new"
            element={
              <Private>
                <NewEventoPage />
              </Private>
            }
          />
          <Route
            exact
            path="/eventos/edit/:id"
            element={
              <Private>
                <EditEventoPage />
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
            path="/localeventos/new"
            element={
              <Private>
                <NewLocalEventoPage />
              </Private>
            }
          />
          <Route
            exact
            path="/localeventos/edit/:id"
            element={
              <Private>
                <EditLocalEventoPage />
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
