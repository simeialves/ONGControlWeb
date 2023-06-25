//#region IMPORTS
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { STATUS_ATIVO, TIPO_BENEFICIARIO } from "../../../../includes/const";
import { getDoacaoEventoPessoaByPessoaEventoId } from "../../../../shared/services/DoacaoEventoPessoa";
import { api } from "../../../../shared/services/api";
import { geradorSenhaRetirada } from "../../../Uteis/Uteis";
//#endregion

function ModalDoacaoBeneficiarioPage(props) {
  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState([]);

  const [pessoaId, setPessoaId] = useState("");

  const [tipoDoacaoEventoId, setTipoDoacaoEventoId] = useState("");

  const [inputQuantidade, setQuantidade] = useState("");

  const Eventoid = 0;
  const pessoaEventoId = props.props.pessoaeventoid;

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [Eventoid]);

  async function fetchData() {
    const response = await getDoacaoEventoPessoaByPessoaEventoId(
      pessoaEventoId
    );
    setResults(response.data);
  }

  const handleSubmit = async () => {
    api
      .post(`/pessoaseventos/`, {
        pessoaid: pessoaId,
        tipocolaboradoreventoid: null,
        eventoid: Eventoid,
        tipo: TIPO_BENEFICIARIO,
        status: STATUS_ATIVO,
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
  };

  const handleCloseModal = async () => {
    await handleSubmit();
    props.event();
  };

  return (
    <>
      <Container fluid="md">
        <Box shadow={"center"} boxShadow="md" padding={5} borderRadius={5}>
          {/* <HStack spacing="4" justify={"right"}>
            <Button
              variant="outline"
              colorScheme="gray"
              gap={2}
              size="sm"
              marginBottom={2}
            ></Button>
          </HStack> */}
          <TableContainer>
            <Table variant="simple" size="sm">
              {/* <TableCaption>Quantidade: {results.length}</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Descrição</Th>
                  <Th>Quantidade</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result) => (
                  <Tr>
                    <Td>{result.descricao}</Td>
                    <Td>{result.quantidade}</Td>
                    <Td>
                      <Button size={"xs"} bg={"write"}>
                        <DeleteIcon
                          color={"red.500"}
                          boxSize={5}
                          onClick={(e) =>
                            handleDelete(result.pessoaeventoid, e)
                          }
                        />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

export default ModalDoacaoBeneficiarioPage;
