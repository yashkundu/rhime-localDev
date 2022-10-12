import express from 'express'
const router = express.Router()

import { authenticated } from '@rhime/common'
import { notSpotifyAuthorized } from '../middlewares/notSpotifyAuthorized'

import { authorize } from '../controller/authorize'
import {callback} from '../controller/callback'
import {isAuthorized} from '../controller/isAuthorized'

router.use(authenticated)

router.get('/authorize', notSpotifyAuthorized, authorize)
router.get('/callback', notSpotifyAuthorized, callback)
router.get('/isAuthorized', isAuthorized)

export {router as spotifyAuthRouter}