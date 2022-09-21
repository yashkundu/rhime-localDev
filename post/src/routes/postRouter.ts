import express from 'express'

const router = express.Router()

import { authenticated, paramObjectIdValidator, SchemaValidator} from '@rhime/common'
import { tightlyAuthorizedPost } from '../middlewares/tightlyAuthorizedPost'
import { postSchema } from '../schemas/postSchema'

import {createPost, updatePost, getPost, deletePost} from '../controllers'

router.use(authenticated)

router.route('/').post(SchemaValidator(postSchema), createPost)



router.use('/:postId', paramObjectIdValidator('postId'))
router.route('/:postId')
    .get(getPost)
    .patch(tightlyAuthorizedPost, SchemaValidator(postSchema), updatePost)
    .delete(tightlyAuthorizedPost, deletePost)


export {router as postRouter}