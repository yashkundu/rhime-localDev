import { Request, Response } from "express";
import {ObjectId} from 'bson'
import { UserProfile } from "../db/collections/userProfileCollection";
import { NotFoundError } from "@rhime/common";
import { Messiah } from "../db/collections/messiahCollection";
import { Minion } from "../db/collections/minionCollection";
import { StatusCodes } from "http-status-codes";


export const isMessiah = async (req: Request, res: Response) => {
    const anotherUserId = new ObjectId(req.params.userId)
    const userId = new ObjectId(req.user.userId)

    const user = await UserProfile.findOne({userId: anotherUserId})
    if(!user) throw new NotFoundError('The user in the url params cannot be found')

    const isMessiah = await Messiah.findOne({minionId: userId, messiahId: anotherUserId})

    res.status(StatusCodes.OK).send({isMessiah: Boolean(isMessiah)})
}


export const isMinion = async (req: Request, res: Response) => {
    const anotherUserId = new ObjectId(req.params.userId)
    const userId = new ObjectId(req.user.userId)

    const user = await UserProfile.findOne({userId: anotherUserId})
    if(!user) throw new NotFoundError('The user in the url params cannot be found')

    const isMinion = await Minion.findOne({messiahId: userId, minionId: anotherUserId})

    res.status(StatusCodes.OK).send({isMinion: Boolean(isMinion)})
}