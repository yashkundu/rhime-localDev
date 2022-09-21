import { Request, Response, NextFunction } from "express"
import {ObjectSchema} from 'joi'
import {ValidationError} from '../errors/validationError'

// Generator of a middleware

// declare global {
//     namespace Express {
//       interface Request {
//         doc?: any
//       }
//     }
// }

export const SchemaValidator = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const props = Object.keys(schema.describe().keys)
        let doc: {[key: string]: any} = {}
        props.forEach((prop) => {
            doc[prop] = req.body[prop]
        })
        const {value, error} = schema.validate(doc) 
        if(error) return next(new ValidationError(error.details))
        req.body = value
        next()
    } 
}