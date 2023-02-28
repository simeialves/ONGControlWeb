import React, { useState, useEffect } from "react";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";
import { getUsers } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Input, Label } from "reactstrap";

const Cliente = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalCliente, setModalCliente] = useState(false);

  const [inputNome, setInputNome] = useState("");
  console.log(inputNome);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen() {
    setModalCliente(true);
  }

  function handleModalClose() {
    setModalCliente(false);
  }

  const api = axios.create({
    //baseURL: "http://186.248.86.194:4444",
    baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  function editCliente(CLIENTEID) {
    console.log("Edit Cliente: " + CLIENTEID);
    navigate(`/clientes/editcliente/${CLIENTEID}`);
  }

  function deleteCliente(CLIENTEID) {
    console.log("Delete Cliente: " + CLIENTEID);
    api
      .delete("/clientes/" + CLIENTEID, {})
      .then(() => {
        navigate("/clientes");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getClienteByNome(nome) {
    const response = getUsers(nome);
    setUsers(response.data);
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

  //const userFiltrado = users.filter((user) => user.start(inputNome));

  return (
    <>
      <Headers />
      <br></br>
      <Container fluid="md">
        <Row>
          <Table striped bordered hover size="sm">
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
              {users.map((user) => (
                <tr>
                  <td>{user.CLIENTEID}</td>
                  <td>{user.NOME}</td>
                  <td>{user.DOCUMENTO}</td>
                  <td>{user.TELEFONE}</td>
                  <td>{user.VERSAOATUAL}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editCliente(user.CLIENTEID, e)}
                    >
                      Editar
                    </button>
                  </td>
                  {/* <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deleteCliente(user.CLIENTEID, e)}
                    >
                      Excluir
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <label>Quantidade: {users.length}</label>
      </Container>

      {/* <ul>
        <br></br>

        <div className="container-sm title_container">
          <Button className="btn btn-primary" href="/newcliente">
            Novo Cliente
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
              {users.map((user) => (
                <tr>
                  <td>{user.CLIENTEID}</td>
                  <td>{user.NOME}</td>
                  <td>{user.DOCUMENTO}</td>
                  <td>{user.TELEFONE}</td>
                  <td>{user.VERSAOATUAL}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editCliente(user.CLIENTEID, e)}
                    >
                      Editar
                    </button>
                  </td>

                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deleteCliente(user.CLIENTEID, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label>Quantidade: {users.length}</label>
        </div>
      </ul> */}
    </>
  );
};

export default Cliente;
