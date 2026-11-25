
import { prisma } from "../db/prisma.js";

export const transactionRepo = {

  async getAll(userId: number) {
    return await prisma.transaction.findMany({
      where: {
        userId
      },
      orderBy: {
        date: "desc"
      }
    });
  },

  async getById(id: number) {
    return await prisma.transaction.findUnique({
      where: {
        id
      }
    });
  },

  async add(data: {
    userId: number;
    type: "Deposit" | "Withdrawal";
    amount: number;
  }) {
    return await prisma.transaction.create({
      data: {
        userId: data.userId,
        type: data.type,
        amount: data.amount
      }
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id
      }
    });
  }
};
