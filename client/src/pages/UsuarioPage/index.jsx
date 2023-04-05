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
  useDisclosure,
} from "@chakra-ui/react";

import {
  InputRightElement,
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

import { Box, HStack, Input, InputGroup } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import { ADMINISTRADOR } from "../../includes/const";
import { getUsuarios } from "../../shared/services/Usuarios/Index";

const Usuario = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [inputNome, setInputNome] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getUsuarios();
      setResults(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  async function handleNew() {
    navigate("/usuarios/new");
  }
  function handleEdit(id) {
    navigate(`/usuarios/edit/${id}`);
  }
  function handleDelete() {
    api
      .delete(`/usuarios/${id}`, {})
      .then(() => {
        navigate("/usuarios");
        window.location.reload(false);
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
      .get(`/usuarios/filter/?nome=${nome}`, {
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
    const response = await getUsuarios();
    setResults(response.data);
    setLoading(false);
  }
  async function handleOpenDialog(id) {
    setId(id);
    onOpen();
  }
  return (
    // <>
    //   <Headers />
    //   <br></br>
    //   <Container fluid="md">
    //     <Button href="/usuarios/new">Novo</Button>
    //     <br />
    //     <br />
    //     <Row>
    //       <Table striped bordered hover size="sm">
    //         <thead>
    //           <tr>
    //             <th scope="col">Nome</th>
    //             <th scope="col">Login</th>
    //             <th scope="col">Administrador</th>
    //             <th colspan="2">Ação</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {results.map((result) => (
    //             <tr>
    //               <td>{result.nome}</td>
    //               <td>{result.login}</td>
    //               <td>
    //                 <Checkbox
    //                   isChecked={
    //                     result.administrador == ADMINISTRADOR ? true : false
    //                   }
    //                   isDisabled
    //                 />
    //               </td>
    //               <td>
    //                 <button
    //                   class="btn btn-primary"
    //                   onClick={(e) => handleEdit(result.usuarioid, e)}
    //                 >
    //                   Editar
    //                 </button>
    //               </td>
    //               <td>
    //                 <button
    //                   class="btn btn-danger"
    //                   onClick={(e) => handleDelete(result.usuarioid, e)}
    //                 >
    //                   Excluir
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </Table>
    //     </Row>
    //     <label>Quantidade: {results.length}</label>
    //   </Container>
    // </>
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
                <Th>Login</Th>
                <Th>Administrador</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((result) => (
                <Tr>
                  <Td>
                    <a href={`/usuarios/edit/${result.usuarioid}`}>
                      {result.nome}
                    </a>
                  </Td>
                  <Td>{result.login}</Td>
                  <Td>
                    <Checkbox
                      isChecked={
                        result.administrador == ADMINISTRADOR ? true : false
                      }
                      isDisabled
                    />
                  </Td>
                  <Td>
                    <Button size={"xs"} bg={"write"}>
                      <EditIcon
                        color={"blue.800"}
                        boxSize={5}
                        onClick={(e) => handleEdit(result.usuarioid, e)}
                      />
                    </Button>
                    <Button size={"xs"} bg={"write"}>
                      <DeleteIcon
                        color={"red.500"}
                        boxSize={5}
                        onClick={(e) => handleOpenDialog(result.usuarioid, e)}
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

export default Usuario;
