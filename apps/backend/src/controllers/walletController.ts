
import { Request, Response, NextFunction } from "express";
import { walletService } from "../services/transactionService.js";

export const walletController = {

  // GET: Retrieve all transactions for a user
  async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = Number(req.params.userId);

      if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
          message: "Invalid user ID."
        });
      }

      const transactions = await walletService.fetchTransactions(userId);

      return res.status(200).json({
        message: "Transactions retrieved successfully.",
        transactions
      });

    } catch (error) {
      next(error);
    }
  },

  // POST: Deposit credits
  async deposit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = Number(req.params.userId);
      const amount = Number(req.body.amount);

      if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
          message: "Invalid user ID."
        });
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
          message: "Please enter a valid amount greater than $0."
        });
      }

      const transaction = await walletService.addTransaction(
        userId,
        "Deposit",
        amount
      );

      return res.status(201).json({
        message: "Deposit successful.",
        transaction
      });

    } catch (error) {
      next(error);
    }
  },

  // POST: Withdraw credits
  async withdraw(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = Number(req.params.userId);
      const amount = Number(req.body.amount);

      if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
          message: "Invalid user ID."
        });
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
          message: "Please enter a valid amount greater than $0."
        });
      }

      const transaction = await walletService.addTransaction(
        userId,
        "Withdrawal",
        amount
      );

      return res.status(201).json({
        message: "Withdrawal successful.",
        transaction
      });

    } catch (error) {
      next(error);
    }
  },

  // DELETE: Delete a transaction
  async deleteTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = Number(req.params.userId);
      const transactionId = Number(req.params.id);

      if (
        !Number.isInteger(userId) ||
        userId <= 0 ||
        !Number.isInteger(transactionId) ||
        transactionId <= 0
      ) {
        return res.status(400).json({
          message: "Invalid user or transaction ID."
        });
      }

      await walletService.deleteTransaction(userId, transactionId);

      return res.status(200).json({
        message: "Transaction deleted successfully."
      });

    } catch (error) {
      next(error);
    }
  }
};
