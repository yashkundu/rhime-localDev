import { Request, Response } from "express";
import { UserProfile } from "../db/collections/userProfileCollection";
import  {DatabaseError } from '@rhime/common'
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@rhime/common";
import {ObjectId} from 'bson'



export const getProfileInfo = async (req: Request, res: Response) => {
    const getterUserId = new ObjectId(req.params.userId)
    const profileInfo = await UserProfile.findOne({userId: getterUserId})
    if(!profileInfo) throw new NotFoundError('Resource not found')
    const {email, userId, _id, ...sendableInfo} = profileInfo
    res.status(StatusCodes.OK).send(sendableInfo)
}

export const updateProfileInfo = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.params.userId)
    const updated = await UserProfile.updateOne({userId: userId}, {
        $set: {
            ...(req.body)
        }
    })
    if(!updated.acknowledged) throw new DatabaseError('Cannot publish to changes to db')
    res.sendStatus(StatusCodes.OK)
}

