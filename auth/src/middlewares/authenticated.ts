import { ObjectID } from "bson";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { validateAccessToken } from "../utils/jwt";

interface userProp{
    userId: ObjectID;
    userName: string
}

declare global{
    namespace Express{
        interface Request{
            user: userProp
        }
    }
}

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.signedCookies?.accessToken
    if(!accessToken) throw new UnauthenticatedError('The user is not authenticated', true)
    try {
        const payload = validateAccessToken(accessToken) as userProp
        req.user = {
            userId: payload.userId,
            userName: payload.userName
        }
    } catch (error) {
        throw new UnauthenticatedError('The user is not authenticated.', true)
    }
    next()
}