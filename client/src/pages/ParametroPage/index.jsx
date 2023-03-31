import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATUS_ATIVO, STATUS_INATIVO } from "../../includes/const";
import { api, getCEP } from "../../shared/services/api";

//#region consts
const ID_NOME = 0;
const ID_DOCUMENTO = 1;
const ID_RESPONSAVEL = 2;
const ID_CEP = 3;
const ID_LOGRADOURO = 4;
const ID_NUMERO = 5;
const ID_COMPLEMENTO = 6;
const ID_BAIRRO = 7;
const ID_CIDADE = 8;
const ID_UF = 9;
const ID_TELEFONE = 10;
const ID_EMAIL = 11;
const ID_HOMEPAGE = 12;
const ID_EMAIL_REMETENTE = 13;
const ID_EMAIL_LOGIN = 14;
const ID_EMAIL_SENHA = 15;
const ID_EMAIL_SERVIDOR = 16;
const ID_EMAIL_PORTA = 17;
const ID_EMAIL_SSL = 18;
//#endregion

function ParametroPage(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [inputNome, setInputNome] = useState("");
  const [inputDocumento, setInputDocumento] = useState("");
  const [inputResponsavel, setInputResponsavel] = useState("");
  const [inputCEP, setInputCEP] = useState("");
  const [inputLogradouro, setInputLogradouro] = useState("");
  const [inputNumero, setInputNumero] = useState("");
  const [inputComplemento, setInputComplemento] = useState("");
  const [inputBairro, setInputBairro] = useState("");
  const [inputCidade, setInputCidade] = useState("");
  const [inputUF, setInputUF] = useState("");
  const [inputTelefone, setInputTelefone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputHomepage, setInputHomepage] = useState("");
  const [inputEmailRemetente, setInputEmailRemetente] = useState("");
  const [inputEmailLogin, setInputEmailLogin] = useState("");
  const [inputEmailSenha, setInputEmailSenha] = useState("");
  const [inputEmailServidor, setInputEmailServidor] = useState("");
  const [inputEmailPorta, setInputEmailPorta] = useState("");
  const [inputEmailSSL, setInputEmailSSL] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await api.get(`/parametros/`);

      setInputNome(response.data[ID_NOME].valor);
      setInputDocumento(response.data[ID_DOCUMENTO].valor);
      setInputResponsavel(response.data[ID_RESPONSAVEL].valor);
      setInputCEP(response.data[ID_CEP].valor);
      setInputLogradouro(response.data[ID_LOGRADOURO].valor);
      setInputNumero(response.data[ID_NUMERO].valor);
      setInputComplemento(response.data[ID_COMPLEMENTO].valor);
      setInputBairro(response.data[ID_BAIRRO].valor);
      setInputCidade(response.data[ID_CIDADE].valor);
      setInputUF(response.data[ID_UF].valor);
      setInputTelefone(response.data[ID_TELEFONE].valor);
      setInputEmail(response.data[ID_EMAIL].valor);
      setInputHomepage(response.data[ID_HOMEPAGE].valor);
      setInputEmailRemetente(response.data[ID_EMAIL_REMETENTE].valor);
      setInputEmailLogin(response.data[ID_EMAIL_LOGIN].valor);
      setInputEmailSenha(response.data[ID_EMAIL_SENHA].valor);
      setInputEmailServidor(response.data[ID_EMAIL_SERVIDOR].valor);
      setInputEmailPorta(response.data[ID_EMAIL_PORTA].valor);
      setInputEmailSSL(response.data[ID_EMAIL_SSL].valor);

      setLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    return api
      .put(`/parametros`, {
        nome: inputNome,
        documento: inputDocumento,
        responsavel: inputResponsavel,
        cep: inputCEP,
        logradouro: inputLogradouro,
        numero: inputNumero,
        complemento: inputComplemento,
        bairro: inputBairro,
        cidade: inputCidade,
        uf: inputUF,
        telefone: inputTelefone,
        email: inputEmail,
        homepage: inputHomepage,
        email_remetente: inputEmailRemetente,
        email_login: inputEmailLogin,
        email_senha: inputEmailSenha,
        email_servidor: inputEmailServidor,
        email_porta: inputEmailPorta,
        email_ssl: inputEmailSSL,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const checkCEP = async (cep) => {
    const response = await getCEP(cep);

    if (response.data.erro === undefined) {
      setInputLogradouro(response.data.logradouro);
      setInputBairro(response.data.bairro);
      setInputCidade(response.data.localidade);
      setInputUF(response.data.uf);
    } else {
      alert("CEP não encontrado!");
    }
  };

  async function handleClick() {
    setInputEmailSSL(
      inputEmailSSL == STATUS_INATIVO ? STATUS_ATIVO : STATUS_INATIVO
    );
  }

  return (
    <>
      <FormControl display="flex" flexDir="column" gap="1">
        <HStack spacing={4}>
          <Box w="100%">
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <Input
              id="nome"
              size="xs"
              borderRadius={5}
              value={inputNome}
              onChange={(event) => {
                setInputNome(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Box w="100%">
            <FormLabel htmlFor="responsavel">Responsável</FormLabel>
            <Input
              id="responsavel"
              size="xs"
              borderRadius={5}
              value={inputResponsavel}
              onChange={(event) => {
                setInputResponsavel(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Box w="100%">
            <FormLabel htmlFor="documento">Documento</FormLabel>
            <Input
              id="documento"
              size="xs"
              borderRadius={5}
              value={inputDocumento}
              onChange={(event) => {
                setInputDocumento(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Box w="30%">
            <FormLabel htmlFor="telefone">Telefone</FormLabel>
            <Input
              id="telefone"
              size="xs"
              borderRadius={5}
              value={inputTelefone}
              onChange={(event) => {
                setInputTelefone(event.target.value);
              }}
            />
          </Box>
          <Box w="70%">
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              size="xs"
              borderRadius={5}
              value={inputEmail}
              onChange={(event) => {
                setInputEmail(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack spacing={4}>
          <Box w="30%">
            <FormLabel htmlFor="cep">Cep</FormLabel>
            <Input
              id="cep"
              size="xs"
              borderRadius={5}
              value={inputCEP}
              onChange={(event) => {
                setInputCEP(event.target.value);
              }}
              onBlur={(event) => {
                checkCEP(event.target.value);
              }}
            />
          </Box>
          <Box w="70%">
            <FormLabel htmlFor="logradouro">Logradouro</FormLabel>
            <Input
              id="logradouro"
              size="xs"
              borderRadius={5}
              value={inputLogradouro}
              onChange={(event) => {
                setInputLogradouro(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="30%">
            <FormLabel htmlFor="numero">Número</FormLabel>
            <Input
              id="numero"
              size="xs"
              borderRadius={5}
              value={inputNumero}
              onChange={(event) => {
                setInputNumero(event.target.value);
              }}
            />
          </Box>
          <Box w="70%">
            <FormLabel htmlFor="complemento">Complemento</FormLabel>
            <Input
              id="complemento"
              size="xs"
              borderRadius={5}
              value={inputComplemento}
              onChange={(event) => {
                setInputComplemento(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="100%">
            <FormLabel htmlFor="bairro">Bairro</FormLabel>
            <Input
              id="bairro"
              size="xs"
              borderRadius={5}
              value={inputBairro}
              onChange={(event) => {
                setInputBairro(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="80%">
            <FormLabel htmlFor="cidade">Cidade</FormLabel>
            <Input
              id="cidade"
              size="xs"
              borderRadius={5}
              value={inputCidade}
              onChange={(event) => {
                setInputCidade(event.target.value);
              }}
            />
          </Box>

          <Box w="20%">
            <FormLabel htmlFor="uf">UF</FormLabel>
            <Input
              id="uf"
              size="xs"
              borderRadius={5}
              value={inputUF}
              onChange={(event) => {
                setInputUF(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="50%">
            <FormLabel htmlFor="homepage">HomePage</FormLabel>
            <Input
              id="homepage"
              size="xs"
              borderRadius={5}
              value={inputHomepage}
              onChange={(event) => {
                setInputHomepage(event.target.value);
              }}
            />
          </Box>

          <Box w="50%">
            <FormLabel htmlFor="emailremetente">E-mail Remetente</FormLabel>
            <Input
              id="emailremetente"
              size="xs"
              borderRadius={5}
              value={inputEmailRemetente}
              onChange={(event) => {
                setInputEmailRemetente(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="50%">
            <FormLabel htmlFor="emaillogin">E-mail Login</FormLabel>
            <Input
              id="emaillogin"
              size="xs"
              borderRadius={5}
              value={inputEmailLogin}
              onChange={(event) => {
                setInputEmailLogin(event.target.value);
              }}
            />
          </Box>

          <Box w="50%">
            <FormLabel htmlFor="emailsenha">Senha</FormLabel>
            <Input
              id="emailsenha"
              size="xs"
              type={"password"}
              borderRadius={5}
              value={inputEmailSenha}
              onChange={(event) => {
                setInputEmailSenha(event.target.value);
              }}
            />
          </Box>
        </HStack>
        <HStack>
          <Box w="50%">
            <FormLabel htmlFor="emailservidor">Servidor</FormLabel>
            <Input
              id="emailservidor"
              size="xs"
              borderRadius={5}
              value={inputEmailServidor}
              onChange={(event) => {
                setInputEmailServidor(event.target.value);
              }}
            />
          </Box>

          <Box w="40%">
            <FormLabel htmlFor="emailporta">Porta</FormLabel>
            <Input
              id="emailporta"
              size="xs"
              borderRadius={5}
              value={inputEmailPorta}
              onChange={(event) => {
                setInputEmailPorta(event.target.value);
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
              isChecked={inputEmailSSL == STATUS_ATIVO ? true : false}
            >
              SSL
            </Checkbox>
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

export default ParametroPage;
