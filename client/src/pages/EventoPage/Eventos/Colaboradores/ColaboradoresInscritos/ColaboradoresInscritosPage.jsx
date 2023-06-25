//#region IMPORTS
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { TIPO_COLABORADOR } from "../../../../../includes/const";
import { getPessoas } from "../../../../../shared/services/Pessoas";
import { getTipoColaboradorEventos } from "../../../../../shared/services/TipoColaboradorEvento";
import { api } from "../../../../../shared/services/api";
//#endregion
function ColaboradoresInscritosPage(props) {
  const [loading, setLoading] = useState(false);

  const [inputTipoColaboradorEventoid, setTipoColaboradorEventoid] =
    useState("");
  const [inputPessoaid, setPessoaid] = useState("");

  const [tipoDoacaoes, setTipoColaboradorEvento] = useState([]);
  const [pessoas, setPessoas] = useState([]);

  const id = props.eventoid.eventoid;

  useEffect(() => {
    setLoading(true);
    handleTipoColaboradoresEvento();
    handlePessoas();
    setLoading(false);
  }, [id]);

  async function handleTipoColaboradoresEvento() {
    const response = await getTipoColaboradorEventos(id);
    setTipoColaboradorEvento(response.data);
  }

  async function handlePessoas() {
    const response = await getPessoas("");
    setPessoas(response.data);
  }

  const handleSubmit = async () => {
    if (id != undefined) {
      return api
        .post(`/pessoaseventos/`, {
          pessoaid: inputPessoaid,
          tipocolaboradoreventoid: inputTipoColaboradorEventoid,
          eventoid: id,
          tipo: TIPO_COLABORADOR,
          status: 0,
          senharetirada: 0,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/pessoaseventos/${id}`, {
          pessoaid: inputPessoaid,
          tipocolaboradoreventoid: inputTipoColaboradorEventoid,
          eventoid: id,
          tipo: TIPO_COLABORADOR,
          status: 0,
          senharetirada: 0,
        })
        .then(() => {
          navigate("/eventos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCloseModal = async () => {
    await handleSubmit();
    props.event();
  };

  return (
    <>
      <FormControl display="flex" flexDir="column" gap="1">
        <HStack spacing={4}>
          <Box w="100%">
            <FormLabel htmlFor="tipodoacaoid">Tipo de Colaborador</FormLabel>
            <Select
              id="tipodoacaoid"
              size={"xs"}
              borderRadius={5}
              placeholder="Selecione"
              value={inputTipoColaboradorEventoid}
              onChange={(event) => {
                setTipoColaboradorEventoid(event.target.value);
              }}
            >
              {tipoDoacaoes.map((result) => (
                <option
                  key={result.tipocolaboradoreventoid}
                  value={result.tipocolaboradoreventoid}
                >
                  {result.descricao}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Box w="100%">
            <FormLabel htmlFor="pessoaid">Colaborador</FormLabel>
            <Select
              id="pessoaid"
              size={"xs"}
              borderRadius={5}
              placeholder="Selecione"
              value={inputPessoaid}
              onChange={(event) => {
                setPessoaid(event.target.value);
              }}
            >
              {pessoas.map((result) => (
                <option key={result.pessoaid} value={result.pessoaid}>
                  {result.nome}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>

        <HStack marginTop={5} spacing="4" justify={"right"}>
          <Button
            w={240}
            p="6"
            type="submit"
            bg="blue.600"
            color="white"
            fontWeight="bold"
            fontSize="x1"
            _hover={{ bg: "blue.800" }}
            onClick={handleCloseModal}
          >
            Salvar
          </Button>
        </HStack>
      </FormControl>
    </>
  );
}

export default ColaboradoresInscritosPage;
