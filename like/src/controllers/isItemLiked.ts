import {Request, Response} from 'express'

import { StatusCodes } from 'http-status-codes'

import { ItemReaction } from '../db/collections/ItemReactionCollection'
import {ObjectId} from 'bson'


const isItemLiked = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.userAuth.userId)
    const itemId = new ObjectId(req.params.itemId)

    const itemRes = await ItemReaction.findOne({_id: {itemId: itemId, userId: userId}})
    res.status(StatusCodes.OK).send({isLiked: Boolean(itemRes)})
}

export {isItemLiked}