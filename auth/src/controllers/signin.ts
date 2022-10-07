import { Request, Response } from "express";
import { User } from "../db/collections/userCollection";
import { BadRequestError } from "../errors/badRequestError";
import { verifyPassword } from "../utils/passwordEncryption";
import { attachAccessToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";

const signin = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) throw new BadRequestError('The email does not exist')
    const isPassordCorrect = await verifyPassword(password, user.password)
    if(!isPassordCorrect) throw new BadRequestError('Incorrect password')
    attachAccessToken(res, user)
    res.sendStatus(StatusCodes.OK)
}

export {signin}


