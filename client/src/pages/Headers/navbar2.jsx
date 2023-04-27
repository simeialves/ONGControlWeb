import { Box, Spacer, useMediaQuery } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/contexts/auth";
import { ModalParams } from "../ParametroPage/ModalParams";
import "./styles.css";

import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

const Navbar2 = () => {
  const { logout } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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

  return (
    <>
      <Box as="nav" position="fixed" top="0" width="100%" zIndex="1">
        <Flex bg={smDown ? "red.800" : "blue.800"} p={4} color="white">
          <Link mr={8} href="/">
            <Text fontSize="lg" fontWeight="bold">
              ONGControl
            </Text>
          </Link>
          <Link mr={2} href="/">
            Home
          </Link>
          {xsDown && (
            <Menu>
              <MenuButton as={Link} mr={2} variant="link">
                Eventos
              </MenuButton>
              <MenuList>
                <MenuItem color={"black"}>
                  <Link mr={2} href="/eventos">
                    Eventos
                  </Link>
                </MenuItem>
                <MenuItem color={"black"}>
                  <Link mr={2} href="/localeventos">
                    Local dos Eventos
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {smDown && (
            <Menu>
              <MenuButton as={Link} mr={2} variant="link">
                Cadastros
              </MenuButton>
              <MenuList>
                <MenuItem color={"black"}>
                  <Link mr={2} href="/pessoas">
                    Pessoas
                  </Link>
                </MenuItem>
                <MenuItem color={"black"}>
                  <Link mr={2} href="/tipodoacoes">
                    Tipo de Doações
                  </Link>
                </MenuItem>
                <MenuItem color={"black"}>
                  <Link mr={2} href="/tipocolaboradores">
                    Tipo de Colaboradores
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {mdDown && (
            <Menu>
              <MenuButton as={Link} mr={2} variant="link">
                Configurações
              </MenuButton>
              <MenuList>
                <MenuItem color={"black"}>
                  <Link mr={2}>
                    <ModalParams />
                  </Link>
                </MenuItem>
                <MenuItem color={"black"}>
                  <Link mr={2} href="/usuarios">
                    Usuários
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {smDown && (
            <Link mr={2} href="/contatos">
              Contatos
            </Link>
          )}
          <Spacer />
          <Link mr={2} onClick={() => handleLogout()}>
            Logout
          </Link>
          {/* <Button
            mr={2}
            colorScheme="white"
            variant="outline"
            onClick={() => handleLogout()}
          >
            Logout
          </Button> */}
        </Flex>
      </Box>
    </>
  );
};

export default Navbar2;
