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

import { AddIcon, EditIcon } from "@chakra-ui/icons";
import ModalTipoDoacaoPage from "./ModalTipoDoacaoPage";

export const ModalTipoDoacao = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tipodoacaoid = props.props;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const fetchData = () => {
    props.event();
  };

  const handleCloseModal = () => {
    onClose();
    fetchData();
  };

  return (
    <>
      {!tipodoacaoid && (
        <a onClick={onOpen}>
          <AddIcon marginRight={1} />
          Nova
        </a>
      )}

      {tipodoacaoid && (
        <a onClick={onOpen}>
          <EditIcon marginRight={1} boxSize={5} />
        </a>
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tipo de Doação</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ModalTipoDoacaoPage
              props={tipodoacaoid}
              event={handleCloseModal}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
