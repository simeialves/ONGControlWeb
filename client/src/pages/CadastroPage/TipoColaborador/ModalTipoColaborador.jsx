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
import ModalTipoColaboradorPage from "./ModalTipoColaboradorPage";

export const ModalTipoColaborador = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tipocolaboradorid = props.props;

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
      {!tipocolaboradorid && (
        <a onClick={onOpen}>
          <AddIcon marginRight={1} />
          Nova
        </a>
      )}

      {tipocolaboradorid && (
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
          <ModalHeader>Tipo de Colaborador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ModalTipoColaboradorPage
              props={tipocolaboradorid}
              event={handleCloseModal}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
