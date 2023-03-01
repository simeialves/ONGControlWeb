import React, { useState, useEffect } from "react";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";
import { getTipoColaboradores } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Input, Label } from "reactstrap";

const TipoColaborador = () => {
  const [tipocolaboradores, setTipoColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalTipoColaborador, setModalTipoColaborador] = useState(false);

  const [inputNome, setInputNome] = useState("");
  console.log(inputNome);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getTipoColaboradores();
      setTipoColaboradores(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen() {
    setModalTipoColaborador(true);
  }

  function handleModalClose() {
    setModalTipoColaborador(false);
  }

  const api = axios.create({
    //baseURL: "http://186.248.86.194:4444",
    baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  function editTipoColaborador(tipocolaboradorid) {
    console.log("Edit TipoColaborador: " + tipocolaboradorid);
    navigate(`/tipocolaboradores/edittipocolaborador/${tipocolaboradorid}`);
  }

  function deleteTipoColaborador(tipocolaboradorid) {
    console.log("Delete TipoColaborador: " + tipocolaboradorid);
    api
      .delete("/tipocolaboradores/" + tipocolaboradorid, {})
      .then(() => {
        navigate("/tipocolaboradores");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTipoColaboradorByNome(nome) {
    const response = getTipoColaboradores(nome);
    setTipoColaboradores(response.data);
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

  //const userFiltrado = tipocolaboradores.filter((user) => user.start(inputNome));

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
                <th scope="col">Descrição</th>
                <th scope="col">Ativo</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {tipocolaboradores.map((tipocolaborador) => (
                <tr>
                  <td>{tipocolaborador.tipocolaboradorid}</td>
                  <td>{tipocolaborador.descricao}</td>
                  <td>{tipocolaborador.ativo}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) =>
                        editTipoColaborador(
                          tipocolaborador.tipocolaboradorid,
                          e
                        )
                      }
                    >
                      Editar
                    </button>
                  </td>
                  {/* <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) =>
                        deleteTipoColaborador(tipocolaborador.tipocolaboradorid, e)
                      }
                    >
                      Excluir
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <label>Quantidade: {tipocolaboradores.length}</label>
      </Container>

      {/* <ul>
        <br></br>

        <div className="container-sm title_container">
          <Button className="btn btn-primary" href="/newtipocolaborador">
            Novo TipoColaborador
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
              {tipocolaboradores.map((user) => (
                <tr>
                  <td>{user.tipocolaboradorid}</td>
                  <td>{user.NOME}</td>
                  <td>{user.DOCUMENTO}</td>
                  <td>{user.TELEFONE}</td>
                  <td>{user.VERSAOATUAL}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editTipoColaborador(user.tipocolaboradorid, e)}
                    >
                      Editar
                    </button>
                  </td>

                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deleteTipoColaborador(user.tipocolaboradorid, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label>Quantidade: {tipocolaboradores.length}</label>
        </div>
      </ul> */}
    </>
  );
};

export default TipoColaborador;
