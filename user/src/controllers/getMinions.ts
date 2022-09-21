import { Request, Response } from "express";
import { Minion } from "../db/collections/minionCollection";
import { StatusCodes } from "http-status-codes";
import {ObjectId} from 'bson'
import { objectIdValidator } from "@rhime/common";

    
export const getMinions = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.params.userId)
    const lastMinionId = objectIdValidator(req.params.lastMinionId) && new ObjectId(req.params.lastMinionId)
    

    const matchObj: {[key: string]: any} = {
        messiahId: userId
    }

    if(lastMinionId) matchObj.minionId = {$gt: lastMinionId}

    
    const minions = await Minion.aggregate([
        {
            $match: matchObj
        },
        {
            $lookup: {
                from: 'UserProfile',
                localField: 'minionId',
                foreignField: 'userId',
                pipeline: [{$project: {_id: 0, firstName: 1, userId: 1, userName: 1}}],
                as: 'minion'
            }
        },
        {
            $addFields: {minion: {$first: '$minion'}}
        },
        {
            $project : {_id: 0, minion: 1} 
        }
    ]).limit(20).toArray()
    res.status(StatusCodes.OK).send(minions)
}

