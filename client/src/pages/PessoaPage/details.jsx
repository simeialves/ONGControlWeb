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
  const [inputDocumento, setInputDocumento] = useState("");
  const [inputSexo, setInputSexo] = useState("");
  const [inputDtNascimento, setInputDtNascimento] = useState("");
  const [inputTelefone, setInputTelefone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCEP, setInputCEP] = useState("");
  const [inputLogradouro, setInputLogradouro] = useState("");
  const [inputNumero, setInputNumero] = useState("");
  const [inputComplemento, setInputComplemento] = useState("");
  const [inputBairro, setInputBairro] = useState("");
  const [inputCidade, setInputCidade] = useState("");
  const [inputUF, setInputUF] = useState("");
  const [inputPais, setInputPais] = useState("");
  const [inputTipo, setInputTipo] = useState("");

  useEffect(() => {
    if (id != undefined) {
      setLoading(true);
      (async () => {
        const response = await api.get(`/pessoas/${id}`);
        setInputNome(response.data[0].nome);
        setInputDocumento(response.data[0].documento);
        setInputSexo(response.data[0].sexo);
        setInputDtNascimento(response.data[0].dtnascimento);
        setInputTelefone(response.data[0].telefone);
        setInputEmail(response.data[0].email);
        setInputCEP(response.data[0].cep);
        setInputLogradouro(response.data[0].logradouro);
        setInputNumero(response.data[0].numero);
        setInputComplemento(response.data[0].complemento);
        setInputBairro(response.data[0].bairro);
        setInputCidade(response.data[0].cidade);
        setInputUF(response.data[0].uf);
        setInputPais(response.data[0].pais);
        setInputTipo(response.data[0].tipo);
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
        .post(`/pessoas/`, {
          nome: inputNome,
          documento: inputDocumento,
          sexo: inputSexo,
          dtnascimento: inputDtNascimento,
          telefone: inputTelefone,
          email: inputEmail,
          cep: inputCEP,
          logradouro: inputLogradouro,
          numero: inputNumero,
          complemento: inputComplemento,
          bairro: inputBairro,
          cidade: inputCidade,
          uf: inputUF,
          pais: inputPais,
          tipo: inputTipo,
        })
        .then(() => {
          navigate("/pessoas");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/pessoas/${id}`, {
          nome: inputNome,
          documento: inputDocumento,
          sexo: inputSexo,
          dtnascimento: inputDtNascimento,
          telefone: inputTelefone,
          email: inputEmail,
          cep: inputCEP,
          logradouro: inputLogradouro,
          numero: inputNumero,
          complemento: inputComplemento,
          bairro: inputBairro,
          cidade: inputCidade,
          uf: inputUF,
          pais: inputPais,
          tipo: inputTipo,
        })
        .then(() => {
          navigate("/pessoas");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  async function handleVoltar() {
    navigate(`/pessoas`);
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
          Cadastro de Clientes
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
                <Box w="50%">
                  <FormLabel htmlFor="documento">Documento</FormLabel>
                  <Input
                    id="documento"
                    value={inputDocumento}
                    onChange={(event) => {
                      setInputDocumento(event.target.value);
                    }}
                  />
                </Box>
                <Box w="20%">
                  <FormLabel htmlFor="sexo">Sexo</FormLabel>
                  <Input
                    id="sexo"
                    value={inputSexo}
                    onChange={(event) => {
                      setInputSexo(event.target.value);
                    }}
                  />
                </Box>
                <Box w="30%">
                  <FormLabel htmlFor="dtnascimento">
                    Data de Nascimento
                  </FormLabel>
                  <Input
                    id="dtnascimento"
                    value={inputDtNascimento}
                    onChange={(event) => {
                      setInputDtNascimento(event.target.value);
                    }}
                  />
                </Box>
              </HStack>
              <HStack spacing={4}>
                <Box w="77%">
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
              <HStack>
                <Box w="100%">
                  <FormLabel htmlFor="telefone">Telefone</FormLabel>
                  <Input
                    id="telefone"
                    value={inputTelefone}
                    onChange={(event) => {
                      setInputTelefone(event.target.value);
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
