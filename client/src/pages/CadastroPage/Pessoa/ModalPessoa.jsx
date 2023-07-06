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
import ModalPessoaPage from "./ModalPessoaPage";

export const ModalPessoa = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pessoaid = props.props;

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
      {!pessoaid && (
        <a onClick={onOpen}>
          <AddIcon marginRight={1} />
          Nova
        </a>
      )}

      {pessoaid && (
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
          <ModalHeader>Pessoa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ModalPessoaPage props={pessoaid} event={handleCloseModal} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
