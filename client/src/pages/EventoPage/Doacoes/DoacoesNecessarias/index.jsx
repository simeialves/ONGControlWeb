import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { Box, Heading, HStack } from "@chakra-ui/react";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

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

  async function handleDelete() {
    await api
      .delete(`/tipodoacaoeventos/${id}`, {})
      .then(() => {
        toast({
          title: "Registro excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchData();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleModalClose() {
    setIsModalOpen(false);
    fetchData();
  }

  async function handleOpenDialog(id) {
    setId(id);
    onOpen();
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
                          handleOpenDialog(result.tipodoacaoeventoid, e)
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

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Apagar registro?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Tem certeza que deseja apagar o registro selecionado?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Sim
            </Button>
            <Button ref={cancelRef} ml={3} onClick={onClose}>
              Cancelar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
