import express from 'express'

const router = express.Router()

import { authenticated, paramObjectIdValidator } from '@rhime/common'

import {getFeed} from '../controllers/getFeed'
import {getProfileFeed} from '../controllers/getProfileFeed'

router.use(authenticated)


router.route('/').get(getFeed)
router.route('/:userId').get(paramObjectIdValidator('userId'), getProfileFeed)


export {router as feedRouter}