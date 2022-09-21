import { Request, Response } from "express";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { attachAccessToken, validateRefreshToken } from "../utils/jwt";
import { Session } from "../db/collections/sessionCollection";
import { user } from "../db/collections/userCollection";
import { WithId, ObjectId } from "mongodb";
import { StatusCodes } from "http-status-codes";
import { ForbiddenError } from "../errors/forbiddenError";

const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.signedCookies?.refreshToken
    if(!refreshToken) throw new UnauthenticatedError('You are signed out.', false)
    try {
        
        
        const {sessionId} = validateRefreshToken(refreshToken) as {sessionId: string}
        const sessionCursor = Session.aggregate([
            {
                $match: {
                    _id: new ObjectId(sessionId)
                }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users'
                }
            }
        ]) as any
        const session = await sessionCursor.next()
        
        const user = session.users[0] as WithId<user>
        if(!user.isValid) throw new ForbiddenError('The user is not allowed.')
        attachAccessToken(res, user)
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        throw new UnauthenticatedError('You are signed out.', false)
    }
}

export {refresh}
