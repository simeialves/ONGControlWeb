import {
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

import { Box, HStack } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import { TIPO_COLABORADOR } from "../../../includes/const";
import { getPessoasEvento } from "../../../shared/services/PessoaEvento";
import { getTipoColaboradorEventos } from "../../../shared/services/TipoColaboradorEvento";
import { ModalColaboradorNecessario } from "./ColaboradoresNecessarios/ModalColaboradorNecessario";

export default function Colaboradores({ eventoid }) {
  const [results, setResults] = useState([]);
  const [doacoesRealizadas, setDoacaoesRealizadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [inputNome, setInputNome] = useState("");
  const [inputAtivo, setInputAtivo] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const responseTipoColaboradorEvento = await getTipoColaboradorEventos(
        eventoid
      );
      setDoacaoesRealizadas(responseTipoColaboradorEvento.data);

      const response = await getPessoasEvento(TIPO_COLABORADOR, eventoid);
      setResults(response.data);

      setMessage(false);
    })();
  }, [eventoid]);

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
        <Box bg="gray.600" w="100%" p={4} color="white">
          <HStack spacing="4" justify={"center"}>
            <Heading
              size={{
                base: "xs",
                md: "md",
              }}
            >
              Colaboradores Necessários
            </Heading>
          </HStack>
        </Box>
        <HStack spacing="4" justify={"right"}>
          <Button
            variant="outline"
            colorScheme="gray"
            gap={2}
            size="sm"
            marginTop={2}
            marginBottom={2}
          >
            <ModalColaboradorNecessario eventoid={eventoid} />
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption>Quantidade: {results.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Qtd. Necessárias</Th>
                <Th>Qtd. Inscritos</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {doacoesRealizadas.map((result) => (
                <Tr>
                  <Td>{result.descricao}</Td>
                  <Td>{result.quantidade}</Td>
                  <Td>{result.quantidadeinscritos}</Td>

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
              Colaboradores Inscritos
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
                <Th>Nome</Th>
                <Th>Documento</Th>
                <Th>Telefone</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr>
                  <Td>{result.descricao}</Td>
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
