import express from 'express'
const router = express.Router()

import { authenticated } from '@rhime/common'
import { notSpotifyAuthorized } from '../middlewares/notSpotifyAuthorized'
import { checkAccessToken } from '../middlewares/checkAccessToken'

import { authorize } from '../controller/authorize'
import {callback} from '../controller/callback'
import {getAccessToken} from '../controller/getAccessToken'

router.use(authenticated)

router.get('/authorize', notSpotifyAuthorized , authorize)
router.get('/callback', notSpotifyAuthorized, callback)
router.get('/getToken', checkAccessToken, getAccessToken)

export {router as spotifyAuthRouter}