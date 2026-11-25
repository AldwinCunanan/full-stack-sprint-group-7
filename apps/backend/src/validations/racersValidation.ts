import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const postSchemas = {
    create: {
        body: Joi.object({
            teamName: Joi.string().required().messages({
                "any.required": "Team name is required",
                "string.empty": "Team name cannot be empty",
            }),
            selectedRacer: Joi.string().required().messages({
                "any.required": "You must select at least one racer",
            }),
            bettingTotal: Joi.string().required().messages({
                "any.required": "Betting total is required",
                "string.empty": "Betting total cannot be empty",
            }),
        }).unknown(false),
    },
};

export const validateRacerBody = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = postSchemas.create.body.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};
