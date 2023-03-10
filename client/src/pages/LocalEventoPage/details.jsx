import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../shared/services/api";

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

  async function handleVoltar() {
    navigate(`/localeventos`);
  }

  return (
    <>
      <Headers />
      <Box h="100vh">
        <Center
          as="header"
          h={150}
          bg="gray.100"
          color={"blue.800"}
          fontWeight="bold"
          fontSize={"4x1"}
          pb="8"
        >
          Cadastro de Local dos Eventos
        </Center>
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
                    value={inputCep}
                    onChange={(event) => {
                      setInputCep(event.target.value);
                    }}
                  />
                </Box>
                <Box w="80%">
                  <FormLabel htmlFor="logradouro">Logradouro</FormLabel>
                  <Input
                    id="logradouro"
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
                  p="6"
                  type="submit"
                  bg="gray.600"
                  color="white"
                  fontWeight="bold"
                  fontSize="x1"
                  _hover={{ bg: "gray.800" }}
                  onClick={handleVoltar}
                >
                  Cancelar
                </Button>
              </HStack>
            </FormControl>
          </Center>
        </Flex>
      </Box>
    </>
  );
};

export default New;
