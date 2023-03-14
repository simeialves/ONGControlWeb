import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../shared/services/api";

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
} from "@chakra-ui/react";
import { useState } from "react";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

const New = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [inputDescricao, setInputDescricao] = useState("");
  const [inputAtivo, setInputAtivo] = useState("");

  useEffect(() => {
    if (id != undefined) {
      (async () => {
        const response = await api.get(`/tipodoacoes/${id}`);
        setInputDescricao(response.data[0].descricao);
        setInputAtivo(response.data[0].ativo);
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
        .post(`/tipodoacoes/`, {
          descricao: inputDescricao,
          ativo: inputAtivo,
        })
        .then(() => {
          navigate("/tipodoacoes");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(inputDescricao + " - " + inputAtivo);
      return api
        .put(`/tipodoacoes/${id}`, {
          descricao: inputDescricao,
          ativo: inputAtivo,
        })
        .then(() => {
          navigate("/tipodoacoes");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  async function handleVoltar() {
    navigate(`/tipodoacoes`);
  }

  async function aoTrocarValor() {
    if (inputAtivo == 0) {
      setInputAtivo(1);
    } else {
      setInputAtivo(0);
    }
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
          Cadastro de Tipo de Doações
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
                <Box w="90%">
                  <FormLabel htmlFor="nome">Descrição</FormLabel>
                  <Input
                    id="nome"
                    value={inputDescricao}
                    onChange={(event) => {
                      setInputDescricao(event.target.value);
                    }}
                  />
                </Box>
                <Box w="10%">
                  <FormLabel htmlFor="ativo"></FormLabel>
                  <Checkbox
                    onChange={aoTrocarValor}
                    isChecked={inputAtivo == 1 ? true : false}
                  >
                    Ativo
                  </Checkbox>
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
