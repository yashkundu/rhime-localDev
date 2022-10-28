import {Request, Response} from 'express'
import {ObjectId} from 'bson'
import { StatusCodes } from 'http-status-codes'

import { BadRequestError } from '@rhime/common'

import { Comment } from '../db/collections/commentCollection'


const createComment = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.userAuth.userId)
    const postId = new ObjectId(req.params.postId)

    const charLimit = 120;
    if(!req.body.text) throw new BadRequestError('No text present.');
    if(req.body.text.length>charLimit) throw new BadRequestError(`Comment should be less than ${charLimit} characters.`)

    const comment = await Comment.insertOne({
        postId: postId,
        userId: userId,
        userName: req.userAuth.userName,
        text: req.body.text as string,
        timeStamp: new Date(Date.now())
    })

    res.sendStatus(StatusCodes.CREATED)

}

export {createComment}