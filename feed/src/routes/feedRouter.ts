import express from 'express'

const router = express.Router()

import { authenticated } from '@rhime/common'

import {getFeed} from '../controllers/getFeed'

router.use(authenticated)


router.route('/').get(getFeed)



export {router as feedRouter}