import { Router } from "express";
import { walletController } from "../controllers/walletController.js";

const router = Router();

// GET: Retrieve all transactions for a user
router.get(
  "/:userId/transactions",
  walletController.getTransactions
);

// POST: Deposit credits
router.post(
  "/:userId/deposit",
  walletController.deposit
);

// POST: Withdraw credits
router.post(
  "/:userId/withdraw",
  walletController.withdraw
);

// DELETE: Delete a transaction
router.delete(
  "/:userId/transactions/:id",
  walletController.deleteTransaction
);

export default router;
