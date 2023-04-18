import { Box } from "@chakra-ui/react";
import React from "react";

export const Footer = () => {
  return (
    <>
      <Box
        colorScheme={"red"}
        background="red.800"
        width={"100%"}
        height={2}
        as="footer"
        position="fixed"
        bottom="0"
        color="white"
      ></Box>
    </>
  );
};
