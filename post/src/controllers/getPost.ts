import { Request, Response } from "express";
import { Post } from "../db/collections/postCollection";
import {ObjectId} from 'bson'
import { NotFoundError } from "@rhime/common";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

export const getPost = async (req: Request, res: Response) => {
    const postId = new ObjectId(req.params.postId)

    const post = await Post.findOne({_id: postId})
    if(!post) throw new NotFoundError('Post cannot be found')

    res.status(StatusCodes.OK).send({post: {
        userName: post.userName,
        caption: post.caption,
        numComments: post.numComments
    }})

}