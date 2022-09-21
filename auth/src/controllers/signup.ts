import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../db/collections/userCollection";
import { DatabaseError } from "../errors/databaseError";
import { encrypt } from "../utils/passwordEncryption";



const signup = async (req: Request, res: Response) => {
    const {firstName, lastName, email, userName, password} = req.body
    const hashedPass = await encrypt(password)
    const userResult = await User.insertOne({
        firstName, 
        lastName, 
        email, 
        userName, 
        password: hashedPass,
        isValid: true})
    if(!userResult.acknowledged) throw new DatabaseError('Error in inserting user to the database')
    res.status(StatusCodes.CREATED).json(userResult)
}

export {signup}