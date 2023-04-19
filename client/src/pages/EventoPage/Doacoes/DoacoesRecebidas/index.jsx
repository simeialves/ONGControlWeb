import {
  Box,
  Button,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../shared/services/api";

import { DeleteIcon } from "@chakra-ui/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDoacaoEvento } from "../../../../shared/services/DoacaoEvento";
import { SpinnerUtil } from "../../../Uteis/progress";
import { formatDate } from "../../../Uteis/Uteis";
import { ModalDoacaoRecebida } from "./ModalDoacaoRecebida";

export default function DoacoesRecebidas({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getDoacaoEvento(eventoid);
      setResults(response.data);

      setLoading(false);
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
      .delete(`/doacaoeventos/${id}`, {})
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
        <Box boxShadow={"lg"} marginBottom={2}>
          <Box bg="red.800" w="100%" p={4} color="white">
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
              size="sm"
              marginTop={2}
              marginBottom={2}
              marginRight={2}
            >
              <ModalDoacaoRecebida eventoid={eventoid} />
            </Button>
          </HStack>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>Quantidade: {results.length}</TableCaption>
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
                {results.map((result) => (
                  <Tr>
                    <Td>{result.tipodoacaodescricao}</Td>
                    <Td>{result.doacaoeventoquantidade}</Td>
                    <Td>{result.pessoanome}</Td>
                    <Td>{formatDate(result.doacaoeventodatadoacao)}</Td>
                    <Td>{result.pessoatelefone}</Td>
                    <Td>{result.pessoaemail}</Td>

                    <Td>
                      {/* <Button size={"xs"} bg={"write"}>
                      <EditIcon
                        color={"blue.800"}
                        boxSize={5}
                        onClick={(e) => handleEdit(result.doacaoeventoid, e)}
                      />
                    </Button> */}
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleDelete(result.doacaoeventoid, e)
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
