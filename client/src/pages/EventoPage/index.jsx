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
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
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

import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";

import { STATUS_ATIVO } from "../../includes/const";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import { getEventos } from "../../shared/services/Evento";

const Evento = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [inputDescricao, setInputDescricao] = useState("");
  const [inputAtivo, setInputAtivo] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getEventos();
      setResults(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleNew() {
    navigate(`/eventos/new`);
  }

  async function handleClick() {
    setLoading(true);
    setResults([]);
    const descricao = inputDescricao;
    const ativo = inputAtivo;
    api
      .get(`/eventos/filter/?descricao=${descricao}&&ativo=${ativo}`, {
        descricao: descricao,
        ativo: ativo,
      })
      .then((response) => {
        console.log(response);
        setResults(response.data);
        setMessage(false);
        setLoading(false);
        setInputDescricao("");
      })
      .catch(() => {
        setLoading(false);
        setResults([]);
        setMessage(true);
      });
  }

  function handleEdit(id) {
    navigate(`/eventos/edit/${id}`);
  }

  function handleDelete() {
    api
      .delete(`/eventos/${id}`, {})
      .then(() => {
        navigate("/eventos");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleClear() {
    setLoading(true);
    setInputDescricao("");
    const response = await getEventos();
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
        <barradeBotoesSuperior />
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
                    <Link href={`/eventos/edit/${result.eventoid}`}>
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
                        onClick={(e) => handleEdit(result.eventoid, e)}
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
};

export default Evento;
