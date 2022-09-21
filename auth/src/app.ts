import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import 'express-async-errors'


import cookieParser from 'cookie-parser'

import pino from 'pino-http'
import { pinoOptions } from './config/pinoConfig'




import { ErrorHandler } from './middlewares/errorHandler'


import { authRouter } from './routes/authRouter'

const app = express()


app.use(pino(pinoOptions))
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET))
app.use(express.json())


app.use('/api/auth', authRouter)



app.use(ErrorHandler)



export {app}