import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/contexts/auth";
import { removeAspas } from "../Uteis/Uteis";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleSubmit = (e) => {
    login(email, password)
      .then(() => {
        const nameUser = removeAspas(localStorage.getItem("name"));
        const message = `Bem vindo, ${nameUser}.`;
        const status = "success";
        toast({
          title: message,
          status: status,
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      })
      .catch((error) => {
        const message = error.response
          ? error.response.data.message
          : error.message;
        const status = error.response ? "error" : "warning";

        toast({
          title: message,
          status: status,
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      });
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <>
      <Box
        width="100%"
        height="100vh"
        bgGradient="linear(to-r, gray.100, gray.100)"
      >
        <Flex
          height="100vh"
          display="flex"
          flex-direction="column"
          justifyContent="center"
          alignItems="center"
          boxShadow="0px 4px 6px rgba(255, 0, 0, 0.5)"
        >
          <Center
            width={"500px"}
            bg="white"
            position="absolute"
            borderRadius={20}
            p="6"
            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.5)"
          >
            <FormControl display="flex" flexDir="column" gap="4">
              <HStack justify={"center"}>
                <Image
                  className="img"
                  objectFit="cover"
                  boxSize="250px"
                  src="https://simeialves.com.br/images/logo_ongcontrol.png"
                  alt="Dan Abramov"
                  padding={50}
                />
              </HStack>
              <HStack justify={"center"}>
                {/* <FormLabel htmlFor="nome">Login In ONGControlWeb</FormLabel> */}
                <Heading
                  size={{
                    base: "xs",
                    md: "md",
                  }}
                >
                  Login In ONGControlWeb
                </Heading>
              </HStack>
              <HStack spacing="1" justify="center">
                <Text color="muted">Ainda não tem conta?</Text>
                <Button variant="link" colorScheme="blue">
                  Criar conta
                </Button>
              </HStack>
              <HStack spacing={4}>
                <Box w="100%">
                  <FormLabel htmlFor="nome">E-mail</FormLabel>
                  <Input
                    id="nome"
                    type={"email"}
                    placeholder="manoelgomes@gmail.com"
                    required={true}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Box>
              </HStack>
              <HStack spacing={4}>
                <Box w="100%">
                  <FormLabel htmlFor="senha">Senha</FormLabel>
                  <Input
                    id="senha"
                    type={"password"}
                    placeholder="********"
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    onKeyPress={(event) => handleKeyPress(event)}
                  />
                </Box>
              </HStack>

              <HStack spacing="4" justify={"center"}>
                <Button
                  w={150}
                  p="6"
                  type="submit"
                  bg="red.600"
                  color="white"
                  fontWeight="bold"
                  fontSize="x1"
                  _hover={{ bg: "red.800" }}
                  onClick={handleSubmit}
                  borderRadius="full"
                >
                  Logar
                </Button>
              </HStack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
            </FormControl>
          </Center>
        </Flex>
      </Box>
    </>
  );
};

export default LoginPage;
