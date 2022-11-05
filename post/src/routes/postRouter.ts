import express from 'express'

const router = express.Router()

import { paramObjectIdValidator} from '@rhime/common'

import {createPost, getPost, getTrack} from '../controllers'

router.route('/').post(createPost)
router.route('/getPost/:postId').get(paramObjectIdValidator('postId'), getPost)
router.route('/getTrack/:trackId').get(getTrack)

export {router as postRouter}