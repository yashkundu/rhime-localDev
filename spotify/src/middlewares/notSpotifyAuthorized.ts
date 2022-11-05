import { Request, Response, NextFunction } from "express";
import {ObjectId} from 'bson'
import { Token } from "../db/collections/tokenCollection";
import { BadRequestError } from "@rhime/common";



const notSpotifyAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    const userId = new ObjectId(req.userAuth.userId)
    const token = await Token.findOne({_id: userId})
    if(token) throw new BadRequestError('User has already authorized spotify')
    next()
}

export {notSpotifyAuthorized}
