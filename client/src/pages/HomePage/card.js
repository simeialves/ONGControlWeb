import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../shared/services/api";
import { formatDate } from "../Uteis/Uteis";

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
      <Container gap={4} width={"100%"}>
        <VStack gap={1}>
          {results.map((result) => (
            <Flex borderRadius={5} bgColor="gray.100">
              <Card width={250} maxW="sm" size="sm" marginTop={5}>
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
                    <a
                      variant="solid"
                      colorScheme="blue"
                      href={`/eventos/edit/${result.eventoid}`}
                      className="btn btn-primary"
                    >
                      Ver Evento
                    </a>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Flex>
          ))}
        </VStack>
      </Container>

      {/* <Flex>
        <HStack>
          <Heading>Titulo</Heading>
          <Text>Descrição</Text>
          <Text>Data de Início</Text>

          <Heading>Titulo</Heading>
          <Text>Descrição</Text>
          <Text>Data de Início</Text>
        </HStack>
      </Flex> */}
    </>
  );
};
