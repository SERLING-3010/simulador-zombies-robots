"use server"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function ejecutarCombate(id1, id2) {
  const p1 = await prisma.character.findUnique({ where: { id: id1 } });
  const p2 = await prisma.character.findUnique({ where: { id: id2 } });

  let attacker = p1.speed >= p2.speed ? { ...p1 } : { ...p2 }; // [cite: 44]
  let defender = p1.speed >= p2.speed ? { ...p2 } : { ...p1 }; // [cite: 44]
  let turns = 0;

  while (attacker.health > 0 && defender.health > 0) { // [cite: 46]
    turns++;
    let damage = attacker.attack - (defender.defense * 0.5); // [cite: 45]
    damage = damage > 0 ? damage : 1;
    defender.health -= damage;

    if (defender.health <= 0) break; // [cite: 46]

    // Cambio de turno
    let temp = attacker;
    attacker = defender;
    defender = temp;
  }

  const winner = attacker.health > 0 ? attacker : defender;

  // Registrar batalla en BD [cite: 21]
  await prisma.battle.create({
    data: {
      character_1_id: p1.id,
      character_2_id: p2.id,
      winner_id: winner.id,
      turns: turns
    }
  });

  return { winnerName: winner.name, turns }; // [cite: 19]
}