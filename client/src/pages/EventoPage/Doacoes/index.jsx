import React, { useEffect, useState } from "react";
import SpinnerUtil from "../../Uteis/progress";

import DoacoesNecessarias from "./DoacoesNecessarias/DoacoesNecessariasPage";
import DoacoesRecebidas from "./DoacoesRecebidas/DoacoesRecebidasPage";

export default function Doacoes({ eventoid }) {
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
      <DoacoesNecessarias eventoid={eventoid} />
      <DoacoesRecebidas eventoid={eventoid} />
    </>
  );
}
