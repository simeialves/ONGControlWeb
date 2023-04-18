import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../shared/services/api";
import { formatDate, removeAspas } from "../Uteis/Uteis";

export const CardEvento = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setResults([]);
      await api.get(`/eventos`).then((response) => {
        setResults(response.data);
        setLoading(false);
      });
    })();
  }, []);

  function handleClick(id) {
    navigate(`/eventos/edit/${id}`);
  }

  return (
    <>
      <Box
        colorScheme={"gray"}
        background="white"
        width={"100%"}
        height={"100%"}
        padding={5}
      >
        <Heading as="h3" size="lg" padding={5}>
          Bem vindo, {removeAspas(localStorage.getItem("name"))}!
          <br />
          Confira os próximos eventos
        </Heading>
        <Container gap={4} width={"100%"}>
          <VStack gap={1}>
            <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              {results.map((result) => (
                <GridItem>
                  <Card
                    borderRadius={5}
                    width={250}
                    maxW="sm"
                    size="sm"
                    marginTop={5}
                    bgColor={"white"}
                    shadow={"md"}
                    //onClick={() => handleClick(result.eventoid)}
                  >
                    <CardBody>
                      {/* <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            /> */}
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
                        <Link href={`/eventos/edit/${result.eventoid}`}>
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
        </Container>
      </Box>
    </>
  );
};
