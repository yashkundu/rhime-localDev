import { Request, Response, NextFunction } from "express";
import {Collection} from 'mongodb'
import { BadRequestError } from "../errors/badRequestError";


export const UniqueConstraint = function(field: string, collection: Collection<any>){
    return async (req: Request, res: Response, next: NextFunction) => {
        const doc = await collection.findOne({[field]: req.body[field]})
        if(doc){
            throw new BadRequestError(`The ${field} already exists`)
        }
        next()
    }
}
