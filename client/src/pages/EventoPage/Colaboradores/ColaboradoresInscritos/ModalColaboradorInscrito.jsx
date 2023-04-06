import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";

import { AddIcon } from "@chakra-ui/icons";
import ColaboradoresInscritosPage from ".";

export const ModalColaboradorInscrito = (eventoid) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  function handleCloseModal() {
    onClose();
  }

  return (
    <>
      <a onClick={onOpen}>
        <AddIcon marginRight={1} />
        Nova
      </a>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inscrição de Colaboradores</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ColaboradoresInscritosPage
              eventoid={eventoid}
              handleCloseModal={handleCloseModal}
            />
          </ModalBody>

          <ModalFooter>
            {
              /* <Button
              w={240}
              p="6"
              type="submit"
              bg="blue.600"
              color="white"
              fontWeight="bold"
              fontSize="x1"
              _hover={{ bg: "blue.800" }}
            >
              Salvaraa
            </Button>*/
              // <Button onClick={handleCloseModal}>Cancel</Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
