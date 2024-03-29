//#region IMPORTS
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { STATUS_ATIVO } from "../../../../../includes/const";
import { getTipoDoacoes } from "../../../../../shared/services/TipoDoacao";
import { api } from "../../../../../shared/services/api";
//#endregion
function DoacoesNecessariasPage(props) {
  const [loading, setLoading] = useState(true);

  const [inputTipodoacaoid, setTipoDoacaoid] = useState("");
  const [inputQuantidade, setQuantidade] = useState("");

  const [resultTipoDoacoes, setTipoDoacoes] = useState([]);

  const id = props.eventoid.eventoid;

  const handleChange = (value) => setQuantidade(value);

  useEffect(() => {
    setLoading(true);
    handleTipoDoacoes();
    setLoading(false);
  }, [id]);

  async function handleTipoDoacoes() {
    const response = await getTipoDoacoes("", STATUS_ATIVO);
    setTipoDoacoes(response.data);
  }

  const handleSubmit = async () => {
    if (id != undefined) {
      return api
        .post(`/tipodoacaoeventos/`, {
          tipodoacaoid: inputTipodoacaoid,
          eventoid: id,
          quantidade: inputQuantidade,
          quantidaderecebidas: 0,
          quantidaderealizadas: 0,
        })
        .then(() => {
          this.window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/tipodoacaoeventos/${id}`, {
          tipodoacaoid: inputTipodoacaoid,
          eventoid: id,
          quantidade: inputQuantidade,
          quantidaderecebidas: 0,
          quantidaderealizadas: 0,
        })
        .then(() => {})
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
          <Box w="80%">
            <FormLabel htmlFor="tipodoacaoid">Tipo de Doação</FormLabel>
            <Select
              id="tipodoacaoid"
              size={"xs"}
              borderRadius={5}
              placeholder="Selecione"
              value={inputTipodoacaoid}
              onChange={(event) => {
                setTipoDoacaoid(event.target.value);
              }}
            >
              {resultTipoDoacoes.map((result) => (
                <option key={result.tipodoacaoid} value={result.tipodoacaoid}>
                  {result.descricao}
                </option>
              ))}
            </Select>
          </Box>
          <Box w="20%">
            <FormLabel htmlFor="nivel">Qtd</FormLabel>
            <NumberInput
              id="nivel"
              size={"xs"}
              step={1}
              defaultValue={1}
              min={1}
              max={999}
              value={inputQuantidade}
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
          <Button
            w={100}
            p="6"
            type="submit"
            bg="gray.600"
            color="white"
            fontWeight="bold"
            fontSize="x1"
            _hover={{ bg: "gray.800" }}
            onClick={props.event}
            gap={2}
            size="xs"
            marginBottom={2}
          >
            Cancelar
          </Button>
        </HStack>
      </FormControl>
    </>
  );
}

export default DoacoesNecessariasPage;
