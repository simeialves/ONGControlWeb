//#region IMPORTS
import { DeleteIcon } from "@chakra-ui/icons";
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
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { getDoacaoEventoPessoaByPessoaEventoId } from "../../../../shared/services/DoacaoEventoPessoa";
import { api } from "../../../../shared/services/api";
//#endregion

function ModalDoacaoBeneficiarioPage(props) {
  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState([]);

  const pessoaEventoId = props.props.pessoaeventoid;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [pessoaEventoId]);

  async function fetchData() {
    setResults([]);
    const response = await getDoacaoEventoPessoaByPessoaEventoId(
      pessoaEventoId
    );
    setResults(response.data);
  }

  async function handleOpenDialog(id) {
    setId(id);
    onOpen();
  }

  const handleDelete = async () => {
    await api
      .delete(`/doacaoeventospessoas/${id}`)
      .then((result) => {
        fetchData();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
    toast({
      title: "Registro excluído com sucesso",
      position: "bottom-left",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    await fetchData();
    onClose();
  };
  return (
    <>
      <Container fluid="md">
        <Box shadow={"center"} boxShadow="md" padding={5} borderRadius={5}>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>Quantidade: {results.length}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Descrição</Th>
                  <Th>Quantidade</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>{result.descricao}</Td>
                    <Td>{result.quantidade}</Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleOpenDialog(result.doacaoeventopessoaid, e)
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

export default ModalDoacaoBeneficiarioPage;
