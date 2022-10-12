import express from 'express'
const router = express.Router()

import { authenticated } from '@rhime/common'
import {spotifyAuthorized} from '../middlewares/spotifyAuthorized'



router.use(authenticated)



export {router as recommendRouter}