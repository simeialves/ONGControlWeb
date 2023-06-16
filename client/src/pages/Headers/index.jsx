import React from "react";
import Navbar from "./navbar";
import "./styles.css";

const Headers = (props) => {
  return (
    <>
      <Navbar
        showMenu={props.showMenu}
        descricaoPainel={props.descricaoPainel}
      />
    </>
  );
};

export default Headers;
