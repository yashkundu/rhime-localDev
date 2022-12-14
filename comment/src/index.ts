import {app} from './app'
import {mongo} from './db/mongo'

import {Registry, service} from '@rhime/discovery'
import {nats, subject, noun, verb, PostCreatedEvent} from '@rhime/events'

import { postCreatedHandler } from './handlers/postCreatedHandler'

const initNATS = async () => {
    await nats.connect({
        servers: process.env.nats_url
    })
    console.log('Comment service connected to NATS ... ');

    await nats.subscribe<PostCreatedEvent>(subject(noun.post, verb.created), {
        durableName: `${noun.post}-${verb.created}-comment-consumer`,
        deliverySubject: `${noun.post}-${verb.created}-comment-subject`,
        deliveryGroup: `${noun.post}-${verb.created}-comment-group`
    }, postCreatedHandler)
}



const start = async () => {
    try {

        // implement a fucntion to check if all the env variables are set
        // other throw a big nasty error :)
        // envCheckerFunc() 
        const envVariables = ['ACCESS_TOKEN_SECRET', 
        'SIGNED_COOKIE_SECRET', 'APP_URL', 'APP_PORT', 'ETCD_KEY_TTL']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('Post service connected to MongoDb ... ');

        await initNATS();

        
        app.listen(Number(process.env.APP_PORT), async () => {
            console.log(`Comment service is listening on port ${process.env.APP_PORT}...`);

            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })

            await registry.register(service.comment, {
                url: process.env.APP_URL as string,
            }, {ttl: Number(process.env.ETCD_KEY_TTL)})

        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


