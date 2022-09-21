import { Request, Response } from "express";
import { User } from "../db/collections/userCollection";
import { Session } from "../db/collections/sessionCollection";
import { BadRequestError } from "../errors/badRequestError";
import { ForbiddenError } from "../errors/forbiddenError";
import { verifyPassword } from "../utils/passwordEncryption";
import { Long, Timestamp } from "mongodb";
import { ObjectID } from "bson";
import { attachAccessToken, attachRefreshToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";

const signin = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) throw new BadRequestError('The email does not exist')
    const isPassordCorrect = await verifyPassword(password, user.password)
    if(!isPassordCorrect) throw new BadRequestError('Incorrect password')
    if(!user.isValid) throw new ForbiddenError('The user is not allowed.')
    if(user.sessionId){
        await Session.deleteOne({_id: user.sessionId})
    }
    const sessionObj : {_id?: ObjectID ;userId: ObjectID; timeStamp: Timestamp}  = {
        userId: user._id,
        timeStamp: new Timestamp(new Long())
    }
    const newSession = await Session.insertOne(sessionObj)
    const sessionId = sessionObj._id
    attachAccessToken(res, user)
    attachRefreshToken(res, sessionId as ObjectID)
    res.sendStatus(StatusCodes.OK)
}

export {signin}


