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
                  <NavDropdown.Item href="/parametros">
                    Parâmetros
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

      {/* <nav class="navbar navbar-expand-sm navbar-dark bg-secondary">
        <a class="navbar-brand" href="#">
          LyonControl
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#textoNavbar"
          aria-controls="textoNavbar"
          aria-expanded="false"
          aria-label="Alterna navegação"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="textoNavbar">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only"></span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/clientes">
                Clientes
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/controlequalidade">
                Controle de Qualidade
              </a>
            </li>

            <li class="nav-item" onClick={handleLogout}>
              <a class="nav-link" href="/clientes">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav> */}
      {/* <Navbar color="secondary" dark expand="md">
      <NavbarBrand>
        <FaBars onClick={showSidebar} />
        {sidebar && <Sidebar active={setSidebar} />}
      </NavbarBrand>
      <NavbarBrand href="/">LyonControl</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/clientes">
              
              Clientes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/controlequalidade">Controle de Qualidade</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={handleLogout}>
              
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar> */}
    </>
  );
};

export default Headers;
