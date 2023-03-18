import { Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import ParametroPage from ".";

export const ModalParams2 = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = () => {};
  const handleVoltar = () => {};

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Parâmetros</NavDropdown.Item>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Parâmetros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ParametroPage />
        </Modal.Body>
        <Modal.Footer>
          <HStack spacing="4" justify={"right"}>
            <Button
              w={240}
              p="6"
              type="submit"
              bg="blue.600"
              color="white"
              fontWeight="bold"
              fontSize="x1"
              _hover={{ bg: "blue.800" }}
              onClick={handleClose}
            >
              Salvar
            </Button>
            <Button
              w={100}
              p="6"
              type="submit"
              bg="gray.600"
              color="white"
              fontWeight="bold"
              fontSize="x1"
              _hover={{ bg: "gray.800" }}
              onClick={handleClose}
              gap={2}
              size="sm"
              marginBottom={2}
            >
              Cancelar
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal>
    </>
  );
};
