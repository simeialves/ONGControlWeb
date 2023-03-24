import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/services/api";
import SpinnerUtil from "../../Uteis/progress";

import { HStack } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import { getDoacaoEvento } from "../../../shared/services/DoacaoEvento";
import { getTipoDoacaoEventos } from "../../../shared/services/TipoDoacaoEvento";
import { formatDate } from "../../Uteis/Uteis";

export default function Doacoes({ eventoid, tipodoacaoid }) {
  const [results, setResults] = useState([]);
  const [doacoesRealizadas, setDoacaoesRealizadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [inputNome, setInputNome] = useState("");
  const [inputAtivo, setInputAtivo] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getTipoDoacaoEventos(eventoid, tipodoacaoid);
      const responseDoacaoEvento = await getDoacaoEvento(eventoid);
      setResults(response.data);
      setDoacaoesRealizadas(responseDoacaoEvento);
      setLoading(false);
      setMessage(false);
    })();
  }, [eventoid, tipodoacaoid]);

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
    const response = await getTipoDoacaoEventos();
    setResults(response.data);
    setLoading(false);
  }
  async function handleNew() {
    navigate("/pessoas/new");
  }
  return (
    <>
      <Container fluid="md">
        <Box bg="gray.600" w="100%" p={4} color="white">
          <HStack spacing="4" justify={"center"}>
            <Heading
              size={{
                base: "xs",
                md: "md",
              }}
            >
              Doações Necessárias
            </Heading>
          </HStack>
        </Box>
        <HStack spacing="4" justify={"right"}>
          <Button
            variant="outline"
            colorScheme="gray"
            gap={2}
            onClick={handleNew}
            size="sm"
            marginTop={2}
            marginBottom={2}
          >
            <AddIcon /> Nova
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption>Quantidade: {results.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Qtd. Necessárias</Th>
                <Th>Qtd. Doações Recebidas</Th>
                <Th>Qtd. Doações Realizadas</Th>
                <Th>Saldo</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr>
                  <Td>
                    <a href={`/pessoas/edit/${result.pessoaid}`}>
                      {result.descricao}
                    </a>
                  </Td>
                  <Td>{result.quantidade}</Td>
                  <Td>{result.quantidaderecebidas}</Td>
                  <Td>{result.quantidaderealizadas}</Td>
                  <Td>
                    {result.quantidaderecebidas - result.quantidaderealizadas}
                  </Td>
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
                        onClick={(e) => handleDelete(result.pessoaeventoid, e)}
                      />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>

      <Container fluid="md">
        <Box bg="gray.600" w="100%" p={4} color="white">
          <HStack spacing="4" justify={"center"}>
            <Heading
              size={{
                base: "xs",
                md: "md",
              }}
            >
              Doações Recebidas
            </Heading>
          </HStack>
        </Box>

        <HStack spacing="4" justify={"right"}>
          <Button
            variant="outline"
            colorScheme="gray"
            gap={2}
            onClick={handleNew}
            size="sm"
            marginTop={2}
            marginBottom={2}
          >
            <AddIcon /> Nova
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption>Quantidade: {doacoesRealizadas.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Quantidade</Th>
                <Th>Doador</Th>
                <Th>Data Doação</Th>
                <Th>Telefone</Th>
                <Th>E-mail</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {doacoesRealizadas.map((result) => (
                <Tr>
                  <Td>{result.tipodoacaodescricao}</Td>
                  <Td>{result.doacaoeventoquantidade}</Td>
                  <Td>{result.pessoanome}</Td>
                  <Td>{formatDate(result.doacaoeventodatadoacao)}</Td>
                  <Td>{result.pessoatelefone}</Td>
                  <Td>{result.pessoaemail}</Td>

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
                        onClick={(e) => handleDelete(result.pessoaeventoid, e)}
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
}
