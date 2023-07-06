import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PROJETO_COMPARTILHANDO_SABER,
  PROJETO_MADRUGADA_DE_CARINHO,
  PROJETO_NATAL_PARA_TODOS,
  STATUS_ATIVO,
} from "../../includes/const";
import { getEventos } from "../../shared/services/Evento";
import { formatDate, removeAspas } from "../Uteis/Uteis";
import SpinnerUtil from "../Uteis/progress";

export const CardEvento = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setResults([]);
    const response = await getEventos("", STATUS_ATIVO);
    setResults(response.data);
    setLoading(false);
  }

  if (loading) {
    return <SpinnerUtil />;
  }

  return (
    <>
      <Heading as="h3" size="lg" padding={5}>
        Bem vindo, {removeAspas(localStorage.getItem("name"))}!
        <br />
        Confira os próximos eventos
      </Heading>
      {/* <Container gap={4} width={"100%"}> */}
      <VStack gap={1}>
        <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {results.map((result) => (
            <GridItem>
              <Card
                borderRadius={5}
                width={250}
                maxW="sm"
                size="sm"
                marginTop={5}
                bgColor={"white"}
                boxShadow="0 1px 2px #ccc"
                //onClick={() => handleClick(result.eventoid)}
              >
                <CardBody>
                  <Image
                    src={
                      result.projetoid == PROJETO_NATAL_PARA_TODOS
                        ? "https://simeialves.com.br/images/natal-para-todos.jpg"
                        : result.projetoid == PROJETO_MADRUGADA_DE_CARINHO
                        ? "https://simeialves.com.br/images/madrugada-de-carinho.jpg"
                        : result.projetoid == PROJETO_COMPARTILHANDO_SABER
                        ? "https://simeialves.com.br/images/compartilhando-saber.jpg"
                        : ""
                    }
                    alt="Natal para Todos"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" noOfLines={1}>
                      {result.descricao}
                    </Heading>
                    {/* <Text noOfLines={1}> {result.descricao}</Text> */}
                    <Text color="blue.600" fontSize="1x1">
                      Data de Início: {formatDate(result.datainicio)}
                      <br />
                      Data de Término: {formatDate(result.datafim)}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link href={`/eventos/details/${result.eventoid}`}>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        color={"white"}
                        background="red.800"
                        borderRadius={5}
                      >
                        Ver Evento
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </VStack>
      {/* </Container> */}
    </>
  );
};
