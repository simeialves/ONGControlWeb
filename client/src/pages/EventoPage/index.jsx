import React, { useState, useEffect } from "react";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";
import { getEventos } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Input, Label } from "reactstrap";

const Evento = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalEvento, setModalEvento] = useState(false);

  const [inputNome, setInputNome] = useState("");
  console.log(inputNome);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getEventos();
      setEventos(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen() {
    setModalEvento(true);
  }

  function handleModalClose() {
    setModalEvento(false);
  }

  const api = axios.create({
    //baseURL: "http://186.248.86.194:4444",
    baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  function editEvento(eventoid) {
    console.log("Edit Evento: " + eventoid);
    navigate(`/eventos/editevento/${eventoid}`);
  }

  function deleteEvento(eventoid) {
    console.log("Delete Evento: " + eventoid);
    api
      .delete("/eventos/" + eventoid, {})
      .then(() => {
        navigate("/eventos");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getEventoByNome(nome) {
    const response = getEventos(nome);
    setEventos(response.data);
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
                <th scope="col">Descrição</th>
                <th scope="col">Ativo</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr>
                  <td>{evento.eventoid}</td>
                  <td>{evento.descricao}</td>
                  <td>{evento.ativo}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editEvento(evento.eventoid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deleteEvento(evento.eventoid, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <label>Quantidade: {eventos.length}</label>
      </Container>
    </>
  );
};

export default Evento;
