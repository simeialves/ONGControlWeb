import React, { useState, useContext } from "react";
import { AuthContext } from "../../shared/contexts/auth";
import { Image, Box } from "@chakra-ui/react";
import Headers from "../Headers";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import "./styles.css";

import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    login(email, password);
  };

  return (
    <>
      <Headers />
      <MDBContainer fluid>
        <MDBRow className="container-login">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <div className="img">
                  <Image
                    className="img"
                    borderRadius="full"
                    objectFit="cover"
                    boxSize="250px"
                    src="http://www.lyon.com.br/img/produtos/lyonControl_redmine.png"
                    alt="Dan Abramov"
                    padding={50}
                  />
                </div>

                <h2 className="fw-bold mb-2 text-center">
                  Sign in to LyonControl
                </h2>
                <p className="text-white-50 mb-3">
                  Please enter your login and password!
                </p>

                <form className="form" onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </FloatingLabel>

                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    className="mb-4"
                    label="Remember password"
                  />

                  <div className="img">
                    <MDBBtn size="lg" className="loginButton">
                      Login
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default LoginPage;
