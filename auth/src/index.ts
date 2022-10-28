import {app} from './app'
import {mongo} from './db/mongo'
import { Registry, service } from '@rhime/discovery'
import {nats} from '@rhime/events'

import { UserAuthorizedEvent, noun, verb, subject } from '@rhime/events'

import { userAuthorizedHandler } from './handlers/userAuthorizedHandler'


const initNATS = async () => {
    await nats.connect({
        servers: process.env.nats_url
    })
    console.log('Auth service connected to NATS ... ');

    await nats.subscribe<UserAuthorizedEvent>(subject(noun.user, verb.authorized), {
        durableName: `${noun.user}-${verb.authorized}-auth-consumer`,
        deliverySubject: `${noun.user}-${verb.authorized}-auth-subject`,
        deliveryGroup: `${noun.user}-${verb.authorized}-auth-group`
    }, userAuthorizedHandler)
}





const start = async () => {
    try {

        // implement a fucntion to check if all the env variables are set
        // other throw a big nasty error :)
        // envCheckerFunc() 
        const envVariables = ['ACCESS_TOKEN_SECRET', 'SIGNED_COOKIE_SECRET', 
        'SPOTIFY_CLIENT_KEY', 'SPOTIFY_CLIENT_SECRET', 'APP_URL',
         'APP_PORT', 'ETCD_KEY_TTL']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('Auth service connected to MongoDb ... ');

        await initNATS()
        

        app.listen(Number(process.env.APP_PORT), async () => {
            console.log('Auth service listening on port 5000...');
            // implement(func)

            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })

            await registry.register(service.auth, {
                url: process.env.APP_URL as string,
            }, {ttl: Number(process.env.ETCD_KEY_TTL)})

            
        })
        
    } catch (error) {
        console.log(error);
    }
}

start()

