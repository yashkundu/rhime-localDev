import {mongo} from './db/mongo'

import {nats, subject, noun, verb, LikeToggledEvent} from '@rhime/events'
import { likeToggledHandler, natsEmitter, acknowledge } from './handlers/likeToggledHandler'
import { consumerOpts, JetStreamPullSubscription } from 'nats'
import { EVENT_BATCH_SIZE } from './config'

import { ds } from './ds/redis'


const pullMsgs = (pullConsumer: JetStreamPullSubscription) => {
    console.log('Pulling messages : ');
    pullConsumer.pull({
        batch: EVENT_BATCH_SIZE
    });
}

const start = async () => {
    try {

        await mongo.connect('mongodb://127.0.0.1:27017/?directConnection=true')
        console.log('Like-Updater service connected to MongoDb ... ');

        await nats.connect({
            servers: process.env.nats_url
        })
        console.log('Like-Updater service connected to NATS ... ');

        await ds.connect({
            host: '127.0.0.1',
            port: 6379
        })
        console.log('Like-Updater service connected to Redis ... ');


        const js = nats.js


        // await jsm.streams.add({ name: 'likeStream', subjects: [`${noun.like}.*`] });

        const opts = consumerOpts()
        opts.durable(`${noun.like}-${verb.toggled}-likeUpdater-consumer`)
        opts.ackExplicit()
        opts.manualAck()
        opts.ackWait(1000*10)


        const pullConsumer = await js.pullSubscribe(subject(noun.like, verb.toggled), opts);
        console.log(`Like updater subscribed to ${subject(noun.like, verb.toggled)} subject`);

        (async () => {
            for await (const msg of pullConsumer) {
                try {
                    console.log(Buffer.from(msg.data).toString());
                    likeToggledHandler(
                        JSON.parse(Buffer.from(msg.data).toString()) as LikeToggledEvent, 
                        msg)
                } catch (error) {
                    console.log('error', error);
                    acknowledge(msg)
                }
            }
        })()

        natsEmitter.on('finished', () => {
            pullMsgs(pullConsumer);
        })
        
        pullMsgs(pullConsumer);
        

        pullConsumer.closed.then(() => console.log('Subscription closed :('));


        


        
    } catch (error) {
        console.log(error);
    }
}

start()


