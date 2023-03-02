import React from "react";

import { useNavigate } from "react-router-dom";

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
import axios from "axios";
import { useState } from "react";
import Headers from "../Headers";

const NewClientePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const [inputNome, setInputNome] = useState("");
  const [inputDocumento, setInputDocumento] = useState("");
  const [inputUF, setInputUF] = useState("");
  const [inputCidade, setInputCidade] = useState("");
  const [inputAtribuicao, setInputAtribuicao] = useState("");
  const [inputOficio, setInputOficio] = useState("");
  const [inputTelefone, setInputTelefone] = useState("");
  const [inputObservacao, setInputObservacao] = useState("");
  const [inputServidorDedicado, setInputServidorDedicado] = useState("");
  const [inputExpedHorInicial, setInputExpedHorInicial] = useState("");
  const [inputExpedHorFinal, setInputExpedHorFinal] = useState("");
  const [inputExpedIntInicial, setInputExpedIntInicial] = useState("");
  const [inputExpedIntFinal, setInputExpedIntFinal] = useState("");
  const [inputAtivo, setInputAtivo] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const api = axios.create({
    //baseURL: "http://186.248.86.194:4444",
    baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  const handleNewCliente = async () => {
    return api
      .post("/clientes/", {
        nome: inputNome,
        documento: inputDocumento,
        uf: inputUF,
        cidade: inputCidade,
        atribuicao: inputAtribuicao,
        oficio: inputOficio,
        telefone: inputTelefone,
        observacao: inputObservacao,
        servidordedicado: "1", //inputServidorDedicado,
        expedhorinicial: "08:00:00", //inputExpedHorInicial,
        expedhorfinal: "18:00:00", //inputExpedHorFinal,
        expedintinicial: "12:00:00", //inputExpedIntInicial,
        expedintfinal: "13:00:00",
        inputExpedIntFinal,
        ativo: "1", //inputAtivo,
      })
      .then(() => {
        navigate("/clientes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function handleVoltar() {
    navigate("/clientes");
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
                <Box w="100%">
                  <FormLabel htmlFor="documento">Documento</FormLabel>
                  <Input
                    id="documento"
                    value={inputDocumento}
                    onChange={(event) => {
                      setInputDocumento(event.target.value);
                    }}
                  />
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="atribuicao">Atribuição</FormLabel>
                  <Input
                    id="atribuicao"
                    value={inputAtribuicao}
                    onChange={(event) => {
                      setInputAtribuicao(event.target.value);
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
              <HStack spacing={4}>
                <Box w="100%">
                  <FormLabel htmlFor="nasc">Observação</FormLabel>
                  <Input
                    id="nasc"
                    type="textarea"
                    value={inputObservacao}
                    onChange={(event) => {
                      setInputObservacao(event.target.value);
                    }}
                  />
                </Box>
              </HStack>
              {/* <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="cel">Celular</FormLabel>
                  <Input id="cel" type="number" />
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="telefone">Telefone</FormLabel>
                  <Input id="telefone" type="number" />
                </Box>
              </HStack>
              <HStack spacing={4}>
                <Box w="100%">
                  <FormLabel htmlFor="endereco">Endereço</FormLabel>
                  <Input id="endereco" />
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="cidade">Cidade</FormLabel>
                  <Input id="cidade" />
                </Box>
              </HStack>
              <HStack spacing={4}>
                <Box w="100%">
                  <FormLabel>Sexo</FormLabel>
                  <RadioGroup defaultValue="Masculino">
                    <HStack spacing="24px">
                      <Radio value="Masculino">Masculino</Radio>
                      <Radio value="Feminino">Feminino</Radio>
                      <Radio value="Outros">Outros</Radio>
                    </HStack>
                  </RadioGroup>
                </Box>
              </HStack> */}
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
                  onClick={handleNewCliente}
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

export default NewClientePage;
