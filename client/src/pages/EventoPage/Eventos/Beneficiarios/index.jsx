//#region IMPORTS
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
  useToast,
} from "@chakra-ui/react";

import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import SpinnerUtil from "../../../Uteis/progress";

import { Box, HStack, Input, InputGroup } from "@chakra-ui/react";
import Container from "react-bootstrap/Container";

import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../../../components/ExportCSV";
import { TIPO_BENEFICIARIO } from "../../../../includes/const";
import { getPessoasEvento } from "../../../../shared/services/PessoaEvento";
import { api } from "../../../../shared/services/api";
import { getDateHourNow } from "../../../Uteis/Uteis";
import { ModalBeneficiario } from "./ModalBeneficiario";
import { ModalDoacaoBeneficiario } from "./ModalDoacaoBeneficiario";
//#endregion
const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.nome,
    result.documento,
    result.email,
    result.senharetirada,
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Nome", "Documento", "Email", "Senha_de_Retirada"],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Beneficiários");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Beneficiarios_" + getDateHourNow() + ".xlsx"
  );
}

export default function Beneficiarios({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputNome, setInputNome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, [eventoid]);

  async function fetchData() {
    setResults([]);
    const response = await getPessoasEvento(
      TIPO_BENEFICIARIO,
      eventoid,
      inputNome
    );
    setResults(response.data);
  }

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleDelete() {
    await api
      .delete(`/pessoaseventos/${id}`, {})
      .then(async (result) => {
        api
          .delete(`doacaoeventospessoas/${result.id}`, {})
          .then(async () => {
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
        fetchData();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleClick() {
    fetchData();
  }

  async function handleCloseModal() {
    setIsModalOpen(false);
    fetchData();
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
      <Container fluid="md">
        <Box shadow={"center"} boxShadow="md" padding={5} borderRadius={5}>
          <HStack spacing="4" justify={"right"}>
            <Button
              variant="outline"
              colorScheme="gray"
              gap={2}
              size="sm"
              marginBottom={2}
            >
              <ModalBeneficiario
                eventoid={eventoid}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                fetchData={fetchData}
              />
            </Button>
          </HStack>
          <HStack>
            <Box w="70%">
              <InputGroup>
                <Input
                  value={inputNome}
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
                  <Th>E-mail</Th>
                  <Th>Senha</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>{result.nome}</Td>
                    <Td>{result.documento}</Td>
                    <Td>{result.email}</Td>
                    <Td>{result.senharetirada}</Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <ModalDoacaoBeneficiario
                          pessoaeventoid={result.pessoaeventoid}
                          isOpen={isModalOpen}
                          onClose={handleCloseModal}
                        />
                      </Button>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleOpenDialog(result.pessoaeventoid, e)
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
