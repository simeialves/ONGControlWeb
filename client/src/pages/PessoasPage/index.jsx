import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { getPessoas } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Pessoa = () => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalPessoa, setModalPessoa] = useState(false);

  const [inputNome, setInputNome] = useState("");
  console.log(inputNome);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async () => {
      const response = await getPessoas();
      setPessoas(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <SpinnerUtil />;
  }

  function handleModalOpen() {
    setModalPessoa(true);
  }

  function handleModalClose() {
    setModalPessoa(false);
  }

  const api = axios.create({
    //baseURL: "http://186.248.86.194:4444",
    baseURL: "http://localhost:5000",
    headers: { "x-access-token": token },
  });

  function editPessoa(PESSOAID) {
    console.log("Edit Pessoa: " + PESSOAID);
    navigate(`/pessoas/editpessoa/${PESSOAID}`);
  }

  function deletePessoa(PESSOAID) {
    console.log("Delete Pessoa: " + PESSOAID);
    api
      .delete("/pessoas/" + PESSOAID, {})
      .then(() => {
        navigate("/pessoas");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPessoaByNome(nome) {
    const response = getPessoas(nome);
    setPessoas(response.data);
    setLoading(false);
  }

  // function App() {
  //   return (
  //     <div className="App">
  //       <ul>
  //         {userFiltrado.map((result) => (
  //           <li key={result}>{result}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

  //const userFiltrado = pessoas.filter((user) => user.start(inputNome));

  return (
    <>
      <Headers />
      <br></br>
      <Container fluid="md">
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Documento</th>
                <th scope="col">Telefone</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr>
                  <td>{pessoa.pessoaid}</td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.documento}</td>
                  <td>{pessoa.telefone}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editPessoa(pessoa.pessoaid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deletePessoa(pessoa.pessoaid, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <label>Quantidade: {pessoas.length}</label>
      </Container>

      {/* <ul>
        <br></br>

        <div className="container-sm title_container">
          <Button className="btn btn-primary" href="/newpessoa">
            Novo Pessoa
          </Button>
          <br></br>
          <br></br>
          <label>Nome:</label>
          <Input
            type="text"
            className="inputNome"
            name="nome"
            id="nome"
            value={inputNome}
            onChange={(event) => {
              setInputNome(event.target.value);
            }}
          />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Documento</th>
                <th scope="col">Telefone</th>
                <th scope="col">Versão</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((user) => (
                <tr>
                  <td>{user.PESSOAID}</td>
                  <td>{user.NOME}</td>
                  <td>{user.DOCUMENTO}</td>
                  <td>{user.TELEFONE}</td>
                  <td>{user.VERSAOATUAL}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => editPessoa(user.PESSOAID, e)}
                    >
                      Editar
                    </button>
                  </td>

                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => deletePessoa(user.PESSOAID, e)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label>Quantidade: {pessoas.length}</label>
        </div>
      </ul> */}
    </>
  );
};

export default Pessoa;
