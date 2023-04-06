import {
  Box,
  Button,
  HStack,
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

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTipoColaboradorEventos } from "../../../../shared/services/TipoColaboradorEvento";
import { api } from "../../../../shared/services/api";
import SpinnerUtil from "../../../Uteis/progress";

import Container from "react-bootstrap/Container";

import { ModalColaboradorNecessario } from "./ModalColaboradorNecessario";

export default function ColaboradoresNecessariosPage({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getTipoColaboradorEventos(eventoid);
      setResults(response.data);

      setLoading(false);
    })();
  }, [eventoid]);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {
    navigate(`/tipocolaboradoreventos/edit/${id}`);
  }
  async function handleDelete(id) {
    api
      .delete(`/tipocolaboradoreventos/${id}`, {})
      .then(() => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
              {results.map((result) => (
                <Tr>
                  <Td>{result.descricao}</Td>
                  <Td>{result.quantidade}</Td>
                  <Td>{result.quantidadeinscritos}</Td>

                  <Td>
                    <Button size={"xs"} bg={"write"}>
                      <EditIcon
                        color={"blue.800"}
                        boxSize={5}
                        onClick={(e) =>
                          handleEdit(result.tipocolaboradoreventoid, e)
                        }
                      />
                    </Button>
                    <Button size={"xs"} bg={"write"}>
                      <DeleteIcon
                        color={"red.500"}
                        boxSize={5}
                        onClick={(e) =>
                          handleDelete(result.tipocolaboradoreventoid, e)
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
