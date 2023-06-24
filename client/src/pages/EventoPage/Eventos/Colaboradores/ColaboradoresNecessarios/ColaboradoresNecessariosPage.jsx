//#region IMPORTS
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTipoColaboradorEventos } from "../../../../../shared/services/TipoColaboradorEvento";
import { api } from "../../../../../shared/services/api";
import SpinnerUtil from "../../../../Uteis/progress";

import Container from "react-bootstrap/Container";

import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../../../../components/ExportCSV";
import { getDateHourNow } from "../../../../Uteis/Uteis";
import { ModalColaboradorNecessario } from "./ModalColaboradorNecessario";
//#endregion
const XLSX = require("xlsx");

async function exportToExcel(data) {
  const workbook = XLSX.utils.book_new();
  const sheetData = data.map((result) => [
    result.descricao,
    result.quantidade,
    result.quantidadeinscritos,
  ]);
  const sheet = XLSX.utils.aoa_to_sheet([
    ["Descricao", "Qtd._Necessarias", "Qtd._Inscritos"],
    ...sheetData,
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Colaboradores Necessários");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcelFile(
    excelBuffer,
    "Relatorio_Colaboradores_Necessarios_" + getDateHourNow() + ".xlsx"
  );
}

export default function ColaboradoresNecessariosPage({ eventoid }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getTipoColaboradorEventos(eventoid);
      setResults(response.data);
      setLoading(false);
    })();
  }, [eventoid]);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {
    navigate(`/tipocolaboradoreventos/edit/${id}`);
  }
  async function handleDelete(id) {
    api
      .delete(`/tipocolaboradoreventos/${id}`, {})
      .then(() => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
                Colaboradores Necessários
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
              <ModalColaboradorNecessario eventoid={eventoid} />
            </Button>
          </HStack>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>Quantidade: {results.length}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Descrição</Th>
                  <Th>Qtd. Necessárias</Th>
                  <Th>Qtd. Inscritos</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>{result.descricao}</Td>
                    <Td>{result.quantidade}</Td>
                    <Td>{result.quantidadeinscritos}</Td>

                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <EditIcon
                          color={"blue.800"}
                          boxSize={5}
                          onClick={(e) =>
                            handleEdit(result.tipocolaboradoreventoid, e)
                          }
                        />
                      </Button>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleDelete(result.tipocolaboradoreventoid, e)
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
    </>
  );
}
