import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const postSchemas = {
    create: {
        body: Joi.object({
            departmentName: Joi.string().required().messages({
                "any.required": "Department name is required",
                "string.empty": "Department name cannot be empty",
            }),
            firstName: Joi.string().required().messages({
                "any.required": "First name is required",
                "string.empty": "First name cannot be empty",
            }),
            lastName: Joi.string().required().messages({
                "any.required": "Last name is required",
                "string.empty": "Last name cannot be empty",
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
