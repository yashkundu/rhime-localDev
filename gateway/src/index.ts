import { app } from './app';
import { Registry, service } from '@rhime/discovery';
import { watcher } from './controllers/watcher';
import { initializer } from './controllers/initializer';

import {nats, noun} from '@rhime/events'

import { JetStreamManager } from 'nats';


const createStream = async (x: noun, jsm: JetStreamManager) => {
    const subj = `${x}.*`;
    try {
        const name = await jsm.streams.find(subj);
        console.log('Stream name -- ', name);
    } catch (error) {
        await jsm.streams.add({name: `${x}Stream`, subjects: [subj]})
    }
}


const initNats = async () => {
    await nats.connect({
        servers: process.env.nats_url as string
    })
    console.log('Gateway service connected to NATS ... ');
    
    const jsm = await nats.nc.jetstreamManager()

    // creating stream corresponding to every noun :)
    await createStream(noun.user, jsm)
    await createStream(noun.post, jsm)
    await createStream(noun.like, jsm)
}



const getEtcdWatcher = async (registry: Registry) => {
    try {
        const etcdEmitter = await registry.watchPrefix('rhime')
        console.log('Watching prefix "rhime" for keys - ');
        return etcdEmitter
    } catch (error) {
        console.log('Error in watching prefix "rhime" for keys  :(');
        return null;
    }
}


const start = async () => {

    try {

        const envVariables = ['ACCESS_TOKEN_SECRET', 'SIGNED_COOKIE_SECRET', 
         'APP_URL', 'APP_PORT', 'CLIENT_URL']

        for(const x of envVariables){
            if(!process.env[x]) throw new Error('Environment variables not declared')
        }
        
        app.listen(Number(process.env.APP_PORT), async () => {
            console.log(`Gateway started on port ${process.env.APP_PORT} ...`)

            await initNats()
        
            const registry = new Registry({
                hosts: process.env.etcd_url as string
            })
            await initializer(registry)
        
            let etcdWatcher = await getEtcdWatcher(registry)
            while(!etcdWatcher) etcdWatcher = await getEtcdWatcher(registry)
        
            watcher(etcdWatcher)
            
        
        })

    } catch (error) {
        console.log(error);
    }

    
}


start()







