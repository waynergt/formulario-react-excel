import React from "react";
import Formulario from "./Formulario";
import AcercaDe from "./AcercaDe"; // Importa el componente AcercaDe

function App() {
  return (
    <div>
      <Formulario />
      <AcercaDe /> {/* Muestra el apartado AcercaDe debajo del formulario */}
    </div>
  );
}

export default App;