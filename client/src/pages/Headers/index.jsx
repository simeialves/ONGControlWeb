import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FcSettings } from "react-icons/fc";
import { IoPeopleSharp } from "react-icons/io5";
import { RiCalendarEventFill } from "react-icons/ri";
import { RxExit, RxHome } from "react-icons/rx";
import { AuthContext } from "../../shared/contexts/auth";
import { ModalParams } from "../ParametroPage/ModalParams";
import "./styles.css";

const Headers = () => {
  const { logout } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    logout();
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <div className="box">
              <RxHome />
              Home
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <div className="box">
                <RiCalendarEventFill size={"24px"} />
                <NavDropdown title="Eventos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/eventos">Eventos</NavDropdown.Item>
                  <NavDropdown.Item href="/localeventos">
                    Local de Eventos
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              <div className="box">
                <IoPeopleSharp size={"24px"} />
                <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/pessoas">Pessoas</NavDropdown.Item>
                  <NavDropdown.Item href="/tipodoacoes">
                    Tipo de Doações
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/tipocolaboradores">
                    Tipo de Colaborador
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>
              </div>

              <div className="box">
                <FcSettings size={"24px"} />
                <NavDropdown title="Configurações" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <ModalParams />
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/usuarios">Usuários</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} onClick={handleLogout}>
                <div className="box">
                  <RxExit size={"24px"} />
                  Logout
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
