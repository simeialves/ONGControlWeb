import React, { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "../shared/contexts/auth";

import Contatos from "../pages/Contatos";

import Evento from "../pages/EventoPage";

import DetalheEventoPage from "../pages/EventoPage/Eventos/eventodetails";

import HomePage from "../pages/HomePage";

import LoginPage from "../pages/LoginPage";

import ParametroPage from "../pages/ParametroPage";

import CadastroPage from "../pages/CadastroPage";

import UsuarioPage from "../pages/UsuarioPage";
import EditUsuarioPage from "../pages/UsuarioPage/edit";
import NewUsuarioPage from "../pages/UsuarioPage/new";
import SpinnerUtil from "../pages/Uteis/progress";

const AppRouters = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <SpinnerUtil />;
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
          <Route path="*" element={<Navigate to="/" />} />
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
            path="/cadastros"
            element={
              <Private>
                <CadastroPage />
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
            path="/eventos"
            element={
              <Private>
                <Evento />
              </Private>
            }
          />
          <Route
            exact
            path="/eventos/details/:id"
            element={
              <Private>
                <DetalheEventoPage />
              </Private>
            }
          />
          <Route
            exact
            path="/contatos"
            element={
              <Private>
                <Contatos />
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
