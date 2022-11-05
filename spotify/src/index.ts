import {app} from './app'
import {mongo} from './db/mongo'
import { ltTaskQueue } from './ltTaskQueue'

import {Registry, service} from '@rhime/discovery'

import {nats} from '@rhime/events'


const scheduleUpdates = async () => {
    //sheduled for 2:30 (am) at every Monday :)
    await ltTaskQueue.queue.add('scheduledFetch', {}, {
        repeat: {
            pattern: '* 30 2 * * 1',
            limit: 1
        },
        jobId: 'scheduledFetchJob'
    })
}



const start = async () => {
    try {
        // implement a fucntion to check if all the env variables are set
        // other throw a big nasty error :)
        // envCheckerFunc() 
        const envVariables = ['ACCESS_TOKEN_SECRET', 
        'SPOTIFY_CLIENT_KEY', 'SPOTIFY_CLIENT_SECRET', 
        'APP_URL', 'APP_PORT', 'ETCD_KEY_TTL']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('Spotify service connected to MongoDb ... ');

        await nats.connect({
            servers: process.env.nats_url
        })
        console.log('Spotify service connected to NATS ... ');


        await ltTaskQueue.connect({host: '127.0.0.1', port: 6379})
        console.log('BullMQ\'s ltQueue to the service ... ')

        await scheduleUpdates()

        // await ltTaskQueue.queue.add('initialFetch', {
        //     userId: 'e0b4dcb58f22eb50dd54ea68'
        // })

        // await ltTaskQueue.queue.add('scheduledFetch', {})

        app.listen(Number(process.env.APP_PORT), async () => {
            console.log('Spotify service listening on port 8000...');

            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })

            await registry.register(service.spotify, {
                url: process.env.APP_URL as string,
            }, {ttl: Number(process.env.ETCD_KEY_TTL)})


        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


