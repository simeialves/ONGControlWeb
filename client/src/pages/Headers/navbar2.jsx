import { Box, Spacer } from "@chakra-ui/react";
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

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleModal = () => {
    <ModalParams />;
  };

  return (
    <>
      <Box as="nav" position="fixed" top="0" width="100%" zIndex="1">
        <Flex bg="red.800" p={4} color="white">
          <Link mr={8} href="/">
            <Text fontSize="lg" fontWeight="bold">
              ONGControl
            </Text>
          </Link>
          <Link mr={2} href="/">
            Home
          </Link>
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
          <Link mr={2} href="/contatos">
            Contatos
          </Link>
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
