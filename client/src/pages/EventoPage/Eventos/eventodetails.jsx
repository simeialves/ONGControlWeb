import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Footer } from "../../Footer";
import Headers from "../../Headers";

const EventoDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Headers />
      <Box paddingTop={100} paddingBottom={5}>
        Detalhes do Evento {id}
      </Box>
      <Footer />
    </>
  );
};

export default EventoDetails;
