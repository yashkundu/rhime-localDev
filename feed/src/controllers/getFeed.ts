import {Request, Response} from 'express'
import {ObjectId} from 'bson'
import { PAGE_SIZE } from '../config'
import { StatusCodes } from 'http-status-codes'
import { getTimelinePosts } from '../utils'
import {ds} from '../ds/redis'


const getFeed = async (req: Request, res: Response) => {

    const userId = new ObjectId(req.user.userId)
    let anchorId = req.query.anchorId as string | undefined
    
    const userKey = `user:${userId.toHexString()}`


    let posts = await ds.redis.zrange(
        userKey, 
        `${(anchorId)?`(${anchorId.toString()}`:'inf'}` , 
        '-inf', 
        'BYSCORE', 
        'REV', 
        'LIMIT', 
        0, 
        PAGE_SIZE)

    anchorId = (posts.length>0)?posts[posts.length-1]:anchorId
   
    
    
    if(posts.length<PAGE_SIZE)
        posts = posts.concat(await getTimelinePosts(userId, anchorId))

    res.status(StatusCodes.OK).send({posts})
}

export {getFeed}