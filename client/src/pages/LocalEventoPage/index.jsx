import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { api, getLocalEventos } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const LocalEvento = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getLocalEventos();
      setResults(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleEdit(id) {
    navigate(`/localeventos/edit/${id}`);
  }

  function handleDelete(id) {
    api
      .delete(`/localeventos/${id}`, {})
      .then(() => {
        navigate("/localeventos");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Headers />
      <br></br>
      <Container fluid="md">
        <Button href="/localeventos/new">Novo</Button>
        <br />
        <br />
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Logradouro</th>
                <th scope="col">Número</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr>
                  <td>{result.nome}</td>
                  <td>{result.logradouro}</td>
                  <td>{result.numero}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => handleEdit(result.localeventoid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => handleDelete(result.localeventoid, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <label>Quantidade: {results.length}</label>
      </Container>
    </>
  );
};

export default LocalEvento;
