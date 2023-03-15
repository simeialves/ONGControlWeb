import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { api, getTipoDoacoes } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import { Checkbox, Input } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { STATUS_ATIVO } from "../../includes/const";

const TipoDoacao = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [inputDescricao, setInputDescricao] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getTipoDoacoes();
      setResults(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleEdit(id) {
    navigate(`/tipodoacoes/edit/${id}`);
  }

  function handleDelete(id) {
    api
      .delete(`/tipodoacoes/${id}`, {})
      .then(() => {
        navigate("/tipodoacoes");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleClick() {
    setLoading(true);
    api
      .post(`/tipodoacoes/filter`, {
        descricao: inputDescricao,
      })
      .then((response) => {
        setResults(response.data);
        setMessage(false);
        setLoading(false);
        setInputDescricao("");
      })
      .catch(() => {
        setMessage(true);
        setLoading(false);
      });
  }

  async function handleClear() {
    setLoading(true);
    setInputDescricao("");
    const response = await getTipoDoacoes();
    setResults(response.data);
    setLoading(false);
  }
  return (
    <>
      <Headers />
      <br></br>
      <Container fluid="md">
        <Button href="/tipodoacoes/new">Novo</Button>
        <br />
        <br />
        <Input
          onChange={(event) => {
            setInputDescricao(event.target.value);
          }}
          placeholder="Nome"
        />
        <Button onClick={handleClick}>Pesquisar</Button>
        <Button onClick={handleClear}>Limpar</Button>
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Ativo</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr>
                  <td>{result.descricao}</td>
                  <td>
                    <Checkbox
                      isChecked={result.ativo == STATUS_ATIVO ? true : false}
                      isDisabled
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => handleEdit(result.tipodoacaoid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => handleDelete(result.tipodoacaoid, e)}
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

export default TipoDoacao;
