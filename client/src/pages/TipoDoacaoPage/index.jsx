import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { api, getTipoDoacoes } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import {
  Box,
  Checkbox,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { STATUS_ATIVO } from "../../includes/const";

const TipoDoacao = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [inputDescricao, setInputDescricao] = useState("");
  const [inputAtivo, setInputAtivo] = useState(true);

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
    const descricao = inputDescricao;
    const ativo = inputAtivo;
    api
      .post(`/tipodoacoes/filter`, {
        descricao: descricao,
        ativo: ativo,
      })
      .then((response) => {
        console.log(response.data);
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
        <HStack spacing={4}>
          <Box w="70%">
            <Input
              onChange={(event) => {
                setInputDescricao(event.target.value);
              }}
              placeholder="Nome"
            />
          </Box>
          <Box w="30%">
            <RadioGroup onChange={setInputAtivo} value={inputAtivo}>
              <Stack direction="row">
                <HStack spacing={4}>
                  <Radio checked value="1">
                    Ativo
                  </Radio>
                  <Radio value="0">Inativo</Radio>
                </HStack>
              </Stack>
            </RadioGroup>
          </Box>
        </HStack>
        <Box margin={2}>
          <Button padding={20} onClick={handleClick}>
            Pesquisar
          </Button>
          <Button padding={20} onClick={handleClear}>
            Limpar
          </Button>
        </Box>
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
