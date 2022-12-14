import {app} from './app'
import {mongo} from './db/mongo'
import { ds } from './ds/redis'


import {nats, PostCreatedEvent, UserFeedStaledEvent, subject, noun, verb} from '@rhime/events'

import { Registry, service } from '@rhime/discovery'

import { postCreatedHandler } from './handlers/postCreatedHandler'
import { userFeedStaledHandler } from './handlers/userFeedStaledHandler'

const initNATS = async () => {
    await nats.connect({
        servers: process.env.nats_url
    })
    console.log('Feed service connected to NATS ... ');

    await nats.subscribe<PostCreatedEvent>(subject(noun.post, verb.created), {
        durableName: `${noun.post}-${verb.created}-feed-consumer`,
        deliverySubject: `${noun.post}-${verb.created}-feed-subject`,
        deliveryGroup: `${noun.post}-${verb.created}-feed-group`
    }, postCreatedHandler)


    await nats.subscribe<UserFeedStaledEvent>(subject(noun.user, verb.feedStaled), {
        durableName: `${noun.user}-${verb.feedStaled}-feed-consumer`,
        deliverySubject: `${noun.user}-${verb.feedStaled}-feed-subject`,
        deliveryGroup: `${noun.user}-${verb.feedStaled}-feed-group`
    }, userFeedStaledHandler)

}

const getEtcdWatcher = async (registry: Registry) => {
    try {
        const etcdEmitter = await registry.watchOne(service.userGraphView)
        console.log(`Watching service ${service.userGraphView} for change - `);
        return etcdEmitter
    } catch (error) {
        console.log(`Error in watching service ${service.userGraphView} for change`);
        return null;
    }
}



const start = async () => {
    try {
        const envVariables = ['APP_URL', 
        'APP_PORT', 'ETCD_KEY_TTL']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('Feed service connected to MongoDb ... ');

        await ds.connect({host: '127.0.0.1', port: 6379})
        console.log('Feed service connected to Redis instance ... ');

        ds.defineCommands()

        await initNATS();

        app.listen(Number(process.env.APP_PORT as string), async () => {
            console.log(`Feed service is listening on port ${process.env.APP_PORT}...`);

            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })

            await registry.register(service.feed, {
                url: process.env.APP_URL as string
            }, {ttl: Number(process.env.ETCD_KEY_TTL)})

        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


