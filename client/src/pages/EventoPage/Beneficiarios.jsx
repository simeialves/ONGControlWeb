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
import { api } from "../../shared/services/api";
import SpinnerUtil from "../Uteis/progress";

import { Box, HStack, Input, InputGroup } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import { getPessoasEvento } from "../../shared/services/api";

import "bootstrap/dist/css/bootstrap.min.css";

const Beneficiarios = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [inputNome, setInputNome] = useState("");
  const [inputAtivo, setInputAtivo] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getPessoasEvento();
      setResults(response.data);
      setLoading(false);
      setMessage(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {
    navigate(`/pessoas/edit/${id}`);
  }
  async function handleDelete(id) {
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
    setResults([]);
    const nome = inputNome;
    api
      .get(`/pessoas/filter/?nome=${nome}`, {
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
    const response = await getPessoasEvento();
    setResults(response.data);
    setLoading(false);
  }
  async function handleNew() {
    navigate("/pessoas/new");
  }
  return (
    <>
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
                <Th>Documento</Th>
                <Th>Telefone</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr>
                  <Td>
                    <a href={`/pessoas/edit/${result.pessoaid}`}>
                      {result.nome}
                    </a>
                  </Td>
                  <Td>{result.documento}</Td>
                  <Td>{result.telefone}</Td>
                  <Td>
                    <Button size={"xs"} bg={"write"}>
                      <EditIcon
                        color={"blue.800"}
                        boxSize={5}
                        onClick={(e) => handleEdit(result.pessoaid, e)}
                      />
                    </Button>
                    <Button size={"xs"} bg={"write"}>
                      <DeleteIcon
                        color={"red.500"}
                        boxSize={5}
                        onClick={(e) => handleDelete(result.pessoaid, e)}
                      />
                    </Button>
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

export default Beneficiarios;
