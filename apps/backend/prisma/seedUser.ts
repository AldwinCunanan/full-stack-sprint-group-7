import { readFileSync } from "node:fs";
import { prisma } from "../src/db/prisma.js"; 
import { TransactionType } from "../src/generated/prisma/enums.js";
import type { ProfileData, Transaction } from "../../../shared/types/userProfile.js";

const users = JSON.parse(
  readFileSync(new URL("./data/user.json", import.meta.url), "utf8")
) as ProfileData[];

const transactions = JSON.parse(
  readFileSync(new URL("./data/sampleTransaction.json", import.meta.url), "utf8")
) as Transaction[];

async function main() {
  const profile = users[0];
  if (!profile) {
    throw new Error("No user found in ./data/user.json");
  }

  await prisma.$transaction(async (tx) => {
    await tx.transaction.deleteMany();
    await tx.user.deleteMany();

    const createdUser = await tx.user.create({
      data: {
        id: profile.id,
        username: profile.username,
        dob: new Date(`${profile.dob}T00:00:00.000Z`),
        favoriteRacer: profile.favoriteRacer ?? null,
        favoriteTrack: profile.favoriteTrack ?? null,
        credits: Number(profile.credits).toFixed(2),
        totalProfit: Number(profile.totalProfit).toFixed(2),
      },
    });

    if (transactions.length > 0) {
      await tx.transaction.createMany({
        data: transactions.map((item) => ({
          id: item.id,
          userId: createdUser.id,
          type:
            item.type === "Deposit"
              ? TransactionType.Deposit
              : TransactionType.Withdrawal,
          amount: Number(item.amount).toFixed(2),
          date: new Date(`${item.date}T00:00:00.000Z`),
        })),
      });
    }
  });

  await prisma.$queryRaw`
    SELECT setval(
      pg_get_serial_sequence('"User"', 'id'),
      COALESCE((SELECT MAX(id) FROM "User"), 0) + 1,
      false
    )
  `;

  await prisma.$queryRaw`
    SELECT setval(
      pg_get_serial_sequence('"Transaction"', 'id'),
      COALESCE((SELECT MAX(id) FROM "Transaction"), 0) + 1,
      false
    )
  `;
}

main()
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });