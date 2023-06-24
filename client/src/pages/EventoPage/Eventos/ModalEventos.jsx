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
import ModalEventosPage from "./ModalEventosPage";

export const ModalEventos = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const eventoid = props.props;

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
      {!eventoid && (
        <a onClick={onOpen}>
          <AddIcon marginRight={1} />
          Nova
        </a>
      )}

      {eventoid && (
        <a onClick={onOpen}>
          <EditIcon marginRight={1} boxSize={5} />
        </a>
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"6xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eventos</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ModalEventosPage props={eventoid} event={handleCloseModal} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
