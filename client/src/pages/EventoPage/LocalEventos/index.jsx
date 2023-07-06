import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/services/api";
import Headers from "../../Headers";
import SpinnerUtil from "../../Uteis/progress";

import { Box, HStack, Input, InputGroup } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../../components/ExportCSV";
import { getLocalEventos } from "../../../shared/services/LocalEvento";
import { Footer } from "../../Footer";
import { getDateHourNow } from "../../Uteis/Uteis";
import { ModalLocalEventos } from "./ModalLocalEventos";

const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.nome,
    result.logradouro + ", " + result.numero,
    result.bairro,
    result.cidade,
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Nome", "Endereco", "Bairro", "Cidade"],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Local dos Eventos");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Local_De_Eventos_" + getDateHourNow() + ".xlsx"
  );
}

const MenuLocalEventos = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputNome, setInputNome] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function fetchData() {
    setResults([]);
    const response = await getLocalEventos(inputNome);
    setResults(response.data);
    setLoading(false);
  }

  async function handleNew() {
    navigate("/localeventos/new");
  }

  async function handleEdit(id) {
    navigate(`/localeventos/edit/${id}`);
  }

  async function handleDelete() {
    api
      .delete(`/localeventos/${id}`, {})
      .then(() => {
        onClose();
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleOpenDialog(id) {
    setId(id);
    onOpen();
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetchData();
    }
  }

  const handleSetId = async (id) => {
    await props.event(id);
  };

  return (
    <>
      <Headers />
      <Box paddingTop={150} paddingBottom={5}>
        <Container fluid="md">
          <HStack spacing="4" justify={"right"}>
            <Button>
              <ModalLocalEventos event={fetchData} />
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
                  onKeyPress={(event) => handleKeyPress(event)}
                />
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
              onClick={fetchData}
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
                  <Th>Endereço</Th>
                  <Th>Bairro</Th>
                  <Th>Cidade</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>

              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>{result.nome}</Td>
                    <Td>
                      {result.numero != ""
                        ? result.logradouro + ", " + result.numero
                        : result.logradouro}
                    </Td>
                    <Td>{result.bairro}</Td>
                    <Td>{result.cidade}</Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <ModalLocalEventos
                          event={fetchData}
                          props={result.localeventoid}
                        />
                      </Button>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleOpenDialog(result.localeventoid, e)
                          }
                        />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex display={"flex"}>
            <Spacer />
            <Button
              colorScheme="gray"
              size={"sm"}
              gap={2}
              onClick={() => exportToExcel(results)}
            >
              <RiFileExcelLine /> Excel
            </Button>
          </Flex>
        </Container>
      </Box>
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
      <Footer />
    </>
  );
};
export default MenuLocalEventos;
