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
  Link,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { RiFileExcelLine } from "react-icons/ri";

import {
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
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import { Box, HStack, Input, InputGroup } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import { getPessoas } from "../../shared/services/Pessoas";

import "bootstrap/dist/css/bootstrap.min.css";
import { saveAsExcelFile } from "../../components/ExportCSV";
import { Footer } from "../Footer";
import { getDateHourNow } from "../Uteis/Uteis";

const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.nome,
    result.documento,
    result.telefone,
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Nome", "Documento", "Telefone"],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Pessoas");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Pessoas_" + getDateHourNow() + ".xlsx"
  );
}

const Pessoa = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputNome, setInputNome] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  async function fetchData() {
    const response = await getPessoas();
    setResults(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleNew() {
    navigate("/pessoas/new");
  }
  async function handleEdit(id) {
    navigate(`/pessoas/edit/${id}`);
  }
  async function handleDelete() {
    await api
      .delete(`/pessoas/${id}`, {})
      .then(() => {
        toast({
          title: "Pessoa excluída com sucesso",
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
        setLoading(false);
        setInputNome("");
      })
      .catch(() => {
        setLoading(false);
      });
  }
  async function handleClear() {
    setLoading(true);
    setInputNome("");
    const response = await getPessoas();
    setResults(response.data);
    setLoading(false);
  }
  async function handleOpenDialog(id) {
    setId(id);
    onOpen();
  }

  return (
    <>
      <Headers />
      <Box paddingTop={100} paddingBottom={5}>
        <Container fluid="md">
          <HStack spacing="4" justify={"right"}>
            <Button
              id="btnNovo"
              variant="outline"
              colorScheme="gray"
              gap={2}
              onClick={handleNew}
              size="sm"
              marginBottom={2}
            >
              <AddIcon /> Nova
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
                  <Th>Telefone</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr key={result.pessoaid}>
                    <Td>
                      <Link href={`/pessoas/edit/${result.pessoaid}`}>
                        {result.nome}
                      </Link>
                    </Td>
                    <Td>{result.documento}</Td>
                    <Td>{result.telefone}</Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <EditIcon
                          name="btnEditar"
                          color={"blue.800"}
                          boxSize={5}
                          onClick={(e) => handleEdit(result.pessoaid, e)}
                        />
                      </Button>
                      <Button size={"xs"} bg={"write"} name="btnDelete">
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) => handleOpenDialog(result.pessoaid, e)}
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
              <RiFileExcelLine /> CSV
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

export default Pessoa;
