import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { api, getPessoas } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Alert, AlertIcon, Input, Stack } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Pessoa = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputNome, setInputNome] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getPessoas();
      setResults(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleEdit(id) {
    navigate(`/pessoas/edit/${id}`);
  }

  function handleDelete(id) {
    api
      .delete(`/pessoas/${id}`, {})
      .then(() => {
        navigate("/pessoas");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleClick() {
    setLoading(true);
    api
      .post(`/pessoas/filter`, {
        nome: inputNome,
      })
      .then((response) => {
        setResults(response.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Nenhuma pessoa encontrada");
        setLoading(false);
      });
  }
  return (
    <>
      <Headers />
      <br></br>
      <Container fluid="md">
        <Button href="/pessoas/new">Nova</Button>
        <br />
        <br />
        <Stack spacing={3}>
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        </Stack>
        <Input
          onChange={(event) => {
            setInputNome(event.target.value);
          }}
          placeholder="Nome"
        />
        <Button onClick={handleClick}>Pesquisar</Button>
        <br />
        <br />
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Documento</th>
                <th scope="col">Telefone</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr>
                  <td>{result.nome}</td>
                  <td>{result.documento}</td>
                  <td>{result.telefone}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => handleEdit(result.pessoaid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => handleDelete(result.pessoaid, e)}
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

export default Pessoa;