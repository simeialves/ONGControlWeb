import {
  Button,
  Checkbox,
  Stack,
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

import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getTipoDoacoes } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";
import { STATUS_ATIVO } from "../../includes/const";

const TipoDoacao = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [inputDescricao, setInputDescricao] = useState("");
  const [inputAtivo, setInputAtivo] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getTipoDoacoes();
      setResults(response.data);
      setLoading(false);
      setInputAtivo(1);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleEdit(id) {
    navigate(`/tipodoacoes/edit/${id}`);
  }

  async function handleDelete(id) {
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

  async function handleClick() {
    setLoading(true);
    setResults([]);
    const descricao = inputDescricao;
    const ativo = inputAtivo;
    api
      .get(`/tipodoacoes/filter/?descricao=${descricao}&&ativo=${ativo}`, {
        descricao: descricao,
        ativo: ativo,
      })
      .then((response) => {
        setResults(response.data);
        setMessage(false);
        setLoading(false);
        setInputDescricao("");
      })
      .catch(() => {
        setMessage(true);
        setLoading(false);
      });
  }

  async function handleClear() {
    setLoading(true);
    setInputDescricao("");
    const response = await getTipoDoacoes();
    setResults(response.data);
    setLoading(false);
  }

  async function handleNew() {
    navigate(`/tipodoacoes/new`);
  }
  return (
    <>
      <Headers />
      <br></br>

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
              />
              <InputRightElement>
                <SmallCloseIcon justify={"right"} onClick={handleClear} />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w="30%">
            <RadioGroup onChange={setInputAtivo} value={inputAtivo}>
              <Stack direction="row">
                <HStack spacing={4}>
                  <Radio value="1">Ativo</Radio>
                  <Radio value="0">Inativo</Radio>
                </HStack>
              </Stack>
            </RadioGroup>
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
                <Th>Descrição</Th>
                <Th>Ativo</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr>
                  <Td>
                    <a href={`/tipodoacoes/edit/${result.tipodoacaoid}`}>
                      {result.descricao}
                    </a>
                  </Td>
                  <Td>
                    <Checkbox
                      isChecked={result.ativo == STATUS_ATIVO ? true : false}
                      isDisabled
                    />
                  </Td>
                  <Td>
                    <EditIcon
                      boxSize={5}
                      gap={2}
                      onClick={(e) => handleEdit(result.tipodoacaoid, e)}
                    />
                    <DeleteIcon
                      boxSize={5}
                      gap={2}
                      onClick={(e) => handleDelete(result.tipodoacaoid, e)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default TipoDoacao;
