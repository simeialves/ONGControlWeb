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
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../shared/services/api";
import { getTipoDoacaoEventos } from "../../../../shared/services/TipoDoacaoEvento";

function DoacoesNecessariasPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [inputTipodoacaoid, setTipoDoacaoid] = useState("");
  const [inputEventoid, setEventoid] = useState(props.eventoid.eventoid);
  const [inputQuantidade, setQuantidade] = useState("");
  const [inputQuantidadeRecebidas, setQuantidadeRecebidas] = useState("");
  const [inputQuantidadeRealizadas, setQuantidadeRealizadas] = useState("");

  const [resultTipoDoacoes, setTipoDoacoes] = useState([]);

  const Eventoid = props.eventoid.eventoid;

  const handleChange = (value) => setQuantidade(value);

  useEffect(() => {
    (async () => {
      setLoading(true);
      handleTipoDoacoes();

      const response = await api.get(`/parametros/`);

      setTipoDoacaoid(response.data[0].tipodoacaoid);
      setEventoid(response.data[0].eventoid);
      setQuantidade(response.data[0].quantidade);
      setQuantidadeRecebidas(response.data[0].quantidaderecebidas);
      setQuantidadeRealizadas(response.data[0].quantidaderealizadas);

      setLoading(false);
    })();
  }, [Eventoid]);

  async function handleTipoDoacoes() {
    const response = await getTipoDoacaoEventos(Eventoid);
    setTipoDoacoes(response.data);
  }

  const handleSubmit = async () => {
    console.log(props, "props");
    if (id != undefined) {
      return api
        .post(`/tipodoacaoeventos/`, {
          tipodoacaoid: inputTipodoacaoid,
          eventoid: Eventoid,
          quantidade: inputQuantidade,
          quantidaderecebidas: inputQuantidadeRecebidas,
          quantidaderealizadas: inputQuantidadeRealizadas,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/tipodoacaoeventos/${id}`, {
          tipodoacaoid: inputTipodoacaoid,
          eventoid: Eventoid,
          quantidade: inputQuantidade,
          quantidaderecebidas: inputQuantidadeRecebidas,
          quantidaderealizadas: inputQuantidadeRealizadas,
        })
        .then(() => {
          navigate("/eventos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            {/* <Input
                          id="nivel"
                          size="xs"
                          borderRadius={5}
                          value={inputNivel}
                          onChange={(event) => {
                            setInputNivel(event.target.value);
                          }}
                        /> */}
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
            onClick={handleSubmit}
          >
            Salvar
          </Button>
          {/* <Button
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
            size="xs"
            marginBottom={2}
          >
            Cancelar
          </Button> */}
        </HStack>
      </FormControl>
    </>
  );
}

export default DoacoesNecessariasPage;