import express from 'express'
const router = express.Router()

import { getUserRecommends } from '../controllers/getUserRecommends'
import {spotifyAuthorized} from '../middlewares/spotifyAuthorized'

router.route('/').get(spotifyAuthorized, getUserRecommends)

export {router as recommendRouter}