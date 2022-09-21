import jwt from 'jsonwebtoken'
import { ObjectId, WithId } from "mongodb";
import {user} from '../db/collections/userCollection'
import { Response } from "express";
import ms from 'ms'


const createJWT = (payload: Object, secretKey: string, options: jwt.SignOptions) => {
    const token = jwt.sign(payload, secretKey, options)
    return token
}

export const createAccessToken = (user: WithId<user>) => {
    const payload = {
        userId: user._id,
        userName: user.userName
    }
    return createJWT(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '1d'
    })
}

const createRefreshToken = (sessionId: ObjectId) => {
    const payload = {
        sessionId
    }
    return createJWT(payload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '20d'
    })
}

export const attachAccessToken = (res: Response, user: WithId<user> ) => {
    const token = createAccessToken(user)
    res.cookie('accessToken', token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ms('1d')
    })
}

export const attachRefreshToken = (res: Response, sessionId: ObjectId) => {
    const token = createRefreshToken(sessionId)
    res.cookie('refreshToken', token, {
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ms('20d'),
        path: "/api/auth/refresh"
    })
}


export const validateAccessToken = (token: string) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
}

export const validateRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!)
}




