import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Checkbox,
  Flex,
  Link,
  Spacer,
  Stack,
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

import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";

import {
  Box,
  HStack,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";
import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../components/ExportCSV";
import { STATUS_ATIVO } from "../../includes/const";
import { getTipoDoacoes } from "../../shared/services/TipoDoacao";
import { Footer } from "../Footer";
import { getDateHourNow } from "../Uteis/Uteis";

const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.descricao,
    result.ativo == STATUS_ATIVO ? "Ativo" : "Inativo",
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Descricao", "Status"],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Tipo de Doações");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Tipo_De_Doacoes_" + getDateHourNow() + ".xlsx"
  );
}

const TipoDoacao = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [inputDescricao, setInputDescricao] = useState("");
  const [inputAtivo, setInputAtivo] = useState(STATUS_ATIVO);

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
    const response = await getTipoDoacoes(inputDescricao, inputAtivo);
    setResults(response.data);
    setLoading(false);
  }

  async function handleNew() {
    navigate(`/tipodoacoes/new`);
  }

  async function handleEdit(id) {
    navigate(`/tipodoacoes/edit/${id}`);
  }

  async function handleDelete() {
    api
      .delete(`/tipodoacoes/${id}`, {})
      .then(() => {
        navigate("/tipodoacoes");
        window.location.reload(false);
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

  return (
    <>
      <Headers />
      <Box paddingTop={100} paddingBottom={5}>
        <Container fluid="md">
          <HStack spacing="4" justify={"right"}>
            <Button
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
                    setInputDescricao(event.target.value);
                  }}
                  placeholder="Pesquisar pela descrição"
                  size="sm"
                  borderRadius={5}
                  onKeyPress={(event) => handleKeyPress(event)}
                />
              </InputGroup>
            </Box>
            <Box w="30%" display={"flex"} gap={2}>
              <RadioGroup defaultValue="1" onChange={setInputAtivo}>
                <Stack direction="row">
                  <HStack spacing={4}>
                    <Radio value="1">Ativo</Radio>
                    <Radio value="0">Inativo</Radio>
                  </HStack>
                </Stack>
              </RadioGroup>
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
            </Box>
          </HStack>
          <br></br>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>Quantidade: {results.length}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Descrição</Th>
                  <Th>Ativo</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>
                      <Link href={`/tipodoacoes/edit/${result.tipodoacaoid}`}>
                        {result.descricao}
                      </Link>
                    </Td>
                    <Td>
                      <Checkbox
                        isChecked={result.ativo == STATUS_ATIVO ? true : false}
                        isDisabled
                      />
                    </Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <EditIcon
                          color={"blue.800"}
                          boxSize={5}
                          onClick={(e) => handleEdit(result.tipodoacaoid, e)}
                        />
                      </Button>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleOpenDialog(result.tipodoacaoid, e)
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

export default TipoDoacao;
