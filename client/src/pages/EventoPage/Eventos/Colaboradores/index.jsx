import React, { useEffect, useState } from "react";
import SpinnerUtil from "../../../Uteis/progress";

import ColaboradoresInscritosPage from "./ColaboradoresInscritos/";
import ColaboradoresNecessariosPage from "./ColaboradoresNecessarios/";

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
