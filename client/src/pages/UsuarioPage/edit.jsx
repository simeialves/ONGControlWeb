import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADMINISTRADOR, STATUS_INATIVO } from "../../includes/const";
import { api } from "../../shared/services/api";
import { Footer } from "../Footer";
import Headers from "../Headers";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputNome, setInputNome] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputSenha, setInputSenha] = useState("");
  const [inputSenha2, setInputSenha2] = useState("");
  const [inputAdministrador, setInputAdministrador] = useState("");

  const [show, setShow] = React.useState(false);
  const handleClickPassword = () => setShow(!show);

  async function AlterarSenha() {
    const response = await api.get(`/usuarios/${id}`);
    if (
      response.data[0].senha !== inputSenha &&
      response.data[0].senha2 !== inputSenha2
    ) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    (async () => {
      const response = await api.get(`/usuarios/${id}`);
      setInputNome(response.data[0].nome);
      setInputEmail(response.data[0].login);
      setInputSenha(response.data[0].senha);
      setInputSenha2(response.data[0].senha);
      setInputAdministrador(response.data[0].administrador);
    })();
  }, [id]);

  const handleSubmit = async () => {
    if (AlterarSenha) {
      return api
        .put(`/usuarios/${id}`, {
          nome: inputNome,
          login: inputEmail,
          senha: inputSenha,
          senha2: inputSenha2,
          administrador: inputAdministrador,
        })
        .then(() => {
          navigate("/usuarios");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/usuarios/${id}`, {
          nome: inputNome,
          login: inputEmail,
        })
        .then(() => {
          navigate("/usuarios");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  async function handleVoltar() {
    navigate(`/usuarios`);
  }

  async function handleClick() {
    setInputAdministrador(
      inputAdministrador == STATUS_INATIVO ? ADMINISTRADOR : STATUS_INATIVO
    );
  }

  return (
    <>
      <Headers />
      <Box h="100vh">
        <Flex
          align="center"
          justify="center"
          bg="blackAlpha.200"
          h="calc(100vh-150px)"
        >
          <Center
            w="100%"
            maxW={800}
            bg="white"
            top={150}
            position="absolute"
            borderRadius={5}
            p="6"
            boxShadow="0 1px 2px #ccc"
          >
            <FormControl display="flex" flexDir="column" gap="4">
              <HStack spacing={4}>
                <Box w="80%">
                  <FormLabel htmlFor="nome">Nome</FormLabel>
                  <Input
                    id="nome"
                    size={"xs"}
                    borderRadius={5}
                    placeholder="Nome"
                    value={inputNome}
                    onChange={(event) => {
                      setInputNome(event.target.value);
                    }}
                  />
                </Box>
                <Box w="20%">
                  <FormLabel htmlFor="administrador"></FormLabel>
                  <Checkbox
                    onChange={handleClick}
                    isChecked={
                      inputAdministrador == ADMINISTRADOR ? true : false
                    }
                  >
                    Administrador
                  </Checkbox>
                </Box>
              </HStack>
              <HStack>
                <Box w="100%">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    id="email"
                    size={"xs"}
                    borderRadius={5}
                    placeholder="E-mail"
                    value={inputEmail}
                    onChange={(event) => {
                      setInputEmail(event.target.value);
                    }}
                  />
                </Box>
              </HStack>
              <HStack>
                <Box w="100%">
                  <FormLabel htmlFor="senha">Senha</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      id="senha"
                      size={"xs"}
                      borderRadius={5}
                      placeholder="Senha"
                      value={inputSenha}
                      onChange={(event) => {
                        setInputSenha(event.target.value);
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="xs"
                        onClick={handleClickPassword}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </HStack>
              <HStack>
                <Box w="100%">
                  <FormLabel htmlFor="senha2">Repetir Senha</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      id="senha2"
                      size={"xs"}
                      borderRadius={5}
                      placeholder="Repita a senha"
                      value={inputSenha2}
                      onChange={(event) => {
                        setInputSenha2(event.target.value);
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="xs"
                        onClick={handleClickPassword}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </HStack>
              <HStack spacing="4" justify={"right"}>
                <Button
                  w={240}
                  p="6"
                  type="submit"
                  bg="blue.600"
                  color="white"
                  fontWeight="bold"
                  fontSize="x1"
                  _hover={{ bg: "blue.800" }}
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>
                <Button
                  w={100}
                  p="5"
                  type="submit"
                  colorScheme="gray"
                  bg="gray.100"
                  color="black"
                  variant="outline"
                  fontWeight="bold"
                  fontSize="x1"
                  _hover={{ bg: "gray.300" }}
                  onClick={handleVoltar}
                  gap={2}
                  size="xs"
                  marginBottom={2}
                >
                  Cancelar
                </Button>
              </HStack>
            </FormControl>
          </Center>
        </Flex>
        <Footer />
      </Box>
    </>
  );
};

export default Edit;
