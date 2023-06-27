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
import ModalBeneficiarioPage from "./ModalBeneficiarioPage";
//#endregion
export const ModalBeneficiario = (props) => {
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
          <ModalHeader>Doações</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ModalBeneficiarioPage eventoid={props} event={handleCloseModal} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
