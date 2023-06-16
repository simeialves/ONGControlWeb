import { Box, Spacer, useMediaQuery } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/contexts/auth";
import { ModalParams } from "../ParametroPage/ModalParams";
import "./styles.css";

import { Flex, Link, Text } from "@chakra-ui/react";
import { removeAspas } from "../Uteis/Uteis";

const Navbar = (props) => {
  const { logout } = useContext(AuthContext);

  const [menu, setMenu] = useState(false);

  const mostrarMenu = props.showMenu;
  const descricaoPainel = props.descricaoPainel;

  const handleLogout = () => {
    logout();
  };

  const [xsDown] = useMediaQuery("(min-width: 300px)");
  const [smDown] = useMediaQuery("(min-width: 576px)");
  const [mdDown] = useMediaQuery("(min-width: 768px)");
  const [lgDown] = useMediaQuery("(min-width: 992px)");
  const [xlDown] = useMediaQuery("(min-width: 1200px)");
  const [xxlDown] = useMediaQuery("(min-width: 1600px)");
  const [xxxlDown] = useMediaQuery("(min-width: 1800px)");

  useEffect(() => {
    setMenu(mostrarMenu);
  }, [props.showMenu]);

  return (
    <>
      <Box as="nav" position="fixed" top="0" width="100%" zIndex="1">
        <Flex bg="#611D1D" p={0.5} color="white" paddingLeft={5}>
          <Text as="a" mr={8} href="/">
            <Text fontSize="sm">LyonControl</Text>
          </Text>
          <Text as="a" mr={2} href="/homepage" fontSize="xs">
            Home
          </Text>
          <Text
            as="a"
            mr={2}
            href="/eventos"
            fontSize="xs"
            textDecoration={"none"}
            _hover={"red"}
          >
            Eventos
          </Text>
          <Text
            as="a"
            mr={2}
            href="/pessoas"
            fontSize="xs"
            textDecoration={"none"}
            _hover={"red"}
          >
            Cadastros
          </Text>
          <Text
            as="a"
            mr={2}
            fontSize="xs"
            textDecoration={"none"}
            _hover={"red"}
          >
            <ModalParams />
          </Text>
          <Spacer />
          <Text fontSize="xs" mr={1}>
            Logado como
          </Text>{" "}
          <Text fontSize="xs" mr={2} fontWeight={"bold"}>
            {removeAspas(localStorage.getItem("name"))}
          </Text>
          <Link mr={2} onClick={() => handleLogout()} fontSize="xs">
            Sair
          </Link>
        </Flex>
        <Flex bg="#822727" p={3} color="white">
          <Text fontSize="2xl" fontWeight={"bold"}>
            {descricaoPainel}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
