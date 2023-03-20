import {
  Button,
  Checkbox,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";

import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { STATUS_ATIVO } from "../../includes/const";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getEventos } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";

const Evento = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [inputDescricao, setInputDescricao] = useState("");
  const [inputAtivo, setInputAtivo] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getEventos();
      setResults(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleEdit(id) {
    navigate(`/eventos/edit/${id}`);
  }

  function handleDelete(id) {
    api
      .delete(`/eventos/${id}`, {})
      .then(() => {
        navigate("/eventos");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleClick() {
    setLoading(true);
    setResults([]);
    const descricao = inputDescricao;
    const ativo = inputAtivo;
    api
      .get(`/eventos/filter/?descricao=${descricao}&&ativo=${ativo}`, {
        descricao: descricao,
        ativo: ativo,
      })
      .then((response) => {
        console.log(response);
        setResults(response.data);
        setMessage(false);
        setLoading(false);
        setInputDescricao("");
      })
      .catch(() => {
        setLoading(false);
        setResults([]);
        setMessage(true);
      });
  }

  async function handleClear() {
    setLoading(true);
    setInputDescricao("");
    const response = await getEventos();
    setResults(response.data);
    setLoading(false);
  }

  async function handleNew() {
    navigate(`/eventos/new`);
  }

  return (
    <>
      <Headers />
      <br></br>

      <Container fluid="md">
        <HStack spacing="4" justify={"right"}>
          <Button
            variant="outline"
            colorScheme="gray"
            gap={2}
            onClick={handleNew}
            size="sm"
            marginBottom={2}
          >
            <AddIcon /> Nova
          </Button>
        </HStack>
        <barradeBotoesSuperior />
        <HStack>
          <Box w="70%">
            <InputGroup>
              <Input
                onChange={(event) => {
                  setInputDescricao(event.target.value);
                }}
                placeholder="Pesquisar pela descrição"
                size="sm"
                borderRadius={5}
              />
              <InputRightElement>
                <SmallCloseIcon justify={"right"} onClick={handleClear} />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w="30%">
            <RadioGroup onChange={setInputAtivo} value={inputAtivo}>
              <Stack direction="row">
                <HStack spacing={4}>
                  <Radio value="1">Ativo</Radio>
                  <Radio value="0">Inativo</Radio>
                </HStack>
              </Stack>
            </RadioGroup>
          </Box>

          <Button
            variant="solid"
            gap={2}
            w={120}
            p="1"
            bg="gray.600"
            color="white"
            fontSize="x1"
            _hover={{ bg: "gray.800" }}
            onClick={handleClick}
            size="sm"
          >
            <SearchIcon />
            Pesquisar
          </Button>
        </HStack>
        <br></br>
        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption>Quantidade: {results.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Ativo</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr>
                  <Td>
                    <a href={`/eventos/edit/${result.eventoid}`}>
                      {result.descricao}
                    </a>
                  </Td>
                  <Td>
                    <Checkbox
                      isChecked={result.ativo == STATUS_ATIVO ? true : false}
                      isDisabled
                    />
                  </Td>
                  <Td>
                    <EditIcon
                      boxSize={5}
                      gap={2}
                      onClick={(e) => handleEdit(result.eventoid, e)}
                    />
                    <DeleteIcon
                      boxSize={5}
                      gap={2}
                      onClick={(e) => handleDelete(result.eventoid, e)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>

      {/* <Container fluid="md">
        <Button href="/eventos/new">Novo</Button>
        <br />
        <br />
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
                      onClick={(e) => handleEdit(result.eventoid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => handleDelete(result.eventoid, e)}
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
      </Container> */}
    </>
  );
};

export default Evento;
