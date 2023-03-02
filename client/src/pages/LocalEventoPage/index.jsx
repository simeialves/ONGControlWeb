import React, { useState, useEffect } from "react";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";
import { getLocalEventos } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Input, Label } from "reactstrap";

const LocalEvento = () => {
  const [localeventos, setLocalEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalLocalEvento, setModalLocalEvento] = useState(false);

  const [inputNome, setInputNome] = useState("");
  console.log(inputNome);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getLocalEventos();
      setLocalEventos(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen() {
    setModalLocalEvento(true);
  }

  function handleModalClose() {
    setModalLocalEvento(false);
  }

  const api = axios.create({
    //baseURL: "http://186.248.86.194:4444",
    baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  function editLocalEvento(localeventoid) {
    console.log("Edit LocalEvento: " + localeventoid);
    navigate(`/localeventos/editlocalevento/${localeventoid}`);
  }

  function deleteLocalEvento(localeventoid) {
    console.log("Delete LocalEvento: " + localeventoid);
    api
      .delete("/localeventos/" + localeventoid, {})
      .then(() => {
        navigate("/localeventos");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getLocalEventoByNome(nome) {
    const response = getLocalEventos(nome);
    setLocalEventos(response.data);
    setLoading(false);
  }
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
                <th scope="col">Logradouro</th>
                <th scope="col">Número</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {localeventos.map((localevento) => (
                <tr>
                  <td>{localevento.localeventoid}</td>
                  <td>{localevento.nome}</td>
                  <td>{localevento.logradouro}</td>
                  <td>{localevento.numero}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) =>
                        editLocalEvento(localevento.localeventoid, e)
                      }
                    >
                      Editar
                    </button>
                  </td>
                  {/* <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) =>
                        deleteLocalEvento(localevento.localeventoid, e)
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
        <label>Quantidade: {localeventos.length}</label>
      </Container>
    </>
  );
};

export default LocalEvento;
