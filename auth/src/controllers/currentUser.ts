import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const currentUser = (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json(req.user)
}