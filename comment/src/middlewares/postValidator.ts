import {Request, Response, NextFunction} from 'express'
import { ValidPost } from '../db/collections/validPostCollection'
import { BadRequestError } from '@rhime/common'
import {ObjectId} from 'bson'

const postValidator = async (req: Request, res: Response, next: NextFunction) => {
    const validPost = await ValidPost.findOne({_id: new ObjectId(req.params.postId)})
    if(!validPost) throw new BadRequestError('No such post exists')
    next()
}

export {postValidator}