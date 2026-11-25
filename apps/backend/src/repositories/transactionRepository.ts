import { prisma } from "../db/prisma.js"; 
import { TransactionType } from "../generated/prisma/client.js";

export interface CreateTransactionRecord {
  userId: number;
  type: TransactionType;
  amount: string;
  date: Date;
}

export const transactionRepo = {
  async findAllByUserId(userId: number) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  },

  async findById(id: number) {
    return prisma.transaction.findUnique({
      where: { id },
    });
  },

  async createWithBalanceUpdate(data: CreateTransactionRecord, nextCredits: string) {
    return prisma.$transaction(async (tx) => {
      const created = await tx.transaction.create({
        data: {
          userId: data.userId,
          type: data.type,
          amount: data.amount,
          date: data.date,
        },
      });

      await tx.user.update({
        where: { id: data.userId },
        data: { credits: nextCredits },
      });

      return created;
    });
  },

  async deleteWithBalanceUpdate(id: number, userId: number, nextCredits: string) {
    return prisma.$transaction(async (tx) => {
      await tx.transaction.delete({
        where: { id },
      });

      await tx.user.update({
        where: { id: userId },
        data: { credits: nextCredits },
      });
    });
  },
};