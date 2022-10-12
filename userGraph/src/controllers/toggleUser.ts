import { Request, Response } from "express";
import {Messiah} from '../db/collections/messiahCollection'
import { Minion } from "../db/collections/minionCollection";
import { ValidUser } from "../db/collections/validUserCollections";
import { NotFoundError, DatabaseError } from "@rhime/common";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "bson"; 
import {mongo} from '../db/mongo'


export const toggleUser = async (req: Request, res: Response) => {
    const anotherUserId = new ObjectId(req.params.userId)
    const userProfile = await ValidUser.findOne({_id: anotherUserId})
    if(!userProfile) throw new NotFoundError('User does not exist.')

    const minionId = new ObjectId(req.user.userId)
    const messiahId = anotherUserId

    const session = mongo.client.startSession()
    let isFollowing = false

    try {
        await session.withTransaction(async () => {
            const messiahRes = await Messiah.findOne({minionId, messiahId})
            if(!messiahRes){
                await Messiah.insertOne({minionId, messiahId}, {session})
                await Minion.insertOne({messiahId, minionId}, {session})
                await ValidUser.updateOne({_id: minionId},  {
                    $inc: {
                        messiahCount: 1
                    }
                }, {session})
                await ValidUser.updateOne({_id: messiahId},  {
                    $inc: {
                        minionCount: 1
                    }
                }, {session})
                isFollowing = true
            } else{
                await Messiah.deleteOne({minionId, messiahId}, {session})
                await Minion.deleteOne({messiahId, minionId}, {session})
                await ValidUser.updateOne({_id: minionId},  {
                    $inc: {
                        messiahCount: -1
                    }
                }, {session})
                await ValidUser.updateOne({_id: messiahId},  {
                    $inc: {
                        minionCount: -1
                    }
                }, {session})
                isFollowing = false
            }
        })
    } catch (error) {
        throw new DatabaseError('Error in the database transaction')
    } finally{
        await session.endSession()
    }
    
    res.status(StatusCodes.OK).send({isFollowing: isFollowing})

}
