import React from "react";
import { Footer } from "../Footer";
import Headers from "../Headers";
import { CardEvento } from "./card";

const HomePage = () => {
  return (
    <>
      <Headers />
      <CardEvento />
      <Footer />
    </>
  );
};

export default HomePage;
