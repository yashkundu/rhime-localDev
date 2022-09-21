import express from 'express'

const router = express.Router({mergeParams: true})

import { 
    authenticated, 
    paramObjectIdValidator } from '@rhime/common'

import { looselyAuthorized } from '../middlewares/looselyAuthorized'

import {toggleUser} from '../controllers/toggleUser'
import {getMessiahs} from '../controllers/getMessiahs'
import {getMinions} from '../controllers/getMinions'
import {isMessiah, isMinion} from '../controllers/checkRelation'

router.use(authenticated, paramObjectIdValidator('userId'))


router.post('/toggleUser', looselyAuthorized, toggleUser)
router.get('/messiahs/:lastMessiahId', getMessiahs)
router.get('/minions/:lastMinionId', getMinions)
router.get('/isMessiah', looselyAuthorized, isMessiah)
router.get('/isMinion', looselyAuthorized, isMinion)



export {router as generalUserRouter}