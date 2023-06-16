import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";

const Submenu = (props) => {
  const [listSubmenu, setListSubmenu] = useState([]);

  useEffect(() => {
    setListSubmenu(props.props);
  }, [props]);

  const handleSetId = async (id) => {
    await props.event(id);
  };

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top="10"
        width="100%"
        zIndex="1"
        marginTop={45}
      >
        <Flex bg="#EAEAED" p={2} color="black">
          {listSubmenu.map((result) => (
            <Button
              marginLeft={5}
              mr={2}
              size={"sm"}
              onClick={() => handleSetId(result.id)}
              bg="#EAEAED"
            >
              {result.descricao}
            </Button>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Submenu;
