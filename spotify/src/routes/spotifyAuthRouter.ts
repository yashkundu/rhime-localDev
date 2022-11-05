import express from 'express'
const router = express.Router()

import { paramObjectIdValidator } from '@rhime/common'

import { notSpotifyAuthorized } from '../middlewares/notSpotifyAuthorized'
import { checkAccessToken } from '../middlewares/checkAccessToken'

import { authorize } from '../controllers/authorize'
import {callback} from '../controllers/callback'
import {getAccessToken} from '../controllers/getAccessToken'
import {getTopArtists} from '../controllers/getTopArtists'
import {getTopTracks} from '../controllers/getTopTracks'


router.get('/authorize', notSpotifyAuthorized , authorize);
router.get('/callback', notSpotifyAuthorized, callback);
router.get('/getToken', checkAccessToken, getAccessToken);
router.get('/getTopArtists/:userId', paramObjectIdValidator('userId'), getTopArtists);
router.get('/getTopTracks/:userId', paramObjectIdValidator('userId'), getTopTracks);


export {router as spotifyAuthRouter}