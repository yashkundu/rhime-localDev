import {Request, Response} from 'express'

import { RTLikeCount } from '../db/collections/RTLikeCount'
import { DailyLikeCount } from '../db/collections/DailyLikeCount'

import {ObjectId} from 'bson'
import { StatusCodes } from 'http-status-codes'

const getLikeCount = async (req: Request, res: Response) => {
    const itemId = new ObjectId(req.params.itemId)

    const rTRes = await RTLikeCount.findOne({_id: itemId})
    const dailyRes = await DailyLikeCount.findOne({_id: itemId})

    let count = 0;
    if(rTRes) count += Number(rTRes.count.toString());
    if(dailyRes) count += Number(dailyRes.count.toString());

    res.status(StatusCodes.OK).send({count: count})
}

export {getLikeCount}