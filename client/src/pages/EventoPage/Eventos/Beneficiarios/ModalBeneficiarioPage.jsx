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
import {
  PASSO_01,
  PASSO_02,
  PASSO_03,
  STATUS_ATIVO,
  TIPO_BENEFICIARIO,
} from "../../../../includes/const";
import {
  getPessoas,
  getPessoasById,
} from "../../../../shared/services/Pessoas";
import { getTipoDoacoesById } from "../../../../shared/services/TipoDoacao";
import { getTipoDoacaoEventos } from "../../../../shared/services/TipoDoacaoEvento";
import { api } from "../../../../shared/services/api";
import { geradorSenhaRetirada } from "../../../Uteis/Uteis";

function ModalBeneficiarioPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [pessoas, setPessoas] = useState([]);
  const [pessoaId, setPessoaId] = useState("");
  const [pessoaSelecionada, setPessoaSelecionada] = useState("");
  const [pessoaEventoId, setPessoaEventoId] = useState("");
  const [doacaoEventoId, setDoacaoEventoId] = useState("");
  const [tipoDoacaoEventoId, setTipoDoacaoEventoId] = useState("");
  const [tipoDoacao, setTipoDoacao] = useState("");
  const [inputEventoid, setEventoid] = useState(props.eventoid.eventoid);
  const [inputQuantidade, setQuantidade] = useState("");
  const [passo, setPasso] = useState(PASSO_01);

  const [resultTipoDoacoes, setTipoDoacoes] = useState([]);

  const Eventoid = props.eventoid.eventoid;

  const evento = "Natal para Todos";

  const handleChange = (value) => setQuantidade(value);

  useEffect(() => {
    (async () => {
      setLoading(true);
      handlePessoas();
      handleTipoDoacoes();
      setLoading(false);
    })();
  }, [Eventoid]);

  async function handlePessoas() {
    const response = await getPessoas("");
    setPessoas(response.data);
  }

  async function handleTipoDoacoes() {
    const response = await getTipoDoacaoEventos(Eventoid);
    setTipoDoacoes(response.data);
  }

  const handleSubmit = async () => {
    if (id != undefined) {
      api
        .post(`/pessoaseventos/`, {
          pessoaid: pessoaId,
          tipocolaboradoreventoid: null,
          eventoid: Eventoid,
          tipo: TIPO_BENEFICIARIO,
          status: 1,
        })
        .then((result) => {
          api
            .put(`/pessoaseventos/${result.data.id}`, {
              senharetirada: geradorSenhaRetirada(result.data.id),
            })
            .then((result) => {
              api
                .post(`/doacaoeventospessoas`, {
                  tipodoacaoeventoid: tipoDoacaoEventoId,
                  eventoid: Eventoid,
                  pessoaid: pessoaId,
                  pessoaeventoid: result.data.id,
                  quantidade: inputQuantidade,
                  status: STATUS_ATIVO,
                })
                .then(() => {})
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return api
        .put(`/pessoaseventos/${id}`, {
          pessoaid: inputPessoaid,
          tipocolaboradoreventoid: inputTipoColaboradorEventoid,
          eventoid: Eventoid,
          tipo: TIPO_COLABORADOR,
          status: 0,
          senharetirada: 0,
        })
        .then(() => {
          // navigate("/eventos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleNext = async () => {
    if (passo == PASSO_01) {
      setPasso(PASSO_02);
      const response = await getPessoasById(pessoaId);
      setPessoaSelecionada(response.data[0]);
    } else if (passo == PASSO_02) {
      setPasso(PASSO_03);

      const response = await getTipoDoacoesById(doacaoEventoId);
      setTipoDoacao(response.data[0]);
    }
  };

  const handlePrevious = async () => {
    if (passo == PASSO_03) {
      setPasso(PASSO_02);
    } else if (passo == PASSO_02) {
      setPasso(PASSO_01);
    }
  };

  const handleCloseModal = async () => {
    await handleSubmit();
    props.event();
  };

  return (
    <>
      {passo == PASSO_01 && (
        <FormControl display="flex" flexDir="column" gap="1">
          <HStack spacing={4}>
            <Box w="100%">
              <FormLabel htmlFor="tipodoacaoid">Beneficiário:</FormLabel>
              <Select
                id="pessoaid"
                size={"xs"}
                borderRadius={5}
                placeholder="Selecione"
                value={pessoaId}
                onChange={(event) => {
                  setPessoaId(event.target.value);
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
              onClick={handleNext}
            >
              Próximo
            </Button>
          </HStack>
        </FormControl>
      )}

      {passo == PASSO_02 && (
        <FormControl display="flex" flexDir="column" gap="1">
          <HStack spacing={4}>
            <Box w="80%">
              <FormLabel htmlFor="tipodoacaoeventoid">Doação:</FormLabel>
              <Select
                id="tipodoacaoeventoid"
                size={"xs"}
                borderRadius={5}
                placeholder="Selecione"
                value={tipoDoacaoEventoId}
                onChange={(event) => {
                  setTipoDoacaoEventoId(event.target.value);
                }}
              >
                {resultTipoDoacoes.map((result) => (
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
              onClick={handlePrevious}
            >
              Anterior
            </Button>
            <Button
              w={240}
              p="6"
              type="submit"
              bg="blue.600"
              color="white"
              fontWeight="bold"
              fontSize="x1"
              _hover={{ bg: "blue.800" }}
              onClick={handleNext}
            >
              Próximo
            </Button>
          </HStack>
        </FormControl>
      )}

      {passo == PASSO_03 && (
        <FormControl display="flex" flexDir="column" gap="1">
          <HStack spacing={4}>
            <Box w="80%">
              <FormLabel htmlFor="tipodoacaoid">Resumo:</FormLabel>
              Evento: {evento}
              <br />
              Beneficiário: {pessoaSelecionada.nome}
              <br />
              Documento: {pessoaSelecionada.documento}
              <br />
              E-mail: {pessoaSelecionada.email}
              <br />
              Telefone: {pessoaSelecionada.telefone}
              <br />
              Doação: {tipoDoacao.descricao}
              <br />
              Quantidade: {inputQuantidade}
              <br />
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
              onClick={handlePrevious}
            >
              Anterior
            </Button>
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
              Finalizar
            </Button>
          </HStack>
        </FormControl>
      )}
    </>
  );
}

export default ModalBeneficiarioPage;
