import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
// Reutilizamos tu hoja de estilos principal para mantener la coherencia
import '../components/App.css'; 

const prisma = new PrismaClient();

export default async function HistorialPage() {
  // SSR puro: Consultamos el historial [cite: 20] incluyendo los datos relacionados
  const batallas = await prisma.battle.findMany({
    orderBy: { id: 'desc' }, // Las batallas más recientes primero
    include: {
      char1: true,
      char2: true,
      winner: true,
    }
  });

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white", marginTop: "2rem" }}>Historial de Combates</h1>
      
      <div className="container" style={{ flexDirection: "column", alignItems: "center" }}>
        
        <table className="battle-table">
          <thead>
            <tr>
              <th>ID Batalla</th>
              <th>Combatiente 1</th>
              <th>Combatiente 2</th>
              <th>Ganador</th>
              <th>Turnos</th>
            </tr>
          </thead>
          <tbody>
            {batallas.map((batalla) => (
              <tr key={batalla.id}>
                <td>#{batalla.id}</td>
                <td className={batalla.char1.type.toLowerCase()}>{batalla.char1.name}</td>
                <td className={batalla.char2.type.toLowerCase()}>{batalla.char2.name}</td>
                <td className="winner-cell">
                  {batalla.winner ? batalla.winner.name : 'Empate'}
                </td>
                <td>{batalla.turns}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link href="/">
          <button>Volver a la Arena</button>
        </Link>
      </div>
    </div>
  );
}