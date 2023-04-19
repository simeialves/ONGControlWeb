import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, getCEP } from "../../shared/services/api";

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { Footer } from "../Footer";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

const New = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [inputNome, setInputNome] = useState("");
  const [inputCep, setInputCep] = useState("");
  const [inputLogradouro, setInputLogradouro] = useState("");
  const [inputNumero, setInputNumero] = useState("");
  const [inputComplemento, setInputComplemento] = useState("");
  const [inputBairro, setInputBairro] = useState("");
  const [inputCidade, setInputCidade] = useState("");
  const [inputUF, setInputUF] = useState("");
  const [inputPais, setInputPais] = useState("");
  const [inputLink, setInputLink] = useState("");

  useEffect(() => {
    if (id != undefined) {
      setLoading(true);
      (async () => {
        const response = await api.get(`/localeventos/${id}`);
        setInputNome(response.data[0].nome);
        setInputCep(response.data[0].cep);
        setInputLogradouro(response.data[0].logradouro);
        setInputNumero(response.data[0].numero);
        setInputComplemento(response.data[0].complemento);
        setInputBairro(response.data[0].bairro);
        setInputCidade(response.data[0].cidade);
        setInputUF(response.data[0].uf);
        setInputPais(response.data[0].pais);
        setInputLink(response.data[0].link);
      })();
      setLoading(false);
    }
  }, []);

  if (loading) {
    <SpinnerUtil />;
  }

  const handleSubmit = async () => {
    if (id == undefined) {
      return api
        .post(`/localeventos/`, {
          nome: inputNome,
          cep: inputCep,
          logradouro: inputLogradouro,
          numero: inputNumero,
          complemento: inputComplemento,
          bairro: inputBairro,
          cidade: inputCidade,
          uf: inputUF,
          pais: inputPais,
          link: inputLink,
        })
        .then(() => {
          navigate("/localeventos");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/localeventos/${id}`, {
          nome: inputNome,
          cep: inputCep,
          logradouro: inputLogradouro,
          numero: inputNumero,
          complemento: inputComplemento,
          bairro: inputBairro,
          cidade: inputCidade,
          uf: inputUF,
          pais: inputPais,
          link: inputLink,
        })
        .then(() => {
          navigate("/localeventos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkCEP = async (cep) => {
    const response = await getCEP(cep);

    if (response.data.erro === undefined) {
      setInputLogradouro(response.data.logradouro);
      setInputBairro(response.data.bairro);
      setInputCidade(response.data.localidade);
      setInputUF(response.data.uf);
      setInputPais("Brasil");
    } else {
      alert("CEP não encontrado!");
    }
  };

  async function handleVoltar() {
    navigate(`/localeventos`);
  }

  return (
    <>
      <Headers />
      <Box paddingTop={100} paddingBottom={5}>
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
                  <Box w="100%">
                    <FormLabel htmlFor="nome">Nome</FormLabel>
                    <Input
                      id="nome"
                      size="xs"
                      borderRadius={5}
                      value={inputNome}
                      onChange={(event) => {
                        setInputNome(event.target.value);
                      }}
                    />
                  </Box>
                </HStack>
                <HStack>
                  <Box w="20%">
                    <FormLabel htmlFor="cep">Cep</FormLabel>
                    <Input
                      id="cep"
                      size="xs"
                      borderRadius={5}
                      value={inputCep}
                      onChange={(event) => {
                        setInputCep(event.target.value);
                      }}
                      onBlur={(event) => {
                        checkCEP(event.target.value);
                      }}
                    />
                  </Box>
                  <Box w="80%">
                    <FormLabel htmlFor="logradouro">Logradouro</FormLabel>
                    <Input
                      id="logradouro"
                      size="xs"
                      borderRadius={5}
                      value={inputLogradouro}
                      onChange={(event) => {
                        setInputLogradouro(event.target.value);
                      }}
                    />
                  </Box>
                </HStack>

                <HStack>
                  <Box w="20%">
                    <FormLabel htmlFor="numero">Numero</FormLabel>
                    <Input
                      id="numero"
                      size="xs"
                      borderRadius={5}
                      value={inputNumero}
                      onChange={(event) => {
                        setInputNumero(event.target.value);
                      }}
                    />
                  </Box>
                  <Box w="20%">
                    <FormLabel htmlFor="complemento">Complemento</FormLabel>
                    <Input
                      id="complemento"
                      size="xs"
                      borderRadius={5}
                      value={inputComplemento}
                      onChange={(event) => {
                        setInputComplemento(event.target.value);
                      }}
                    />
                  </Box>

                  <Box w="60%">
                    <FormLabel htmlFor="bairro">Bairro</FormLabel>
                    <Input
                      id="bairro"
                      size="xs"
                      borderRadius={5}
                      value={inputBairro}
                      onChange={(event) => {
                        setInputBairro(event.target.value);
                      }}
                    />
                  </Box>
                </HStack>

                <HStack spacing={4}>
                  <Box w="80%">
                    <FormLabel htmlFor="cidade">Cidade</FormLabel>
                    <Input
                      id="cidade"
                      size="xs"
                      borderRadius={5}
                      value={inputCidade}
                      onChange={(event) => {
                        setInputCidade(event.target.value);
                      }}
                    />
                  </Box>
                  <Box w="20%">
                    <FormLabel htmlFor="uf">UF</FormLabel>
                    <Input
                      id="uf"
                      size="xs"
                      borderRadius={5}
                      value={inputUF}
                      onChange={(event) => {
                        setInputUF(event.target.value);
                      }}
                    />
                  </Box>
                </HStack>
                <HStack spacing={4}>
                  <Box w="100%">
                    <FormLabel htmlFor="uf">Link</FormLabel>
                    <Input
                      id="link"
                      size="xs"
                      borderRadius={5}
                      value={inputLink}
                      onChange={(event) => {
                        setInputLink(event.target.value);
                      }}
                    />
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
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default New;
