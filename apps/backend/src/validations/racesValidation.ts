import Joi from "joi";
import type { Request, Response, NextFunction } from "express";
import type { RaceInput } from "../../../../shared/types/races";

const createRaceSchema = Joi.object<RaceInput>({
    name: Joi.string().trim().min(3).max(30).required(),
    location: Joi.string().trim().required(),
    trackLength: Joi.string()
        .pattern(/^(?:(?:0?[1-9]|1[0-4])(?:\.\d)?|15(?:\.0)?)$/)
        .required()
        .messages({
            "string.pattern.base": "Track length must be between 1 and 15 km, with at most one decimal place.",
        }),
    trackImg: Joi.string().allow("").required(),
    date: Joi.date().iso().required(),
    drivers: Joi.array().items(Joi.string()).required(),
}).required();

export function validateRaceBody(req: Request, res: Response, next: NextFunction) {
    const { error, value } = createRaceSchema.validate(req.body, { abortEarly: false });

    if (error) {
        res.status(400).json({ errors: error.details.map(({ message }) => message) });
        return;
    }

    req.body = value;
    next();
}
