import { Request, Response } from "express";
import {ObjectId} from 'bson'
import { Post } from "../db/collections/postCollection";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

export const updatePost = async (req: Request, res: Response) => {
    const postId = new ObjectId(req.params.postId)

    const updRes = await Post.updateOne({_id: postId}, {
        $set: {caption: req.body.caption}
    })

    res.sendStatus(StatusCodes.OK)
}