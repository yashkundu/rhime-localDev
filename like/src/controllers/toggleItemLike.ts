import {Request, Response} from 'express'
import { nats, LikeToggledEvent, subject, noun, verb } from '@rhime/events'

import { StatusCodes } from 'http-status-codes'


const toggleItemLike = async (req: Request, res: Response) => {
    const itemId = req.params.itemId
    await nats.publish<LikeToggledEvent>(subject(noun.like, verb.toggle), {
        itemId: itemId,
        userId: req.userAuth.userId
    })
    res.sendStatus(StatusCodes.OK)
}

export {toggleItemLike}