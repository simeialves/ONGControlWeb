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
import { api } from "../../../../../shared/services/api";
import { SpinnerUtil } from "../../../../Uteis/progress";

import Container from "react-bootstrap/esm/Container";

import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../../../../components/ExportCSV";
import { getTipoDoacaoEventos } from "../../../../../shared/services/TipoDoacaoEvento";
import { getDateHourNow } from "../../../../Uteis/Uteis";
import { ModalDoacaoNecessaria } from "./ModalDoacaoNecessaria";

const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.descricao,
    result.quantidade,
    result.quantidaderecebidas,
    result.quantidaderealizadas,
    result.quantidaderecebidas - result.quantidaderealizadas,
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    [
      "Descricao",
      "Qtd._Necessaria",
      "Qtd._Doacoes_Recebidas",
      "Qtd._Doacoes_Realizadas",
      "Saldo",
    ],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Doações Necessárias");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Doacoes_Necessarias_" + getDateHourNow() + ".xlsx"
  );
}

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
        <Box boxShadow={"lg"} marginBottom={2}>
          <Box bg="red.800" w="100%" p={4} color="white">
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
              marginRight={2}
            >
              <ModalDoacaoNecessaria
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
          <Box padding={5}>
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