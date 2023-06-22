import React, { useState } from "react";
import Headers from "../Headers";

import Submenu from "../../components/Submenu";
import ListaSubmenu from "../../components/Submenu/ListaSubmenu";
import { DESCRICAO_EVENTOS } from "../../includes/const";
import { Footer } from "../Footer";
import MenuEventos from "./Eventos";
import MenuLocalEventos from "./LocalEventos";

const Evento = () => {
  const [id, setId] = useState(1);

  async function handleSetId(id) {
    setId(id);
  }

  return (
    <>
      <Headers descricaoPainel={DESCRICAO_EVENTOS} />
      <Submenu props={ListaSubmenu.eventos} event={handleSetId} />
      {id == 1 && <MenuEventos />}
      {id == 2 && <MenuLocalEventos event={handleSetId} />}
      <Footer />
    </>
  );
};

export default Evento;
