import { races } from "../src/data/RacesData.ts";
import { prisma } from "../src/db/prisma.ts";

async function main() {
  // Replace all existing races with the seed data in one transaction.
  const { count } = await prisma.$transaction(async (tx) => {
    await tx.race.deleteMany();
    return tx.race.createMany({ data: races });
  });
  console.log(`Reset the Race table and inserted ${count} race(s).`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
