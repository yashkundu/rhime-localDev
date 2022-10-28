import express from 'express'

const router = express.Router()

import { paramObjectIdValidator, queryObjectIdValidator } from '@rhime/common'

import { postValidator } from '../middlewares/postValidator'

import {createComment} from '../controllers/createComment'
import {deleteComment} from '../controllers/deleteComment'
import {getPostComments} from '../controllers/getPostComments'



router.route('/:postId')
.post(paramObjectIdValidator('postId'), postValidator, createComment)

router.route('/:commentId')
.delete(paramObjectIdValidator('commentId'), deleteComment)

router.route('/:postId')
.get(paramObjectIdValidator('postId'), postValidator, queryObjectIdValidator('anchorId'), getPostComments)

export {router as commentRouter}
