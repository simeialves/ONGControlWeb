import React, { useState } from "react";
import Headers from "../Headers";

import Submenu from "../../components/Submenu";
import ListaSubmenu from "../../components/Submenu/ListaSubmenu";
import { DESCRICAO_CADASTROS } from "../../includes/const";
import { Footer } from "../Footer";
import MenuPessoa from "./Pessoa";
import MenuTipoColaborador from "./TipoColaborador";
import MenuTipoDoacao from "./TipoDoacao";

const Cadastro = () => {
  const [id, setId] = useState(1);

  async function handleSetId(id) {
    setId(id);
  }

  return (
    <>
      <Headers descricaoPainel={DESCRICAO_CADASTROS} />
      <Submenu props={ListaSubmenu.cadastros} event={handleSetId} />
      {id == 1 && <MenuPessoa />}
      {id == 2 && <MenuTipoDoacao />}
      {id == 3 && <MenuTipoColaborador />}

      <Footer />
    </>
  );
};

export default Cadastro;
