import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/badRequestError";


export const RequiredConstraint = (fields: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        fields.forEach((field) => {
            if(!req.body[field]){
                throw new BadRequestError(`${field} is required`)
            }
        })
        next()
    }
}