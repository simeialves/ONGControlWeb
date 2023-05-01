import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPessoas } from "../../../../shared/services/Pessoas";
import { getTipoDoacaoEventos } from "../../../../shared/services/TipoDoacaoEvento";
import { api } from "../../../../shared/services/api";

function DoacoesRecebidasPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [inputTipoDoacaoEventoid, setTipoDoacaoEventoid] = useState("");
  const [inputQuantidade, setQuantidade] = useState("");
  const [inputPessoaid, setPessoaid] = useState("");
  const [inputDataDoacao, setDataDoacao] = useState("");

  const [tipoDoacaoes, setTipoDoacoes] = useState([]);
  const [pessoas, setPessoas] = useState([]);

  const Eventoid = props.eventoid.eventoid;

  const handleChange = (value) => setQuantidade(value);

  useEffect(() => {
    (async () => {
      setLoading(true);
      handleTipoDoacoes();
      handlePessoas();

      const response = await api.get(`/doacaoeventos/${id}`);

      setTipoDoacaoEventoid(response.data[0].tipodoacaoid);
      setQuantidade(response.data[0].quantidade);

      setLoading(false);
    })();
  }, [Eventoid]);

  async function handleTipoDoacoes() {
    const response = await getTipoDoacaoEventos(Eventoid);
    setTipoDoacoes(response.data);
  }

  async function handlePessoas() {
    const response = await getPessoas();
    setPessoas(response.data);
  }

  const handleSubmit = async () => {
    if (id != undefined) {
      return api
        .post(`/doacaoeventos/`, {
          tipodoacaoeventoid: inputTipoDoacaoEventoid,
          pessoaid: inputPessoaid,
          datadoacao: inputDataDoacao,
          quantidade: inputQuantidade,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/doacaoeventos/${id}`, {
          tipodoacaoeventoid: 64,
          pessoaid: inputPessoaid,
          datadoacao: inputDataDoacao,
          quantidade: inputQuantidade,
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
          <Box w="80%">
            <FormLabel htmlFor="tipodoacaoid">Tipo de Doação</FormLabel>
            <Select
              id="tipodoacaoid"
              size={"xs"}
              borderRadius={5}
              placeholder="Selecione"
              value={inputTipoDoacaoEventoid}
              onChange={(event) => {
                setTipoDoacaoEventoid(event.target.value);
              }}
            >
              {tipoDoacaoes.map((result) => (
                <option
                  key={result.tipodoacaoeventoid}
                  value={result.tipodoacaoeventoid}
                >
                  {result.descricao}
                </option>
              ))}
            </Select>
          </Box>
          <Box w="20%">
            <FormLabel htmlFor="qtd">Quantidade</FormLabel>
            <NumberInput
              id="qtd"
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
        <HStack spacing={4}>
          <Box w="80%">
            <FormLabel htmlFor="pessoaid">Doador</FormLabel>
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
          <Box w="20%">
            <FormLabel htmlFor="dtnascimento">Data Doação</FormLabel>
            <Input
              id="dtnascimento"
              size="xs"
              borderRadius={5}
              value={inputDataDoacao}
              onChange={(event) => {
                setDataDoacao(event.target.value);
              }}
              type="date"
            />
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

export default DoacoesRecebidasPage;
