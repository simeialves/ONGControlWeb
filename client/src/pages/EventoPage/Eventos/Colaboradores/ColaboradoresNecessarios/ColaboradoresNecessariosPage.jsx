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
import { getTipoColaboradores } from "../../../../../shared/services/TipoColaborador";
import { api } from "../../../../../shared/services/api";
//#endregion
function DoacoesNecessariasPage(props) {
  const [loading, setLoading] = useState(true);

  const [inputTipocolaboradoreventoid, setTipocolaboradoreventoid] =
    useState("");
  const [inputTipocolaboradorid, setTipocolaboradorid] = useState("");
  const [inputEventoid, setEventoid] = useState(props.eventoid.eventoid);
  const [inputQuantidade, setQuantidade] = useState("");

  const [TipoColaboradores, setTipoColaboradores] = useState([]);

  const id = props.eventoid.eventoid;

  const handleChange = (value) => setQuantidade(value);

  useEffect(() => {
    setLoading(true);
    handleTipoColaboradores();

    // const response = await api.get(`/parametros/`);

    // setTipocolaboradorid(response.data[0].tipodoacaoid);
    // setEventoid(response.data[0].eventoid);
    // setQuantidade(response.data[0].quantidade);

    setLoading(false);
  }, [id]);

  async function handleTipoColaboradores() {
    const response = await getTipoColaboradores("", STATUS_ATIVO);
    setTipoColaboradores(response.data);
  }

  const handleSubmit = async () => {
    if (id != undefined) {
      return api
        .post(`/tipocolaboradoreventos/`, {
          tipocolaboradorid: inputTipocolaboradorid,
          eventoid: id,
          quantidade: inputQuantidade,
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
          tipocolaboradorid: inputTipocolaboradorid,
          eventoid: id,
          quantidade: inputQuantidade,
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
            <FormLabel htmlFor="tipodoacaoid">Tipo de Colaborador</FormLabel>
            <Select
              id="tipodoacaoid"
              size={"xs"}
              borderRadius={5}
              placeholder="Selecione"
              value={inputTipocolaboradorid}
              onChange={(event) => {
                setTipocolaboradorid(event.target.value);
              }}
            >
              {TipoColaboradores.map((result) => (
                <option
                  key={result.tipocolaboradorid}
                  value={result.tipocolaboradorid}
                >
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
        </HStack>
      </FormControl>
    </>
  );
}

export default DoacoesNecessariasPage;
