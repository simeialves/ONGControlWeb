//#region IMPORTS
import React, { useEffect } from "react";
import { api } from "../../../shared/services/api";

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
import { STATUS_ATIVO, STATUS_INATIVO } from "../../../includes/const";

import SpinnerUtil from "../../Uteis/progress";
//#endregion

const ModalTipoColaboradorPage = (props) => {
  const [id] = useState(props.props);

  const [loading, setLoading] = useState(true);

  const [inputDescricao, setInputDescricao] = useState("");
  const [inputAtivo, setInputAtivo] = useState("");

  useEffect(() => {
    if (id != undefined) {
      setLoading(true);
      (async () => {
        const response = await api.get(`/tipocolaboradores/${id}`);
        setInputDescricao(response.data[0].descricao);
        setInputAtivo(response.data[0].ativo);
      })();
      setLoading(false);
    } else {
      setInputAtivo(STATUS_ATIVO);
    }
  }, [id]);

  if (loading) {
    <SpinnerUtil />;
  }

  const handleSubmit = async () => {
    if (id == undefined) {
      return api
        .post(`/tipocolaboradores/`, {
          descricao: inputDescricao,
          ativo: inputAtivo,
        })
        .then(() => {
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/tipocolaboradores/${id}`, {
          descricao: inputDescricao,
          ativo: inputAtivo,
        })
        .then(() => {
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  async function handleClick() {
    setInputAtivo(inputAtivo == STATUS_INATIVO ? STATUS_ATIVO : STATUS_INATIVO);
  }

  async function handleCloseModal() {
    props.event();
  }

  return (
    <>
      <Box paddingTop={100} paddingBottom={5}>
        <Box>
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
              top={10}
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
                      size="xs"
                      borderRadius={5}
                      value={inputDescricao}
                      onChange={(event) => {
                        setInputDescricao(event.target.value);
                      }}
                    />
                  </Box>
                  <Box w="10%">
                    <Checkbox
                      id="ativo"
                      size="md"
                      borderRadius={5}
                      paddingTop={8}
                      onChange={handleClick}
                      isChecked={inputAtivo == STATUS_ATIVO ? true : false}
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
                    p="5"
                    type="submit"
                    colorScheme="gray"
                    bg="gray.100"
                    color="black"
                    variant="outline"
                    fontWeight="bold"
                    fontSize="x1"
                    _hover={{ bg: "gray.300" }}
                    onClick={handleCloseModal}
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
    </>
  );
};

export default ModalTipoColaboradorPage;
