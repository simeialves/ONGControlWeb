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
  DeleteIcon,
  EditIcon,
  SearchIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerUtil from "../../Uteis/progress";

import { Box, HStack, Input, InputGroup } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import { getDoacaoEventoPessoa } from "../../../shared/services/DoacaoEventoPessoa";
import { getPessoasEvento } from "../../../shared/services/PessoaEvento";
import { api } from "../../../shared/services/api";
import { ModalBeneficiario } from "./ModalBeneficiario";

export default function Beneficiarios({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputNome, setInputNome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [eventoid]);

  async function fetchData() {
    const response = await getDoacaoEventoPessoa(eventoid);
    setResults(response.data);
    console.log(eventoid);
  }

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {
    navigate(`/pessoas/edit/${id}`);
  }
  async function handleDelete(id) {
    api
      .delete(`/pessoaseventos/${id}`, {})
      .then(() => {
        // navigate(`/eventos/edit/${id}`);
        window.location.reload(true);
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
    const response = await getPessoasEvento(eventoid);
    setResults(response.data);
    setLoading(false);
  }

  async function handleModalClose() {
    setIsModalOpen(false);
    fetchData();
  }
  return (
    <>
      <Container fluid="md">
        <Box shadow={"center"} boxShadow="md" padding={5} borderRadius={5}>
          <HStack spacing="4" justify={"right"}>
            <Button
              variant="outline"
              colorScheme="gray"
              gap={2}
              size="sm"
              marginBottom={2}
            >
              <ModalBeneficiario
                eventoid={eventoid}
                isOpen={isModalOpen}
                onClose={handleModalClose}
              />
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
                  <Th>E-mail</Th>
                  <Th>Senha</Th>
                  <Th></Th>
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
                    <Td>{result.email}</Td>
                    <Td>{result.senharetirada}</Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <EditIcon
                          color={"blue.800"}
                          boxSize={5}
                          onClick={(e) => handleEdit(result.pessoaeventoid, e)}
                        />
                      </Button>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleDelete(result.pessoaeventoid, e)
                          }
                        />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
