import express from 'express'


import { authenticated, RequiredConstraint, SchemaValidator, UniqueConstraint } from '@rhime/common'


import { User, UserFields } from '../db/collections/userCollection'

import { userSchema } from '../schemas/userSchema'

import { signup, signin, signout, currentUser } from '../controllers'

const router = express.Router()

router.get('/hello', (req, res) => {
    res.send('Hello fm')
})


router.post('/signup', [SchemaValidator(userSchema), UniqueConstraint(UserFields.email, User), UniqueConstraint(UserFields.userName, User)] , signup)
router.post('/signin', RequiredConstraint([UserFields.userName, UserFields.password]),  signin)
router.post('/signout', signout)
router.get('/currentUser', authenticated, currentUser)


export {router as authRouter}