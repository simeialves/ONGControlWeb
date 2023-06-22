import React, { useEffect, useState } from "react";
import SpinnerUtil from "../../../Uteis/progress";

import ColaboradoresInscritosPage from "./ColaboradoresInscritos/ColaboradoresInscritosPage";
import ColaboradoresNecessariosPage from "./ColaboradoresNecessarios/ColaboradoresNecessariosPage";

export default function Colaboradores({ eventoid }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(false);
    })();
  }, [eventoid]);

  if (loading) {
    return <SpinnerUtil />;
  }

  return (
    <>
      <ColaboradoresNecessariosPage eventoid={eventoid} />
      <ColaboradoresInscritosPage eventoid={eventoid} />
    </>
  );
}
