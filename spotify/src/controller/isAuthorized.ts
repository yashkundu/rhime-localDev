import { Request, Response } from "express";
import {ObjectId} from 'bson'
import { Token } from "../db/collections/tokenCollection";
import { StatusCodes } from "http-status-codes";

const isAuthorized = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.user.userId)
    const token = await Token.findOne({_id: userId})
    res.status(StatusCodes.OK).send({isAuthorized: Boolean(token)})
}

export {isAuthorized}