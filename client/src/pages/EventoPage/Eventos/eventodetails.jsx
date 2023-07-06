import { Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChartBarHorizontal from "../../../components/ChartBarHorizontal";
import ChartBarVertical from "../../../components/ChartBarVertical";
import ChartPie from "../../../components/ChartPie";
import ChartRadar from "../../../components/ChartRadar";
import { getEventoById } from "../../../shared/services/Evento";
import { getTipoColaboradorEventos } from "../../../shared/services/TipoColaboradorEvento";
import { getTipoDoacaoEventos } from "../../../shared/services/TipoDoacaoEvento";
import { Footer } from "../../Footer";
import Headers from "../../Headers";
import { generateRandomRGBAColorSequence } from "../../Uteis/Uteis";

const EventoDetails = () => {
  const { id } = useParams();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [doacoesRecebidas, setDoacoesRecebidas] = useState("");
  const [qtdRecebidas, setQtdRecebidas] = useState("");

  const [colaboradores, setColaboradores] = useState("");
  const [qtdColaboradoresNecessarios, setQtdColaboradoresNecessarios] =
    useState("");
  const [qtdColaboradoresInscritos, setQtdColaboradoresInscritos] =
    useState("");

  const [coresBackGround, setBackgroundColor] = useState([]);
  const [coresHoverBackGround, setHoverBackgroundColor] = useState([]);

  useEffect(() => {
    fetchData();
    fetchColaboradores();
    fetchDoacaoEvento();
  }, []);

  async function fetchData() {
    setResults([]);
    const response = await getEventoById(id);
    setResults(response.data);
    setNome(response.data[0].descricao);
    setLoading(false);
  }

  async function fetchDoacaoEvento() {
    const response = await getTipoDoacaoEventos(id);
    const doacoesRecebidas = [];
    const quantidadeRecebidas = [];

    response.data.forEach((item) => {
      doacoesRecebidas.push(
        item.descricao // + " - " + "Qtd.: " + item.quantidaderecebidas
      );

      quantidadeRecebidas.push(item.quantidaderecebidas);
    });

    let label = "";

    doacoesRecebidas.forEach((item, index) => {
      if (index === 0) {
        label += "'" + item + "'";
      } else {
        label += ", '" + item + "'";
      }
    });

    const listaCoresBackGround = await generateRandomRGBAColorSequence(
      doacoesRecebidas.length
    );

    const listaCoresHoverBackGround = [];
    listaCoresBackGround.forEach((item) => {
      listaCoresHoverBackGround.push(item.replace("0.8", "1"));
    });

    setDoacoesRecebidas(doacoesRecebidas);
    setQtdRecebidas(quantidadeRecebidas);
    setBackgroundColor(listaCoresBackGround);
    setHoverBackgroundColor(listaCoresHoverBackGround);

    setLoading(false);
  }

  async function fetchColaboradores() {
    const response = await getTipoColaboradorEventos(id);

    const descricaoColaboradores = [];
    const qtdColaboradoresNecessarios = [];
    const qtdColaboradoresInscritos = [];

    response.data.forEach((item) => {
      descricaoColaboradores.push(item.descricao);
      qtdColaboradoresNecessarios.push(item.quantidade);
      qtdColaboradoresInscritos.push(item.quantidadeinscritos);
    });

    setColaboradores(descricaoColaboradores);
    setQtdColaboradoresNecessarios(qtdColaboradoresNecessarios);
    setQtdColaboradoresInscritos(qtdColaboradoresInscritos);
  }

  return (
    <>
      <Headers />

      <Heading as="h3" size="lg" paddingTop={20} paddingLeft={5}>
        {nome}
      </Heading>
      <VStack marginBottom={50}>
        <Grid
          templateColumns={{
            sm: "1fr",
            md: "repeat(1, 2fr)",
            xl: "repeat(2, 1fr)",
          }}
          gap={6}
        >
          <GridItem>
            <Heading as="h3" size="lg" padding={5}>
              Doações Recebidas
            </Heading>
            <ChartPie
              doacoesRecebidas={doacoesRecebidas}
              qtdRecebidas={qtdRecebidas}
              coresBackGround={coresBackGround}
              coresHoverBackGround={coresHoverBackGround}
            />
          </GridItem>
          <GridItem>
            <Heading as="h3" size="lg" padding={5}>
              Colaboradores no Evento
            </Heading>
            <ChartBarHorizontal
              colaboradores={colaboradores}
              qtdColaboradoresNecessarios={qtdColaboradoresNecessarios}
              qtdColaboradoresInscritos={qtdColaboradoresInscritos}
            />
          </GridItem>
          <GridItem marginBottom={15}>
            <Heading as="h3" size="lg" padding={5}>
              Comparativo de Doações do Evento
            </Heading>
            <ChartBarVertical
              doacoesRecebidas={doacoesRecebidas}
              qtdRecebidas={qtdRecebidas}
            />
          </GridItem>
          <GridItem marginBottom={15}>
            <Heading as="h3" size="lg" padding={5}>
              Doações Realizadas x Doações Recebidas
            </Heading>
            <ChartRadar
              doacoesRecebidas={doacoesRecebidas}
              qtdRecebidas={qtdRecebidas}
              coresBackGround={coresBackGround}
              coresHoverBackGround={coresHoverBackGround}
            />
          </GridItem>
        </Grid>
      </VStack>
      <Footer />
    </>
  );
};

export default EventoDetails;
