//#region IMPORTS
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
  Checkbox,
  Flex,
  HStack,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
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

import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";

import { STATUS_ATIVO } from "../../../includes/const";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/services/api";
import Headers from "../../Headers";
import SpinnerUtil from "../../Uteis/progress";

import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../../components/ExportCSV";
import { getEventos } from "../../../shared/services/Evento";
import { Footer } from "../../Footer";
import { formatDateNoTime, getDateHourNow } from "../../Uteis/Uteis";
import { ModalEventos } from "./ModalEventos";
//#endregion

const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.descricao,
    formatDateNoTime(result.datainicio),
    formatDateNoTime(result.datafim),
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Evento", "Data_Inicio", "Data_Fim"],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Eventos");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Eventos_" + getDateHourNow() + ".xlsx"
  );
}

const MenuEventos = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const response = await getEventos(inputDescricao, inputAtivo);
    setResults(response.data);
    setLoading(false);
  }

  async function handleDelete() {
    api
      .delete(`/eventos/${id}`, {})
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
              <ModalEventos event={fetchData} />
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
                    <Td>{result.descricao}</Td>
                    <Td>
                      <Checkbox
                        isChecked={result.ativo == STATUS_ATIVO ? true : false}
                        isDisabled
                      />
                    </Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <ModalEventos
                          props={result.eventoid}
                          event={fetchData}
                        />
                      </Button>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) => handleOpenDialog(result.eventoid, e)}
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

export default MenuEventos;
