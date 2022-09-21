import { Request, Response } from "express";
import crypto from 'crypto'

const userScopes = [
    'user-read-recently-played', 'user-read-playback-position',
    'playlist-read-collaborative', 'user-read-playback-state',
    'streaming', 'user-top-read', 'user-follow-read', 
    'user-read-currently-playing', 'user-library-read', 
    'playlist-read-private', 'user-read-private'
]



export const authorize = (req: Request, res: Response) => {

    const state = crypto.randomBytes(8).toString('hex')
    const scope = userScopes.join(' ')
    const redirect_uri = 'http://localhost:80/api/spotify/callback'

    const qs = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_KEY as string,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: 'true'
    })

    res.redirect('https://accounts.spotify.com/authorize?' + qs.toString())
}