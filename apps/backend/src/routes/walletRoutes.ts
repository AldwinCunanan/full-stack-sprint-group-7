import { Router } from "express";
import { walletController } from "../controllers/walletController.ts";
import {
  validateWalletAmount,
  validateUserId,
  validateTransactionId
} from "../validations/walletValidation.ts";

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

// GET: retrieve wallet data for user
router.get(
  "/:userId",
  validateUserId,
  walletController.getWallet
);

export default router;
