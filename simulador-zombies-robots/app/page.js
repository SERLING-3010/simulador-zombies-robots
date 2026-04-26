import { PrismaClient } from '@prisma/client';
import Arena from './components/Arena';

const prisma = new PrismaClient();

export default async function Page() {
  // Requerimiento SSR: Carga de personajes desde el servidor [cite: 9, 25, 51]
  const characters = await prisma.character.findMany(); 

  return (
    <main>
      <h1 style={{ textAlign: "center", color: "white" }}>Zombies vs Robots: Arena SSR</h1>
      <Arena characters={characters} />
    </main>
  );
}