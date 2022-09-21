import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/customError"
import {StatusCodes} from 'http-status-codes'

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError){
        req.log.error(err)
        return res.status(err.statusCode).send({errors: err.serializeError()})
    }

    req.log.fatal(err)
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({errors: [{msg: 'Some error has occured inside the server.'}]})
}