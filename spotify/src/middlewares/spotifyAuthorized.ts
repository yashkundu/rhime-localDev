import { Request, Response, NextFunction } from "express";
import {ObjectId} from 'bson'
import { Token } from "../db/collections/tokenCollection";
import { BadRequestError } from "@rhime/common";



const spotifyAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    const userId = new ObjectId(req.user.userId)
    const token = await Token.findOne({_id: userId})
    if(!token) throw new BadRequestError('User has not authorized spotify')
    next()
}

export {spotifyAuthorized}
