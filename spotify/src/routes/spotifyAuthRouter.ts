import express from 'express'
const router = express.Router()

import { authenticated } from '@rhime/common'

import { authorize } from '../controller/authorize'
import {callback} from '../controller/callback'

router.get('/authorize', authenticated, authorize)
router.get('/callback', authenticated, callback)

export {router as spotifyAuthRouter}