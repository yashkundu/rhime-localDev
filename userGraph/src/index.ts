import {app} from './app'
import {mongo} from './db/mongo'

import {createInbox} from 'nats'

import {nats, UserCreatedEvent, subject, noun, verb} from '@rhime/events'

import { Registry, service } from '@rhime/discovery'

import { userCreatedHandler } from './handlers/userCreatedHandler'


const initNATS = async () => {
    await nats.connect({
        servers: process.env.nats_url
    })
    console.log('User Graph service connected to NATS ... ');

    await nats.subscribe<UserCreatedEvent>(subject(noun.user, verb.created), {
        durableName: `${noun.user}-${verb.created}-userGraph-consumer`,
        deliverySubject: `${noun.user}-${verb.created}-userGraph-subject`,
        deliveryGroup: `${noun.user}-${verb.created}-userGraph-group`
    }, userCreatedHandler)

}




const start = async () => {
    try {

        // implement a fucntion to check if all the env variables are set
        // other throw a big nasty error :)
        // envCheckerFunc() 
        const envVariables = ['ACCESS_TOKEN_SECRET', 
        'SIGNED_COOKIE_SECRET', 'APP_PORT', 'APP_URL', 'ETCD_KEY_TTL']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('User Graph service connected to MongoDb ... ');

        await initNATS()
        
        app.listen(Number(process.env.APP_PORT as string), async () => {
            console.log(`User Graph service listening on port ${process.env.APP_PORT}...`);

            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })

            await registry.register(service.userGraph, {
                url: process.env.APP_URL as string
            }, {ttl: Number(process.env.ETCD_KEY_TTL)})

        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


