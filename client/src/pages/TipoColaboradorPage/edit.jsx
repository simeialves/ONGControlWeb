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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../shared/services/api";
import Headers from "../Headers";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputDescricao, setInputDescricao] = useState("");

  const handleSubmit = async () => {
    return api
      .put(`/tipocolaboradores/${id}`, {
        descricao: inputDescricao,
      })
      .then(() => {
        navigate("/tipocolaboradores");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVoltar = async () => {
    navigate("/tipocolaboradores");
  };
  useEffect(() => {
    (async () => {
      const response = await api.get(`/tipocolaboradores/${id}`);
      console.log(response);
      setInputDescricao(response.data[0].descricao);
    })();
  }, []);

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
          Cadastro de Tipo de Colaboradores
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
                  <FormLabel htmlFor="nome">Descrição</FormLabel>
                  <Input
                    id="nome"
                    value={inputDescricao}
                    onChange={(event) => {
                      setInputDescricao(event.target.value);
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

export default Edit;
