import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ParametroPage from ".";

export const ModalParams = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <a onClick={onOpen}>Parâmetros</a>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Parâmetros</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ParametroPage />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
