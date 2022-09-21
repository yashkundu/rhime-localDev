import express from 'express'
const router = express.Router({mergeParams: true})

import {getProfileInfo, updateProfileInfo} from '../controllers/profileInfo'
import { getProfileImage, uploadProfileImage, deleteProfileImage } from '../controllers/profileImage'

import {authenticated, SchemaValidator, paramObjectIdValidator} from '@rhime/common'
import {userProfileSchema} from '../schemas/userProfileSchema'
import {tightlyAuthorized} from '../middlewares/tightlyAuthorized'

router.use(authenticated, paramObjectIdValidator('userId'))

router.route('/')
    .patch(tightlyAuthorized, SchemaValidator(userProfileSchema), updateProfileInfo)
    .get(getProfileInfo)

router.route('/image')
    .get(getProfileImage)
    .put(tightlyAuthorized, uploadProfileImage)
    .delete(tightlyAuthorized, deleteProfileImage)



export {router as profileRouter}