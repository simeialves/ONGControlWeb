import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPacoteLogByPacoteId, getPacotes } from "../../shared/services/api";
import Headers from "../Headers";

import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
//import Spinner from "react-bootstrap/Spinner";
import SpinnerUtil from "../Uteis/progress";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import "./styles.css";

import {
  Container,
  Input,
  Modal,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import Table2 from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer2 from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ControleQualidade = () => {
  const [users, setUsers] = useState([]);
  const [pacoteLog, setPacoteLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalCliente, setModalCliente] = useState(false);
  const [dataInicial, setDataInicial] = useState(
    new Date(Date.now() - 1).toLocaleString()
  );
  const [dataFinal, setDataFinal] = useState(
    new Date(Date.now()).toLocaleString()
  );

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getPacotes(dataInicial, dataFinal);
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen(PacoteId) {
    setModalCliente(true);
    GetPacoteLogByPacoteId(PacoteId);
  }

  function handleModalClose() {
    setModalCliente(false);
  }

  async function GetPacoteLogByPacoteId(id) {
    const response = await getPacoteLogByPacoteId(id);
    setPacoteLog(response.data);
    return response;
  }

  const api = axios.create({
    baseURL: "http://186.248.86.194:4444",
    //baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  function formatDate(dataInput) {
    return new Date(dataInput).toLocaleString();
  }

  function PesquisarPacotes() {
    useEffect();
  }

  const rows = [];

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      <Modal
        widht
        class="container"
        show={ModalCliente}
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pacotes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Data</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {pacoteLog.map((pacotes) => (
                <tr
                  className={
                    pacotes.espacolivregb <
                    (pacotes.tamanhobancokb / 1024 / 1024).toFixed(2)
                      ? "table-warning"
                      : pacotes.status == 42
                      ? "table-danger"
                      : ""
                  }
                >
                  <td key={pacotes.PACOTELOGID}>
                    <td className="colunaid">{pacotes.PACOTELOGID}</td>
                  </td>

                  <td className="colunastatus">
                    {pacotes.STATUS} - {pacotes.DESCRICAO}
                  </td>
                  <td className="colunadata">{formatDate(pacotes.DATA)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Headers />
      <br></br>

      <Container maxW="100%">
        <Input
          size="sm"
          type="date"
          value={dataInicial}
          onChange={(event) => {
            setDataInicial(event.target.value);
          }}
        />
        Até
        <Input
          size="sm"
          type="date"
          value={dataFinal}
          onChange={(event) => {
            setDataFinal(event.target.value);
          }}
        />
        <br />
        <Button onClick={PesquisarPacotes}>Pesquisar</Button>
        <TableContainer>
          <Table size="sm">
            {/* variant='striped' colorScheme='teal' */}
            <Thead>
              <Tr>
                <Th scope="col">Pacote</Th>
                <Th scope="col">Nuvem</Th>
                <Th scope="col">Lyon</Th>
                <Th scope="col">Data</Th>
                <Th scope="col">Tipo</Th>
                <Th scope="col">Nível</Th>
                <Th scope="col">Cliente</Th>
                <Th scope="col">Sistema</Th>
                <Th scope="col">Status</Th>
                {/* <Th scope="col">Descrição</Th> */}
                <Th scope="col">Arquivo (MB)</Th>
                <Th scope="col">BD (GB)</Th>
                <Th scope="col">Esp.Livre (GB)</Th>
                <Th colspan="2">Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                //  <tr className={user.status == 42 ? "table-danger" : ""}>
                //{/* <tr className={user.espacolivregb < (user.tamanhobancokb/1024/1024).toFixed(2) ? "table-warning" : ""}> */}
                <Tr
                  colorScheme="teal"
                  // {
                  //     user.espacolivregb <
                  //     (user.tamanhobancokb / 1024 / 1024).toFixed(2)
                  //       ? "teal"
                  //       : user.status == 42
                  //       ? "red"
                  //       : ""
                  //   }
                  //   variant='striped'
                >
                  {/* <td key={user.pacoteid}> */}
                  <Td className="colunaid">{user.pacoteid}</Td>
                  <Td>{user.clienteftp_nuvem}</Td>
                  <Td>{user.clienteftp_lyon}</Td>
                  <Td>{formatDate(user.data)}</Td>
                  <Td>{user.tipo == 1 ? "CBK" : "LBK"}</Td>
                  <Td>{user.nivel}</Td>
                  <Td>{user.nome}</Td>
                  <Td>{user.sistema}</Td>
                  {/* <Td>{user.status}</Td> */}
                  <Td className="colunastatus">
                    {user.status} - {user.descricao}
                  </Td>
                  <Td>{(user.tamanhokb / 1024 / 1024).toFixed(2)}</Td>
                  <Td>{(user.tamanhobancokb / 1024 / 1024).toFixed(2)}</Td>
                  <Td>{user.espacolivregb}</Td>
                  <Td>
                    <Button
                      class="btn btn-secondary"
                      onClick={(e) => handleModalOpen(user.pacoteid, e)}
                    >
                      <HiMagnifyingGlassPlus />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>Quantidade: {users.length}</Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
      <br></br>
      {/* <div className="container-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Pacote</th>
              <th scope="col">Nuvem</th>
              <th scope="col">DN</th>
              <th scope="col">Lyon</th>
              <th scope="col">DL</th>
              <th scope="col">Data</th>
              <th scope="col">Tipo</th>
              <th scope="col">Nível</th>
              <th scope="col">Cliente</th>
              <th scope="col">Sistema</th>
              <th scope="col">Status</th>
              <th scope="col">Descrição</th>
              <th scope="col">Arquivo (MB)</th>
              <th scope="col">BD (GB)</th>
              <th scope="col">Esp.Livre (GB)</th>
              <th scope="col">Observação</th>
              <th colspan="2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              //  <tr className={user.status == 42 ? "table-danger" : ""}>
              
              <tr
                className={
                  user.espacolivregb <
                  (user.tamanhobancokb / 1024 / 1024).toFixed(2)
                    ? "table-warning"
                    : user.status == 42
                    ? "table-danger"
                    : ""
                }
              >
              
                <td className="colunaid">{user.pacoteid}</td>
              
                <td>{user.clienteftp_nuvem}</td>
                <td>{user.disconuvem}</td>
                <td>{user.clienteftp_lyon}</td>
                <td>{user.discolyon}</td>
                <td className="colunadata">{formatDate(user.data)}</td>
                <td>{user.tipo == 1 ? "CBK" : "LBK"}</td>
                <td>{user.nivel}</td>
                <td className="colunanome">{user.nome}</td>
                <td>{user.sistema}</td>
                <td className="colunastatus">{user.status}</td>
                <td className="colunastatus">{user.descricao}</td>
                <td>{(user.tamanhokb / 1024 / 1024).toFixed(2)}</td>
                <td>{(user.tamanhobancokb / 1024 / 1024).toFixed(2)}</td>
                <td>{user.espacolivregb}</td>
                <td>{user.observacao}</td>

                <td>
                  <button
                    class="btn btn-secondary"
                    onClick={(e) => handleModalOpen(user.pacoteid, e)}
                  >
                    <HiMagnifyingGlassPlus />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <nav aria-label="Navegação de página exemplo">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">
                  Anterior
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Próximo
                </a>
              </li>
            </ul>
          </nav>
        </table>
        <label>Quantidade: {users.length}</label>
      </div> */}
    </>
  );
};

export default ControleQualidade;
