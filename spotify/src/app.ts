import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import 'express-async-errors'


import cookieParser from 'cookie-parser'
import pino from 'pino-http'
import { pinoOptions, ErrorHandler, NotFoundMware } from '@rhime/common'


import { spotifyAuthRouter } from './routes/spotifyAuthRouter'
import { recommendRouter } from './routes/recommendRouter'


const app = express()

app.use(pino(pinoOptions('info', false, false)))
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET))
app.use(express.json())


app.use('/api/spotify', spotifyAuthRouter)
app.use('/api/spotify/recommendation', recommendRouter)

app.use(NotFoundMware)
app.use(ErrorHandler)


export {app}