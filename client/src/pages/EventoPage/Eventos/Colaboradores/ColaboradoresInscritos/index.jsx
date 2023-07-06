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
  Flex,
  Heading,
  HStack,
  Link,
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

import { DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { SpinnerUtil } from "../../../../../pages/Uteis/progress";
import { api } from "../../../../../shared/services/api";

import Container from "react-bootstrap/Container";

import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../../../../components/ExportCSV";
import { TIPO_COLABORADOR } from "../../../../../includes/const";
import { getPessoasEvento } from "../../../../../shared/services/PessoaEvento";
import { getDateHourNow } from "../../../../Uteis/Uteis";
import { ModalColaboradorInscrito } from "./ModalColaboradorInscrito";
//#endregion

const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.descricao,
    result.nome,
    result.documento,
    result.telefone,
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Descricao", "Nome", "Documento", "Telefone"],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Colaboradores Inscritos");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Colaboradores_Inscritos_" + getDateHourNow() + ".xlsx"
  );
}

export default function ColaboradoresInscritosPage({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const toast = useToast();

  async function fetchData() {
    setResults([]);
    const response = await getPessoasEvento(TIPO_COLABORADOR, eventoid, "");
    setResults(response.data);
  }

  useEffect(() => {
    fetchData();
  }, [eventoid]);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleDelete() {
    await api
      .delete(`/pessoaseventos/${id}`, {})
      .then(() => {
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
        <Box shadow={"center"} boxShadow="md" borderRadius={5}>
          <Box bg="red.800" w="100%" p={4} color="white">
            <HStack spacing="4" justify={"center"}>
              <Heading
                size={{
                  base: "xs",
                  md: "md",
                }}
              >
                Colaboradores Inscritos
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
              <ModalColaboradorInscrito
                eventoid={eventoid}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                fetchData={fetchData}
              />
            </Button>
          </HStack>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>Quantidade: {results.length}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Descrição</Th>
                  <Th>Nome</Th>
                  <Th>Documento</Th>
                  <Th>Telefone</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>{result.descricao}</Td>
                    <Td>
                      <Link href={`/pessoas/edit/${result.pessoaid}`}>
                        {result.nome}
                      </Link>
                    </Td>
                    <Td>{result.documento}</Td>
                    <Td>{result.telefone}</Td>
                    <Td>
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
          <Box padding={5}>
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
