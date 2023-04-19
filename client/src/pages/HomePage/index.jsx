import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../Footer";
import Headers from "../Headers";
import { CardEvento } from "./card";

const HomePage = () => {
  return (
    <>
      <Headers />
      <Box
        paddingTop={100}
        width="100%"
        height="100%"
        bgGradient="linear(to-r, white.100, gray.100)"
        paddingBottom={5}
      >
        <CardEvento />
      </Box>

      <Footer />
    </>
  );
};

export default HomePage;
