//#region IMPORTS
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
import ColaboradorNecessarioPage from "./ColaboradoresNecessariosPage";
//#endregion
export const ModalColaboradorNecessario = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const fetchData = props.fetchData;

  function handleCloseModal() {
    onClose();
    fetchData();
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
          <ModalHeader>Colaboradores</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ColaboradorNecessarioPage
              eventoid={props}
              event={handleCloseModal}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
