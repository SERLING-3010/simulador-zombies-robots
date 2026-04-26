"use client";

import { useState } from "react";
import { ejecutarCombate } from "../actions/battleLogic";
import "./App.css";

function Arena({ characters }) {
  const [luchador1, setLuchador1] = useState(null);
  const [luchador2, setLuchador2] = useState(null);
  const [resultado, setResultado] = useState(null);

  const handleSeleccion = (char) => {
    if (!luchador1) {
        setLuchador1(char);
    } else if (!luchador2 && char.id !== luchador1.id) {
        setLuchador2(char);
    }
  };

  const procesarBatalla = async () => {
    if (luchador1 && luchador2) {
        const data = await ejecutarCombate(luchador1.id, luchador2.id); // [cite: 18]
        setResultado(`¡Victoria de ${data.winnerName} en ${data.turns} turnos!`); // [cite: 19]
    }
  };

  return (
    <div>
      <div className="container">
        {characters.map((char) => (
          <div 
            className={`box ${char.type.toLowerCase()}`} 
            key={char.id} 
            onClick={() => handleSeleccion(char)}
          >
            <h2>{char.name}</h2>
            <p>Tipo: {char.type}</p>
            <p>HP: {char.health} | ATK: {char.attack}</p>
          </div>
        ))}
      </div>

      {(luchador1 || luchador2 || resultado) && (
        <div style={{ textAlign: "center", marginTop: "30px", color: "white" }}>
          <h2>Detalles de Combate</h2>
          {luchador1 && <p>Luchador 1: {luchador1.name}</p>}
          {luchador2 && <p>Luchador 2: {luchador2.name}</p>}

          {luchador1 && luchador2 && !resultado && (
              <button onClick={procesarBatalla} style={{ marginTop: "10px" }}>¡INICIAR COMBATE!</button>
          )}

          {resultado && <p style={{ fontSize: "1.5rem", color: "#00ffcc" }}>{resultado}</p>}

          <button 
            style={{ display: "block", margin: "20px auto" }} 
            onClick={() => { setLuchador1(null); setLuchador2(null); setResultado(null); }}
          >
            Cerrar / Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}

export default Arena;