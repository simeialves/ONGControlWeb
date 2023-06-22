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
import React from "react";

import { AddIcon } from "@chakra-ui/icons";
import DoacoesRecebidasPage from "./DoacoesRecebidasPage";

export const ModalDoacaoRecebida = (eventoid) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleCloseModal = () => {
    onClose();
  };

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
          <ModalHeader>Doações Recebidas</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <DoacoesRecebidasPage
              eventoid={eventoid}
              event={handleCloseModal}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
