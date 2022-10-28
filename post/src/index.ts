import {app} from './app'
import {mongo} from './db/mongo'

import {Registry, service} from '@rhime/discovery'
import {nats} from '@rhime/events'



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

        await nats.connect({
            servers: process.env.nats_url
        })
        console.log('Post service connected to NATS ... ');

        
        app.listen(Number(process.env.APP_PORT), async () => {
            console.log(`Post service is listening on port ${process.env.APP_PORT}...`);

            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })

            await registry.register(service.post, {
                url: process.env.APP_URL as string,
            }, {ttl: Number(process.env.ETCD_KEY_TTL)})



        })
        
    } catch (error) {
        console.log(error);
    }
}

start()


