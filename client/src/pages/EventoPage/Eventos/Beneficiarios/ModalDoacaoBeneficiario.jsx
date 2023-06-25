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

import { ViewIcon } from "@chakra-ui/icons";
import ModalDoacaoBeneficiarioPage from "./ModalDoacaoBeneficiarioPage";
//#endregion
export const ModalDoacaoBeneficiario = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <a onClick={onOpen}>
        <ViewIcon boxSize={5} marginRight={1} />
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
          <ModalHeader>Doações para </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ModalDoacaoBeneficiarioPage
              props={props}
              event={handleCloseModal}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
