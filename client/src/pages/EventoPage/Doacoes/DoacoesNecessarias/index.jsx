import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../shared/services/api";
import { SpinnerUtil } from "../../../Uteis/progress";

import Container from "react-bootstrap/esm/Container";

import { getTipoDoacaoEventos } from "../../../../shared/services/TipoDoacaoEvento";
import { ModalDoacaoNecessaria } from "./ModalDoacaoNecessaria";

export default function DoacoesNecessarias({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  async function fetchData() {
    const response = await getTipoDoacaoEventos(eventoid);
    setResults(response.data);
  }

  useEffect(() => {
    fetchData();
  }, [eventoid]);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {
    navigate(`/pessoas/edit/${id}`);
  }

  async function handleDelete(id) {
    api
      .delete(`/tipodoacaoeventos/${id}`, {})
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleModalClose() {
    setIsModalOpen(false);
    fetchData();
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
            size="sm"
            marginTop={2}
            marginBottom={2}
          >
            <ModalDoacaoNecessaria
              eventoid={eventoid}
              isOpen={isModalOpen}
              onClose={handleModalClose}
            />
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
                    <Link href={`/pessoas/edit/${result.pessoaid}`}>
                      {result.descricao}
                    </Link>
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
                        onClick={(e) =>
                          handleDelete(result.tipodoacaoeventoid, e)
                        }
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
