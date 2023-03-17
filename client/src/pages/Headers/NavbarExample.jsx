import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";

function ModalExample() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Nav.Link onClick={handleShow}>Abrir Modal</Nav.Link>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exemplo de Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Aqui vai o conteúdo do modal.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function NavbarExample() {
  return (
    <Nav>
      <Nav.Link href="/">Página Inicial</Nav.Link>
      <ModalExample />
    </Nav>
  );
}

export default NavbarExample;
