import {
  Button,
  InputRightElement,
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getLocalEventos } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import { Box, HStack, Input, InputGroup } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";

const LocalEvento = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [inputNome, setInputNome] = useState("");
  const [inputAtivo, setInputAtivo] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getLocalEventos();
      setResults(response.data);
      setLoading(false);
      setMessage(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {
    navigate(`/localeventos/edit/${id}`);
  }
  async function handleDelete(id) {
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
  async function handleClick() {
    setLoading(true);
    setResults([]);
    const nome = inputNome;
    api
      .get(`/localeventos/filter/?nome=${nome}`, {
        nome: nome,
      })
      .then((response) => {
        setResults(response.data);
        setMessage(false);
        setLoading(false);
        setInputNome("");
      })
      .catch(() => {
        setMessage(true);
        setLoading(false);
      });
  }
  async function handleClear() {
    setLoading(true);
    setInputNome("");
    const response = await getLocalEventos();
    setResults(response.data);
    setLoading(false);
  }
  async function handleNew() {
    navigate("/localeventos/new");
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
        <HStack>
          <Box w="70%">
            <InputGroup>
              <Input
                onChange={(event) => {
                  setInputNome(event.target.value);
                }}
                placeholder="Pesquisar por nome"
                size="sm"
                borderRadius={5}
              />
              <InputRightElement>
                <SmallCloseIcon justify={"right"} onClick={handleClear} />
              </InputRightElement>
            </InputGroup>
          </Box>
          {/* <Box w="30%">
            <RadioGroup onChange={setInputAtivo} value={inputAtivo}>
              <Stack direction="row">
                <HStack spacing={4}>
                  <Radio value="1">Ativo</Radio>
                  <Radio value="0">Inativo</Radio>
                </HStack>
              </Stack>
            </RadioGroup>
          </Box> */}
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
                <Th>Nome</Th>
                <Th>Endereço</Th>
                <Th>Bairro</Th>
                <Th>Cidade</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr>
                  <Td>
                    <a href={`/localeventos/edit/${result.localeventoid}`}>
                      {result.nome}
                    </a>
                  </Td>
                  <Td>
                    {result.logradouro}, {result.numero}
                  </Td>
                  <Td>{result.bairro}</Td>
                  <Td>{result.cidade}</Td>
                  <Td>
                    <EditIcon
                      boxSize={5}
                      gap={2}
                      onClick={(e) => handleEdit(result.localeventoid, e)}
                    />
                    <DeleteIcon
                      boxSize={5}
                      gap={2}
                      onClick={(e) => handleDelete(result.localeventoid, e)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default LocalEvento;
