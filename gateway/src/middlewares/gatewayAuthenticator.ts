import {Request, Response, NextFunction} from 'express'

import { validateAccessToken } from '@rhime/common'

interface userAuthProp{
    userId: string;
    userName: string;
    isAuth: boolean
}

declare global{
    namespace Express{
        interface Request{
            user: userAuthProp
        }
    }
}

const gatewayAuthenticator = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.signedCookies?.accessToken
    if(!accessToken) return
    try {
        const payload = validateAccessToken(accessToken) as userAuthProp
        req.user = payload
        const payloadStr = JSON.stringify({
            userId: payload.userId,
            userName: payload.userName,
            isAuth: payload.isAuth
        })
        delete req.headers['cookie'];
        req.headers['user-auth'] = payloadStr;
    } catch (error) {
        // :(
    }
    next();
}

export {gatewayAuthenticator}