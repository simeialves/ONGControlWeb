import React, { useState, useEffect } from "react";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";
import { getTipoDoacoes } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Input, Label } from "reactstrap";

const TipoDoacao = () => {
  const [tipodoacoes, setTipoDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalTipoDoacao, setModalTipoDoacao] = useState(false);

  const [inputNome, setInputNome] = useState("");
  console.log(inputNome);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getTipoDoacoes();
      setTipoDoacoes(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen() {
    setModalTipoDoacao(true);
  }

  function handleModalClose() {
    setModalTipoDoacao(false);
  }

  const api = axios.create({
    //baseURL: "http://186.248.86.194:4444",
    baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  function editTipoDoacao(tipodoacaoid) {
    console.log("Edit TipoDoacao: " + tipodoacaoid);
    navigate(`/tipodoacoes/edittipodoacao/${tipodoacaoid}`);
  }

  function deleteTipoDoacao(tipodoacaoid) {
    console.log("Delete TipoDoacao: " + tipodoacaoid);
    api
      .delete("/tipodoacoes/" + tipodoacaoid, {})
      .then(() => {
        navigate("/tipodoacoes");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTipoDoacaoByNome(nome) {
    const response = getTipoDoacoes(nome);
    setTipoDoacoes(response.data);
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

  //const userFiltrado = tipodoacoes.filter((user) => user.start(inputNome));

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
              {tipodoacoes.map((tipodoacao) => (
                <tr>
                  <td>{tipodoacao.tipodoacaoid}</td>
                  <td>{tipodoacao.descricao}</td>
                  <td>{tipodoacao.ativo}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) =>
                        editTipoDoacao(tipodoacao.tipodoacaoid, e)
                      }
                    >
                      Editar
                    </button>
                  </td>
                  {/* <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) =>
                        deleteTipoDoacao(tipodoacao.tipodoacaoid, e)
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
        <label>Quantidade: {tipodoacoes.length}</label>
      </Container>

      {/* <ul>
        <br></br>

        <div className="container-sm title_container">
          <Button className="btn btn-primary" href="/newtipodoacao">
            Novo TipoDoacao
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
              {tipodoacoes.map((user) => (
                <tr>
                  <td>{user.tipodoacaoid}</td>
                  <td>{user.NOME}</td>
                  <td>{user.DOCUMENTO}</td>
                  <td>{user.TELEFONE}</td>
                  <td>{user.VERSAOATUAL}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editTipoDoacao(user.tipodoacaoid, e)}
                    >
                      Editar
                    </button>
                  </td>

                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deleteTipoDoacao(user.tipodoacaoid, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label>Quantidade: {tipodoacoes.length}</label>
        </div>
      </ul> */}
    </>
  );
};

export default TipoDoacao;
