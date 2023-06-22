import {
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
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerUtil } from "../../../../../pages/Uteis/progress";
import { api } from "../../../../../shared/services/api";

import Container from "react-bootstrap/Container";

import { RiFileExcelLine } from "react-icons/ri";
import { saveAsExcelFile } from "../../../../../components/ExportCSV";
import { TIPO_COLABORADOR } from "../../../../../includes/const";
import { getPessoasEvento } from "../../../../../shared/services/PessoaEvento";
import { getDateHourNow } from "../../../../Uteis/Uteis";
import { ModalColaboradorInscrito } from "./ModalColaboradorInscrito";

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

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getPessoasEvento(TIPO_COLABORADOR, eventoid);
      setResults(response.data);
      setLoading(false);
    })();
  }, [eventoid]);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleDelete(id) {
    api
      .delete(`/pessoaseventos/${id}`, {})
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
              <ModalColaboradorInscrito eventoid={eventoid} />
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
                            handleDelete(result.pessoaeventoid, e)
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
