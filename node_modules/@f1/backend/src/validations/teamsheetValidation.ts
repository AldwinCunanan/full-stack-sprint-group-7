import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const postSchemas = {
    create: {
        body: Joi.object({
            teamName: Joi.string().trim().min(3).required().messages({
                "any.required": "Team name is required",
                "string.empty": "Team name cannot be empty",
            }),
            selectedRacers: Joi.array().items(Joi.object({id: Joi.number().integer().required()}).unknown(true)).min(1).required().messages({
                "any.required": "You must select at least one racer",
                "array.min": "You must select at least one racer"
            }),
            bettingTotal: Joi.number().greater(0).required().messages({
                "any.required": "Betting total is required",
                "number.base": "Betting total must be a number",
                "number.greater": "Betting total must be greater than $0",
            }),
        }).unknown(false),
    },
};

export const validateTeamsheetBody = (
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
