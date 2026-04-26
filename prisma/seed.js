const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando el seeding de personajes...");

  const personajes = [
    // Facción: Zombies Mutantes
    { name: "Nemesis", type: "Zombie", health: 300, attack: 45, defense: 20, speed: 15 },
    { name: "Licker", type: "Zombie", health: 150, attack: 60, defense: 10, speed: 40 },
    { name: "Tank", type: "Zombie", health: 500, attack: 35, defense: 40, speed: 10 },
    // Facción: Robots Autónomos
    { name: "T-800", type: "Robot", health: 350, attack: 40, defense: 30, speed: 20 },
    { name: "Mecha-Striker", type: "Robot", health: 200, attack: 55, defense: 15, speed: 35 },
    { name: "Bastion", type: "Robot", health: 400, attack: 50, defense: 50, speed: 5 }
  ];

  for (const p of personajes) {
    await prisma.character.create({
      data: p
    });
  }

  console.log("¡Seeding completado con éxito! La arena está lista.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });