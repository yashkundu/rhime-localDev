import { Request, Response } from "express";
import { Messiah } from "../db/collections/messiahCollection";
import { StatusCodes } from "http-status-codes";
import {ObjectId} from 'bson'
import { objectIdValidator } from "@rhime/common";

    
export const getMessiahs = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.params.userId)
    const lastMessiahId = objectIdValidator(req.params.lastMessiahId) && new ObjectId(req.params.lastMessiahId)
    

    const matchObj: {[key: string]: any} = {
        minionId: userId
    }

    if(lastMessiahId) matchObj.messiahId = {$gt: lastMessiahId}

    const messiahs = await Messiah.aggregate([
        {
            $match: matchObj
        },
        {
            $lookup: {
                from: 'UserProfile',
                localField: 'messiahId',
                foreignField: 'userId',
                pipeline: [{$project: {_id: 0, firstName: 1, userId: 1, userName: 1}}],
                as: 'messiah'
            }
        },
        {
            $addFields: {messiah: {$first: '$messiah'}}
        },
        {
            $project : {_id: 0, messiah: 1} 
        }
    ]).limit(20).toArray()
    res.status(StatusCodes.OK).send(messiahs)
}

