import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/contexts/auth";

import "./styles.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    login(email, password);
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <>
      <Box h="100vh">
        <Center
          as="header"
          h={"100%"}
          bg="gray.100"
          color={"blue.800"}
          fontWeight="bold"
          fontSize={"4x1"}
          pb="8"
        ></Center>
        <Flex
          align="center"
          justify="center"
          bg="blackAlpha.200"
          h="calc(100vh-150px)"
        >
          <Center
            w="100%"
            maxW={500}
            bg="white"
            top={150}
            position="absolute"
            borderRadius={5}
            p="6"
            boxShadow="0 1px 2px #ccc"
          >
            <FormControl display="flex" flexDir="column" gap="4">
              <HStack justify={"center"}>
                <Image
                  className="img"
                  objectFit="cover"
                  boxSize="250px"
                  //src="http://www.lyon.com.br/img/produtos/lyonControl_redmine.png"
                  src="https://simeialves.com.br/images/logo_ongcontrol.png"
                  alt="Dan Abramov"
                  padding={50}
                />
              </HStack>
              <HStack justify={"center"}>
                <FormLabel htmlFor="nome">Login In ONGControlWeb</FormLabel>
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
                  Entrar
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
