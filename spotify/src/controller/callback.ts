import axios from "axios";
import { Request, Response } from "express";
import { Token } from "../db/collections/tokenCollection"; 
import { ObjectID } from "bson";

import { ltTaskQueue } from "../ltTaskQueue";



export const callback = async (req: Request, res: Response) => {
    
    const {code, state} = req.query
    const redirect_uri = 'http://localhost:80/api/spotify/callback'

    if(!code){
        // authorization failed
        return res.redirect(`http://localhost:80?error=${req.query.error}`)
    }
    
    try {
        const {data} = await axios.post('https://accounts.spotify.com/api/token/', 
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code as string,
                redirect_uri
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Authorization': `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_KEY + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`
                }
            }
        )
        const info = await Token.insertOne({
            _id: new ObjectID(req.user.userId), 
            access_token: data.access_token as string,
            refresh_token: data.refresh_token as string,
            expiration: new Date(Date.now() + data.expires_in*1000)
        })

        if(!info.acknowledged) throw new Error('Error in inserting the info doc')


        //push a job to get all the user favourites and find recommends to the 
        // task queue
        const job = await ltTaskQueue.queue.add('initialFetch', {
            userId: req.user.userId
        })

        return res.redirect('http://localhost:80')

    } catch (error) {
        // if error comes maybe offload this task to some worker thread which will
        // keep on trying it unless it succeeds. but there is no much use
        //@ts-ignore
        console.log(error);
        
        res.redirect(`http://localhost:80?error=${'Authorizaion did not happen, try again'}`)
    }
    
}