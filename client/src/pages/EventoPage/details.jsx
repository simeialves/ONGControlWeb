import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, getLocalEventos, getProjetos } from "../../shared/services/api";
import { formatDateNoTime } from "../Uteis/Uteis";

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
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { STATUS_ATIVO, STATUS_INATIVO } from "../../includes/const";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

const Evento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    handleLocalEvento();
    handleProjeto();
    if (id !== undefined) {
      setLoading(true);
      (async () => {
        const response = await api.get(`/eventos/${id}`);
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
          navigate("/eventos");
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
          navigate("/eventos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  async function handleVoltar() {
    navigate(`/eventos`);
  }
  async function handleClick() {
    setInputAtivo(inputAtivo == STATUS_INATIVO ? STATUS_ATIVO : STATUS_INATIVO);
  }

  async function handleLocalEvento() {
    const response = await getLocalEventos();
    setResultsLocalEventos(response.data);
  }
  async function handleProjeto() {
    const response = await getProjetos();
    setResultsProjetos(response.data);
  }
  return (
    <>
      <Headers />
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Evento</Tab>
          <Tab>Beneficiários</Tab>
          <Tab>Colaboradores</Tab>
          <Tab>Doações</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
                Cadastro de Eventos
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
                          isChecked={inputAtivo == STATUS_ATIVO ? true : false}
                        >
                          Ativo
                        </Checkbox>
                      </Box>
                    </HStack>

                    <HStack spacing={4}>
                      <Box w="40%">
                        <FormLabel htmlFor="projetoid">Projeto</FormLabel>
                        {/* <Input
                          id="projetoid"
                          size="xs"
                          borderRadius={5}
                          value={inputProjetoId}
                          onChange={(event) => {
                            setInputProjetoId(event.target.value);
                          }}
                        /> */}
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
                        <FormLabel htmlFor="datafim">Data de Término</FormLabel>
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
                      <Box w="20%">
                        <FormLabel htmlFor="nivel">Nível</FormLabel>
                        <Input
                          id="nivel"
                          size="xs"
                          borderRadius={5}
                          value={inputNivel}
                          onChange={(event) => {
                            setInputNivel(event.target.value);
                          }}
                        />
                      </Box>
                      <Box w="80%">
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
                      <Box w="100%">
                        <FormLabel htmlFor="formularionivelamento">
                          Formulário Nivelamento
                        </FormLabel>
                        <Input
                          id="formularionivelamento"
                          size="xs"
                          borderRadius={5}
                          value={inputFormularioNivelamento}
                          onChange={(event) => {
                            setInputFormularioNivelamento(event.target.value);
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
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Evento;
