import { prisma } from "../src/db/prisma";
import { racers } from "../src/data/racers";

async function main() {
    for (const racer of racers) {
        await prisma.racer.upsert({
            where: { name: racer.name },
            update: racer,
            create: racer
        });
    }

    console.log(`Successfully seeded ${racers.length} racers.`)

}

main() 
    .catch((error) => {
        console.error("Error seeding racers:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });