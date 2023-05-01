import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../shared/services/api";

import { DeleteIcon } from "@chakra-ui/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDoacaoEvento } from "../../../../shared/services/DoacaoEvento";
import { formatDate } from "../../../Uteis/Uteis";
import { SpinnerUtil } from "../../../Uteis/progress";
import { ModalDoacaoRecebida } from "./ModalDoacaoRecebida";

export default function DoacoesRecebidas({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  async function fetchData() {
    const response = await getDoacaoEvento(eventoid);
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
      .delete(`/doacaoeventos/${id}`, {})
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
              <ModalDoacaoRecebida
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
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleOpenDialog(result.doacaoeventoid, e)
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
