import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { api, getPessoas } from "../../shared/services/api";
import Headers from "../Headers";
import SpinnerUtil from "../Uteis/progress";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Pessoa = () => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ModalPessoa, setModalPessoa] = useState(false);

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

  function handleEdit(id) {
    navigate(`/pessoas/edit/${id}`);
  }

  function handleDelete(id) {
    api
      .delete(`/pessoas/${id}`, {})
      .then(() => {
        navigate("/pessoas");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Headers />
      <br></br>
      <Container fluid="md">
        <Button href="/pessoas/new">Nova</Button>
        <br />
        <br />
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Documento</th>
                <th scope="col">Telefone</th>
                <th colspan="2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.documento}</td>
                  <td>{pessoa.telefone}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={(e) => handleEdit(pessoa.pessoaid, e)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      onClick={(e) => handleDelete(pessoa.pessoaid, e)}
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
