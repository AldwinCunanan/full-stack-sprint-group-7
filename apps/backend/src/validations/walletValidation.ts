import type { RequestHandler } from "express";
import { z } from "zod";

// Deposit and withdrawal request body
const walletAmountSchema = z.object({
  amount: z.coerce.number()
    .finite()
    .positive("Amount must be greater than $0.")
}).strict();

// Validate deposit/withdrawal body
export const validateWalletAmount: RequestHandler = (
  req, res, next
) => {
  const result = walletAmountSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid wallet amount",
      details: z.flattenError(result.error)
    });
    return;
  }

  req.body = result.data;
  next();
};

// Validate user ID
export const validateUserId: RequestHandler = (
  req, res, next
) => {
  const result = z.coerce.number()
    .int()
    .positive()
    .safeParse(req.params.userId);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid user ID"
    });
    return;
  }

  next();
};

// Validate transaction ID
export const validateTransactionId: RequestHandler = (
  req, res, next
) => {
  const result = z.coerce.number()
    .int()
    .positive()
    .safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid transaction ID"
    });
    return;
  }

  next();
};
