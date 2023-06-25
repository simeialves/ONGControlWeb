//#region IMPORTS
import {
  Button,
  Flex,
  InputRightElement,
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

import {
  DeleteIcon,
  SearchIcon,
  SmallCloseIcon,
  ViewIcon,
} from "@chakra-ui/icons";
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

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [eventoid]);

  async function fetchData() {
    // const response = await getDoacaoEventoPessoa(eventoid);
    const response = await getPessoasEvento(TIPO_BENEFICIARIO, eventoid);
    setResults(response.data);
  }

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {}
  async function handleDelete(id) {
    api
      .delete(`/pessoaseventos/${id}`, {})
      .then((result) => {
        api
          .delete(`doacaoeventospessoas/${result.id}`, {})
          .then(() => {
            window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
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
        setMessage(false);
        setLoading(false);
        setInputNome("");
      })
      .catch(() => {
        setMessage(true);
        setLoading(false);
      });
  }
  async function handleClear() {
    setLoading(true);
    setInputNome("");
    const response = await getPessoasEvento(eventoid);
    setResults(response.data);
    setLoading(false);
  }

  async function handleCloseModal() {
    setIsModalOpen(false);
    fetchData();
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
              />
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
                  <Th>E-mail</Th>
                  <Th>Senha</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>
                      <a href={`/pessoas/edit/${result.pessoaid}`}>
                        {result.nome}
                      </a>
                    </Td>
                    <Td>{result.documento}</Td>
                    <Td>{result.email}</Td>
                    <Td>{result.senharetirada}</Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <ViewIcon
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
      </Container>
    </>
  );
}
