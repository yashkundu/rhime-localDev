import { Request, Response } from "express";
import { Post } from "../db/collections/postCollection";
import {ObjectId, Int32} from 'bson'
import { StatusCodes } from "http-status-codes";


export const createPost = async (req: Request, res: Response) => {
    const userId = new ObjectId(req.user.userId)
    const post = {
        userId: userId,
        userName: req.user.userName,
        caption: req.body.caption,
        numComments: new Int32(0)
    }
    await Post.insertOne(post)
    res.status(StatusCodes.OK).send({post: {
        //@ts-ignore
        _id: post._id,
        userName: post.userName,
        caption: post.caption
    }})
}