import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChartBarHorizontal from "../../../components/ChartBarHorizontal";
import ChartBarVertical from "../../../components/ChartBarVertical";
import ChartPie from "../../../components/ChartPie";
import { getEventoById } from "../../../shared/services/Evento";
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
  const [coresBackGround, setBackgroundColor] = useState([]);
  const [coresHoverBackGround, setHoverBackgroundColor] = useState([]);

  useEffect(() => {
    fetchData();
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
        item.descricao + " - " + "Qtd.: " + item.quantidaderecebidas
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

  return (
    <>
      <Headers />

      <Box padding={20} gap={2}>
        <Heading as="h3" size="lg" padding={5}>
          {nome}
        </Heading>
        <Flex justify="center" width="100%">
          <Box width="20%" margin={10}>
            <ChartPie
              doacoesRecebidas={doacoesRecebidas}
              qtdRecebidas={qtdRecebidas}
              coresBackGround={coresBackGround}
              coresHoverBackGround={coresHoverBackGround}
            />
          </Box>
          <Box width="40%" margin={10}>
            <ChartBarVertical
              doacoesRecebidas={doacoesRecebidas}
              qtdRecebidas={qtdRecebidas}
            />
          </Box>
        </Flex>
        <Flex justify="center" width="100%">
          <Box width="40%" margin={10}>
            <ChartBarHorizontal
              doacoesRecebidas={doacoesRecebidas}
              qtdRecebidas={qtdRecebidas}
            />
          </Box>
          <Box width="20%" margin={10}>
            <ChartPie
              doacoesRecebidas={doacoesRecebidas}
              qtdRecebidas={qtdRecebidas}
            />
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default EventoDetails;
