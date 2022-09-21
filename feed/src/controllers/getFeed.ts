import {Request, Response, NextFunction} from 'express'
import { Feed } from '../db/collections/feedCollection'
import {ObjectId} from 'bson'
import { StatusCodes } from 'http-status-codes'


export const getFeed = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.user.userId)

    const posts = Feed.find({userId: userId}).limit(20)

    const userPosts = []

    for await (const post of posts){
        userPosts.push({
            postId: post.postId,
            caption: post.caption,
            numComments: post.numComments
        })
    }

    res.status(StatusCodes.OK).send({posts: userPosts})

}