import express from 'express'

const router = express.Router()

import { authenticated, paramObjectIdValidator, SchemaValidator} from '@rhime/common'
import { tightlyAuthorizedPost } from '../middlewares/tightlyAuthorizedPost'

import {createPost, getPost, deletePost} from '../controllers'

router.use(authenticated)

router.route('/').post(createPost)



router.use('/:postId', paramObjectIdValidator('postId'))
router.route('/:postId')
    .get(getPost)
    .delete(tightlyAuthorizedPost, deletePost)


export {router as postRouter}