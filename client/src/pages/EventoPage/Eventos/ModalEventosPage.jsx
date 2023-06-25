//#region IMPORTS
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { STATUS_ATIVO, STATUS_INATIVO } from "../../../includes/const";
import {
  getLocalEventos,
  getProjetos,
} from "../../../shared/services/LocalEvento";
import { formatDateNoTime } from "../../Uteis/Uteis";
import SpinnerUtil from "../../Uteis/progress";
import Beneficiarios from "./Beneficiarios";
import Colaboradores from "./Colaboradores";
import Doacoes from "./Doacoes";
//#endregion

const ModalEventosPage = (props) => {
  const [id] = useState(props.props);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [eventoId, setEventoId] = useState("");

  const [inputProjetoId, setInputProjetoId] = useState("");
  const [inputDescricao, setInputDescricao] = useState("");
  const [inputDataInicio, setInputDataInicio] = useState("");
  const [inputDataFim, setInputDataFim] = useState("");
  const [inputNivel, setInputNivel] = useState("");
  const [inputTipo, setInputTipo] = useState("");
  const [inputFormularioNivelamento, setInputFormularioNivelamento] =
    useState("");
  const [inputLocalEventoId, setInputLocalEventoId] = useState("");
  const [inputAtivo, setInputAtivo] = useState("");

  const [resultsLocalEventos, setResultsLocalEventos] = useState([]);
  const [resultsProjetos, setResultsProjetos] = useState([]);

  const handleChange = (value) => setInputNivel(value);

  useEffect(() => {
    console.log(props);
    handleLocalEvento();
    handleProjeto();
    if (id !== undefined) {
      setLoading(true);
      (async () => {
        const response = await api.get(`/eventos/${id}`);
        setEventoId(response.data[0].eventoid);
        setInputProjetoId(response.data[0].projetoid);
        setInputDescricao(response.data[0].descricao);
        setInputDataInicio(formatDateNoTime(response.data[0].datainicio));
        setInputDataFim(formatDateNoTime(response.data[0].datafim));
        setInputNivel(response.data[0].nivel);
        setInputTipo(response.data[0].tipo);
        setInputFormularioNivelamento(response.data[0].formularionivelamento);
        setInputLocalEventoId(response.data[0].localeventoid);
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
        .post(`/eventos/`, {
          projetoid: inputProjetoId,
          descricao: inputDescricao,
          datainicio: inputDataInicio,
          datafim: inputDataFim,
          nivel: inputNivel,
          tipo: inputTipo,
          formularionivelamento: inputFormularioNivelamento,
          localeventoid: inputLocalEventoId,
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
        .put(`/eventos/${id}`, {
          projetoid: inputProjetoId,
          descricao: inputDescricao,
          datainicio: inputDataInicio,
          datafim: inputDataFim,
          nivel: inputNivel,
          tipo: inputTipo,
          formularionivelamento: inputFormularioNivelamento,
          localeventoid: inputLocalEventoId,
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

  async function handleCloseModal() {
    props.event();
  }

  async function handleClick() {
    setInputAtivo(inputAtivo == STATUS_INATIVO ? STATUS_ATIVO : STATUS_INATIVO);
  }

  async function handleLocalEvento() {
    const response = await getLocalEventos("");
    setResultsLocalEventos(response.data);
  }

  async function handleProjeto() {
    const response = await getProjetos();
    setResultsProjetos(response.data);
  }
  return (
    <>
      <Box>
        <Container fluid="md">
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Evento</Tab>
              <Tab>Beneficiários</Tab>
              <Tab>Colaboradores</Tab>
              <Tab>Doações</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <Flex
                    align="center"
                    justify="center"
                    // bg="blackAlpha.200"
                    h="calc(100vh-150px)"
                  >
                    <Center
                      w="100%"
                      maxW={800}
                      bg="white"
                      // top={30}
                      // position="absolute"
                      borderRadius={5}
                      p="6"
                      boxShadow="0 1px 2px #ccc"
                    >
                      <FormControl display="flex" flexDir="column" gap="4">
                        <HStack spacing={4}>
                          <Box w="90%">
                            <FormLabel htmlFor="descricao">Descrição</FormLabel>
                            <Input
                              id="descricao"
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
                              isChecked={
                                inputAtivo == STATUS_ATIVO ? true : false
                              }
                            >
                              Ativo
                            </Checkbox>
                          </Box>
                        </HStack>

                        <HStack spacing={4}>
                          <Box w="40%">
                            <FormLabel htmlFor="projetoid">Projeto</FormLabel>
                            <Select
                              id="projetoid"
                              size={"xs"}
                              borderRadius={5}
                              placeholder="Selecione"
                              value={inputProjetoId}
                              onChange={(event) => {
                                setInputProjetoId(event.target.value);
                              }}
                            >
                              {resultsProjetos.map((result) => (
                                <option
                                  key={result.projetoid}
                                  value={result.projetoid}
                                >
                                  {result.descricao}
                                </option>
                              ))}
                            </Select>
                          </Box>

                          <Box w="30%">
                            <FormLabel htmlFor="datainicio">
                              Data de Início
                            </FormLabel>
                            <Input
                              id="datainicio"
                              size="xs"
                              borderRadius={5}
                              value={inputDataInicio}
                              onChange={(event) => {
                                setInputDataInicio(event.target.value);
                              }}
                              type="date"
                            />
                          </Box>
                          <Box w="30%">
                            <FormLabel htmlFor="datafim">
                              Data de Término
                            </FormLabel>
                            <Input
                              size="xs"
                              borderRadius={5}
                              value={inputDataFim}
                              onChange={(event) => {
                                setInputDataFim(event.target.value);
                              }}
                              type="date"
                            />
                          </Box>
                        </HStack>

                        <HStack spacing={4}>
                          <Box w="100%">
                            <FormLabel htmlFor="localeventoid">
                              Local do Evento
                            </FormLabel>
                            <Select
                              id="localeventoid"
                              size={"xs"}
                              borderRadius={5}
                              placeholder="Selecione"
                              value={inputLocalEventoId}
                              onChange={(event) => {
                                setInputLocalEventoId(event.target.value);
                              }}
                            >
                              {resultsLocalEventos.map((result) => (
                                <option
                                  key={result.localeventoid}
                                  value={result.localeventoid}
                                >
                                  {result.nome}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        </HStack>

                        <HStack spacing={4}>
                          <Box w="80%">
                            <FormLabel htmlFor="formularionivelamento">
                              Formulário Nivelamento
                            </FormLabel>
                            <Input
                              id="formularionivelamento"
                              size="xs"
                              borderRadius={5}
                              value={inputFormularioNivelamento}
                              onChange={(event) => {
                                setInputFormularioNivelamento(
                                  event.target.value
                                );
                              }}
                            />
                          </Box>
                          <Box w="20%">
                            <FormLabel htmlFor="nivel">Nível</FormLabel>
                            <NumberInput
                              id="nivel"
                              size={"xs"}
                              step={1}
                              defaultValue={1}
                              min={1}
                              max={999}
                              value={inputNivel}
                              onChange={handleChange}
                            >
                              <NumberInputField borderRadius={5} />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
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
              </TabPanel>
              <TabPanel>
                <Beneficiarios eventoid={eventoId} />
              </TabPanel>
              <TabPanel>
                <Colaboradores eventoid={eventoId} />
              </TabPanel>
              <TabPanel>
                <Doacoes eventoid={eventoId} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </>
  );
};

export default ModalEventosPage;