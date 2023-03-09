import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { api, getUsuarios } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalUsuario, setModalUsuario] = useState(false);

  const [inputNome, setInputNome] = useState("");
  console.log(inputNome);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getUsuarios();
      setUsuarios(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen() {
    setModalUsuario(true);
  }

  function handleModalClose() {
    setModalUsuario(false);
  }

  function editUsuario(usuarioId) {
    navigate(`/usuarios/edit/${usuarioId}`);
  }

  function deleteUsuario(usuarioId) {
    api
      .delete("/usuarios/" + usuarioId, {})
      .then(() => {
        navigate("/usuarios");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUsuarioByNome(nome) {
    const response = getUsuarios(nome);
    setUsuarios(response.data);
    setLoading(false);
  }

  // function App() {
  //   return (
  //     <div className="App">
  //       <ul>
  //         {userFiltrado.map((result) => (
  //           <li key={result}>{result}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

  //const userFiltrado = usuarios.filter((user) => user.start(inputNome));

  return (
    <>
      <Headers />
      <br></br>
      <Container fluid="md">
        <Button href="/usuarios/new">Novo</Button>
        <br />
        <br />
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Login</th>
                <th scope="col">Administrador</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr>
                  <td>{usuario.usuarioid}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.login}</td>
                  <td>{usuario.administrador}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editUsuario(usuario.usuarioid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deleteUsuario(usuario.usuarioid, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <label>Quantidade: {usuarios.length}</label>
      </Container>

      {/* <ul>
        <br></br>

        <div className="container-sm title_container">
          <Button className="btn btn-primary" href="/newUsuario">
            Novo Usuario
          </Button>
          <br></br>
          <br></br>
          <label>Nome:</label>
          <Input
            type="text"
            className="inputNome"
            name="nome"
            id="nome"
            value={inputNome}
            onChange={(event) => {
              setInputNome(event.target.value);
            }}
          />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Documento</th>
                <th scope="col">Telefone</th>
                <th scope="col">Versão</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr>
                  <td>{user.UsuarioID}</td>
                  <td>{user.NOME}</td>
                  <td>{user.DOCUMENTO}</td>
                  <td>{user.TELEFONE}</td>
                  <td>{user.VERSAOATUAL}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editUsuario(user.UsuarioID, e)}
                    >
                      Editar
                    </button>
                  </td>

                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deleteUsuario(user.UsuarioID, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label>Quantidade: {usuarios.length}</label>
        </div>
      </ul> */}
    </>
  );
};

export default Usuario;
