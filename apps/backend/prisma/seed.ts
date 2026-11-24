import { races } from "../src/data/RacesData.ts";
import { prisma } from "../src/db/prisma.ts";

async function main() {
  const { count } = await prisma.race.createMany({ data: races, skipDuplicates: true });
  console.log(`Inserted ${count} race(s).`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
