import { Box, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

function ParametroPage() {
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

  return (
    <>
      <FormControl display="flex" flexDir="column" gap="4">
        <HStack spacing={4}>
          <Box w="100%">
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <Input
              id="nome"
              size="sm"
              borderRadius={5}
              value={inputNome}
              onChange={(event) => {
                setInputNome(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Box w="100%">
            <FormLabel htmlFor="documento">Documento</FormLabel>
            <Input
              id="documento"
              size="sm"
              borderRadius={5}
              value={inputDocumento}
              onChange={(event) => {
                setInputDocumento(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Box w="30%">
            <FormLabel htmlFor="telefone">Telefone</FormLabel>
            <Input
              id="telefone"
              size="sm"
              borderRadius={5}
              value={inputTelefone}
              onChange={(event) => {
                setInputTelefone(event.target.value);
              }}
            />
          </Box>
          <Box w="70%">
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              size="sm"
              borderRadius={5}
              value={inputEmail}
              onChange={(event) => {
                setInputEmail(event.target.value);
              }}
            />
          </Box>
        </HStack>

        <HStack spacing={4}>
          <Box w="30%">
            <FormLabel htmlFor="cep">Cep</FormLabel>
            <Input
              id="cep"
              size="sm"
              borderRadius={5}
              value={inputCEP}
              onChange={(event) => {
                setInputCEP(event.target.value);
              }}
            />
          </Box>
          <Box w="70%">
            <FormLabel htmlFor="logradouro">Logradouro</FormLabel>
            <Input
              id="logradouro"
              size="sm"
              borderRadius={5}
              value={inputLogradouro}
              onChange={(event) => {
                setInputLogradouro(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="30%">
            <FormLabel htmlFor="numero">Número</FormLabel>
            <Input
              id="numero"
              size="sm"
              borderRadius={5}
              value={inputNumero}
              onChange={(event) => {
                setInputNumero(event.target.value);
              }}
            />
          </Box>
          <Box w="70%">
            <FormLabel htmlFor="complemento">Complemento</FormLabel>
            <Input
              id="complemento"
              size="sm"
              borderRadius={5}
              value={inputComplemento}
              onChange={(event) => {
                setInputComplemento(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="100%">
            <FormLabel htmlFor="bairro">Bairro</FormLabel>
            <Input
              id="bairro"
              size="sm"
              borderRadius={5}
              value={inputBairro}
              onChange={(event) => {
                setInputBairro(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="80%">
            <FormLabel htmlFor="cidade">Cidade</FormLabel>
            <Input
              id="cidade"
              size="sm"
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
              size="sm"
              borderRadius={5}
              value={inputUF}
              onChange={(event) => {
                setInputUF(event.target.value);
              }}
            />
          </Box>
        </HStack>

        <HStack spacing="4" justify={"right"}>
          {/* <Button
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
            gap={2}
            size="sm"
            marginBottom={2}
          >
            Cancelar
          </Button> */}
        </HStack>
      </FormControl>
    </>
  );
}

export default ParametroPage;
